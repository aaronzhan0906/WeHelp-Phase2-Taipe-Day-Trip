from fastapi import APIRouter
from datetime import datetime, timezone, timedelta
import jwt

router = APIRouter()

SECRET_KEY = "secreeeeet"
ALGORITHM = "HS256"

def create_jwt_token(email: str) -> str: 
    payload = {
        "sub": email,
        "exp": datetime.now(tz=timezone.utc) + timedelta(hours=168)
    }

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    return token

def update_jwt_payload(token: str, new_booking: dict) -> str:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        payload.update(new_booking)
        
        updated_token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
        return updated_token
    
    except jwt.PyJWTError:
        return None