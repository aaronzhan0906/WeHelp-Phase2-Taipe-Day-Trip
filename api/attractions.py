from fastapi import *
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/attraction")
async def attractions(request: Request):
    print("Hello")
    return JSONResponse(content={"message": "Hello, world!"})