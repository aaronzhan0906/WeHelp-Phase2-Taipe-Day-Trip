from fastapi import *
from fastapi.responses import JSONResponse
from data.database import get_cursor, commit_changes

router = APIRouter()

# link database.py

@router.get("/mrts")
async def attractions(request: Request):

    # SELECT MRT 出現在 table 裡的統計數量
    try:
        cursor, conn = get_cursor()
        cursor.execute("SELECT mrt, COUNT(*) AS count FROM attractions GROUP BY mrt ORDER BY count DESC;")
        sorted_mrts = cursor.fetchall()
        commit_changes(conn)

        sorted_mrts_names = [mrt for mrt, _ in sorted_mrts ]
        return JSONResponse(content={"data":sorted_mrts_names})
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)})