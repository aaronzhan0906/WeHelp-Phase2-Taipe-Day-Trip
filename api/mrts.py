from fastapi import *
from fastapi.responses import JSONResponse
from data.database import get_cursor, conn_commit, conn_close
from api.attractions import set_sorted_mrts_names

router = APIRouter()

@router.get("/api/mrts")
async def attractions(request: Request):

    try:
        cursor, conn = get_cursor()
        cursor.execute("SELECT mrt FROM taipei_attractions.sorted_mrt_attraction_counts;")
        sorted_mrts_names = cursor.fetchall()
        set_sorted_mrts_names(sorted_mrts_names)
        
        conn_commit(conn)
        conn_close(conn)

        return JSONResponse(content={"data": sorted_mrts_names})
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    