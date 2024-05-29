from fastapi import *
from fastapi.responses import JSONResponse
from data.database import get_cursor, commit_changes
from decimal import Decimal
router = APIRouter()

@router.get("/attractions")
async def attractions(request: Request, page: int = Query(0, ge=0), keyword: str = Query(None)):
    try:
        cursor, conn = get_cursor()
        limit = 12
        offset = page * limit
        base_query = "SELECT * FROM attractions"
        filters = []
        params = []

        if keyword:
            filters.append("(mrt = %s OR name LIKE %s)")
            params.extend([keyword,f"%{keyword}%"])
        
        if filters:
            base_query += " WHERE " + " AND ".join(filters)

        base_query += " LIMIT %s OFFSET %s"
        params.extend([limit, offset])
        print(base_query)

        cursor.execute(base_query, params)
        attractions_tuple = cursor.fetchall()

        attractions_list = []
        for attraction in attractions_tuple:
            attraction_dict = {
                "id": attraction[0],
                "name": attraction[1],
                "category": attraction[2],
                "description": attraction[3],
                "address": attraction[4],
                "transport": attraction[5],
                "mrt": attraction[6],
                "latitude": decimal_to_float(attraction[7]),
                "longitude": decimal_to_float(attraction[8]),
                "images": process_images(attraction[9])
            }
            attractions_list.append(attraction_dict)
            

        return JSONResponse(content={"nextPage": page + 1, "data": attractions_list}, status_code=200)
    
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
    finally:
        commit_changes(conn)



@router.get("/attraction/{attractionId}")
async def attractions(request: Request, attractionId: int):
    try:
        cursor, conn = get_cursor()
        query = "SELECT * FROM attractions WHERE id = %s"
        cursor.execute(query, (attractionId,))
        attraction = cursor.fetchone()

        if attraction:
            attraction_dict = {
                "id": attraction[0],
                "name": attraction[1],
                "category": attraction[2],
                "description": attraction[3],
                "address": attraction[4],
                "transport": attraction[5],
                "mrt": attraction[6],
                "latitude": decimal_to_float(attraction[7]),
                "longitude": decimal_to_float(attraction[8]),
                "images": process_images(attraction[9])
            }
            return JSONResponse({"data": attraction_dict}, status_code=200)
        else:
            return JSONResponse({"error": True, "message": "Attraction number is incorrect."}, status_code=400)
    
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
    finally:
        commit_changes(conn)

def decimal_to_float(value):
    if isinstance (value, Decimal):
        return float(value)
    else:
        return value
    
def process_images(images_raw):
    images_list = []
    if images_raw:
        images_raw = images_raw.strip('"').replace('\\\\','\\')
        images_list = images_raw.split('\\n')
        return images_list

