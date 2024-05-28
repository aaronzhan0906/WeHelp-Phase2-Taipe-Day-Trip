from fastapi import *
from fastapi.responses import JSONResponse
from data.database import get_cursor, commit_changes
from decimal import Decimal
router = APIRouter()

@router.get("/attractions")
async def attractions(request: Request, page: int = Query(0, ge=0)):
    try:
        cursor, conn = get_cursor()
        limit = 12
        # skip_records = page * limit
        # base_query = "SELECT * FROM attractions"
        # filters = []
        # params = {}

        # if keyword:
        #     mrt_check_query = "SELECT COUNT(*) FROM attractions WHERE mrt = %s"
        #     cursor.execute(mrt_check_query, (keyword,))
        #     mrt_count = cursor.fetchone()[0]

        #     if mrt_coun


        return JSONResponse(content={"data":("wait")})
    
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)})



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
            return JSONResponse({"data": attraction_dict})
        else:
            return JSONResponse({"error": True, "message": "Attraction not found"}, status_code=400)
    
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
