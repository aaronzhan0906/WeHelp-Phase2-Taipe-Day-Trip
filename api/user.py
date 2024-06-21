from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel, EmailStr, ValidationError
from datetime import datetime, timedelta, timezone
import jwt
from data.database import get_cursor, conn_commit, conn_close

router = APIRouter()

class UserSignUp(BaseModel):
    name: str
    email: str
    password: str

class UserSignIn(BaseModel):
    email: str
    password: str


# JWT
SECRET_KEY = "secret_key_secret"
ALGORITHM = "HS256"

def create_jwt_token(email: str) -> str:
    payload = {
        "sub": email,
        "exp": datetime.now(tz=timezone.utc)  + timedelta(hours=168)
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm = ALGORITHM)
    return token


# POST__SIGNUP
@router.post("/api/user")
async def signup_user(user: UserSignUp):
    cursor, conn = get_cursor()

    if user.name =="" or user.email == "" or user.password == "" :
        return JSONResponse(content={"error": True, "message": "Missing required fields"}, status_code=400)

    if "@" not in user.email:
        return JSONResponse(content={"error": True, "message": "電子信箱格式錯誤"}, status_code=400)

    try:
        cursor.execute("SELECT COUNT(*) FROM users WHERE email = %s", (user.email,))
        email_count = cursor.fetchone()[0]
        if email_count > 0: 
            return JSONResponse(content={"error": True, "message": "電子信箱已被註冊"}, status_code=400)

        cursor.execute("INSERT INTO users (name, email, password) VALUES (%s, %s, %s)", (user.name, user.email, user.password))
        conn_commit(conn)
        print(user.name, user.email, user.password)

        return JSONResponse(content={"ok": True, "message": "!!! User signed up successfully !!!"}, status_code=200)
    

    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
    finally:
        conn_close(conn)

    

# GET__USER-INFO
@router.get("/api/user/auth")
async def get_user_info(authorization: str = Header(...)):
    print (authorization)
    if authorization == "null": 
        print("未登入")
        return JSONResponse(content={"data": "null", "message":"No JWT checked from backend."})

    # print("Authorization Header:", authorization)
    cursor, conn = get_cursor()
    try:
        token = authorization.split()[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email = payload.get("sub")
        
        cursor.execute("SELECT id, name, email FROM users WHERE email = %s", (email,))
        user_data = cursor.fetchone()

        if user_data:
            print("有這個人")
            user_info = {
                "id": user_data[0],
                "name": user_data[1],
                "email": user_data[2]
            }
            return JSONResponse(content={"ok": True, "data": user_info, "message": "User is found."}, status_code=200)
        else:
            return JSONResponse(content={"error": True, "message": "User not found."}, status_code=400)

    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)

    finally:
        conn_close(conn)



# PUT__SIGNIN
@router.put("/api/user/auth")
async def signin_user(user: UserSignIn):
    print(user.password)
    cursor, conn = get_cursor()

    if user.email == "" or user.password == "":
        return JSONResponse(content={"error": True, "message": "The logged-in user did not enter a username or password."}, status_code=400)
    
    try: 
        print(user.email, user.password)

        cursor.execute("SELECT * FROM users WHERE email=%s AND password=%s", (user.email, user.password))
        user_data = cursor.fetchone()
        
        if not user_data:
            return JSONResponse(content={"error": True, "message": "The username or password is incorrect."}, status_code=400)
        
        jwt_token = create_jwt_token(user.email)

        return JSONResponse(content={"ok": True, "message": "!!! User signed in successfully !!!", "token": jwt_token}, headers={"Authorization": f"Bearer {jwt_token}"},status_code=200)
    
    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
    finally:
        conn_close(conn)