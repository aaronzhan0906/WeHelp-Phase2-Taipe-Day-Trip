from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from data.database import get_cursor, conn_commit, conn_close

router = APIRouter()

class User(BaseModel):
    name: str
    email: str
    password: str

@router.post("/api/user")
async def signup_user(user: User):
    if not user.name or not user.email or not user.password:
        return JSONResponse(content={"error": True, "message": "Missing required fields"}, status_code=400)

    try:
        cursor, conn = get_cursor()

        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (user.email,))
        email_count = cursor.fetchone()[0]
        if email_count > 0: 
            return JSONResponse(content={"error": True, "message": "Email already exists"}, status_code=400)

        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (user.name, user.email, user.password))
        conn_commit(conn)
        print(user.name, user.email, user.password)
        return JSONResponse(content={"ok": True}, status_code=200)
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    finally:
        conn_close(conn)


