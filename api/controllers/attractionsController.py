from fastapi import APIRouter, Query, HTTPException
from fastapi.responses import JSONResponse
from typing import Optional
from api.models.attractionsModel import AttractionModel
from api.views.attractionsView import AttractionView

router = APIRouter()

@router.get("/api/attractions")
async def attractions(page: int = Query(0, ge=0), keyword: Optional[str] = Query(None)):
    try:
        limit = 12
        offset = page * limit
        attractions_tuple, total_count = AttractionModel.get_attractions(offset, limit, keyword)
        attractions_list = [AttractionView.convert_to_attraction(attraction) for attraction in attractions_tuple]
        
        next_page = page + 1 if offset + len(attractions_list) < total_count else None
        
        response_data = AttractionView.format_attractions_response(attractions_list, next_page)
        
        return JSONResponse(content=response_data)
    except Exception as exception:
        raise HTTPException(status_code=500, detail={"error": True, "message": str(exception)})

@router.get("/api/attraction/{attractionId}")
async def attraction(attractionId: int):
    try:
        attraction_tuple = AttractionModel.get_attraction_by_id(attractionId)
        if attraction_tuple:
            attraction_data = AttractionView.convert_to_attraction(attraction_tuple)
            return AttractionView.format_attraction_response(attraction_data)
        else:
            raise HTTPException(status_code=400, detail={"error": True, "message": "Attraction number is incorrect."})
    except Exception as exception:
        raise HTTPException(status_code=500, detail={"error": True, "message": str(exception)})