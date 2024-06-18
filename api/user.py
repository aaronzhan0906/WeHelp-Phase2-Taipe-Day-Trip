from fastapi import *
from fastapi.responses import JSONResponse
from data.database import get_cursor, conn_commit, conn_close
router = APIRouter()


@router.get("/api/user")
async def signup_user(request: Request):
    print("hello")