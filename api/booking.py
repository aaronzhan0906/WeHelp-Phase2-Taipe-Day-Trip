from fastapi import APIRouter, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from datetime import date
import jwt
from api.user import get_user_info
from api.jwt_utils import update_jwt_payload, create_jwt_token, SECRET_KEY, ALGORITHM
from fastapi.encoders import jsonable_encoder

router = APIRouter()

class AttractionInfo(BaseModel):
    id: int
    name: str
    address: str
    image: str

class BookingInfo(BaseModel):
    attraction: AttractionInfo
    date: date
    time: str
    price: int


@router.get("/api/booking")
async def get_order(authorization: str = Header(...), booking: BookingInfo = None):
    user_info = await get_user_info(authorization)
    if not user_info:
        raise HTTPException(status_code=403, detail={"error": True, "message": "Not logged in."})
    
    try:
        token = authorization.split()[1]
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if not payload or "booking" not in payload:
            return JSONResponse(content={"data": None}, status_code=200)

        booking = payload["booking"]
        return JSONResponse(content={"data": booking}, status_code=200)

    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    
# post 訂購資訊後 根據訂購訊息儲存在 jwt 的 payload ，get 可以回傳後顯示， delete 可以把 jwt 裡的訂購訊息刪除
@router.post("/api/booking")
async def post_order(authorization: str = Header(...), booking: BookingInfo = None):
    user_info = await get_user_info(authorization)
    if not user_info:
        raise HTTPException(status_code=403, detail={"error": True, "message": "Not logged in."})

    try:
        token = authorization.split()[1]
        if not booking:
            return JSONResponse(content={"error": True, "message": "建立失敗，輸入不正確或其他原因"},status_code=400)

        attraction_dict = jsonable_encoder(booking.attraction)

        new_booking = {
            "attraction": attraction_dict,
            "date": str(booking.date),
            "time": booking.time,
            "price": booking.price
        }

        token = authorization.split()[1]  
        new_token = update_jwt_payload(token, {"booking": new_booking})

        return JSONResponse(content={"ok": True}, headers={"Authorization": f"Bearer {new_token}"}, status_code=200)


    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)
    

@router.delete("/api/booking")
async def delete_order(authorization: str = Header(...)):
    user_info = await get_user_info(authorization)
    if not user_info:
        raise HTTPException(status_code=403, detail={"error": True, "message": "Not logged in."})

    try:
        token = authorization.split()[1]  # 獲取 token 部分
        no_booking_token = update_jwt_payload(token, {"booking": None})
        return JSONResponse(content={"ok": True}, headers={"Authorization": f"Bearer {no_booking_token}"}, status_code=200)

    except Exception as exception:
        return JSONResponse(content={"error": True, "message": str(exception)}, status_code=500)