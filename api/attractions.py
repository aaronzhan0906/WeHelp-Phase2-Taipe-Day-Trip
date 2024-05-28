from fastapi import *
from fastapi.responses import JSONResponse

router = APIRouter()

@router.get("/attractions")
async def attractions(request: Request):
    print("Hello")
    return JSONResponse(content={"message": "Hello, world!"})

@router.get("/attraction/{attractionId}")
async def attractions(request: Request, attractionId: int):
    print(attractionId)
    return JSONResponse(content={"message": "Hello, world!"})