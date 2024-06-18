from fastapi import *
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from data.database import get_cursor, conn_commit, conn_close
import jwt
router = APIRouter()

app = FastAPI()
class User(BaseModel): 
    name: str   
    email: str
    password: str


@app.post("/api/user")
async def signup_user(user: User):
    if not user.name or not user.email or not user.password:
        raise HTTPException(status_code=400, detail="All fields are required")
    

    try:
        cursor, conn = get_cursor()
        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",(user.name, user.email, user.password))
        conn_commit(conn)
        print(user.name, user.email, user.password)

        return JSONResponse(content={"login"}, status_code=200)
    
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
    finally:
        conn_close(conn)

app.include_router(router)
