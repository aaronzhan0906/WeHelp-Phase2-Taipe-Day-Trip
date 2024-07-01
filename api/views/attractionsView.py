from typing import List, Optional
from fastapi.responses import JSONResponse
from api.models.attractionsModel import Attraction

class AttractionView:
    @staticmethod
    def process_images(images_raw: str) -> List[str]:
        if images_raw:
            images_raw = images_raw.strip('"').replace('\\\\','\\')
            return images_raw.split('\\n')
        return []

    @staticmethod
    def convert_to_attraction(attraction: tuple) -> Attraction:
        return Attraction(
            id=attraction[0],
            name=attraction[1],
            category=attraction[2],
            description=attraction[3],
            address=attraction[4],
            transport=attraction[5],
            mrt=attraction[6],
            latitude=attraction[7],
            longitude=attraction[8],
            images=AttractionView.process_images(attraction[9])
        )

    @staticmethod
    def format_attractions_response(attractions: List[Attraction], next_page: Optional[int]):
        return {"nextPage": next_page, "data": [attraction.model_dump() for attraction in attractions]}
        

    @staticmethod
    def format_attraction_response(attraction: Attraction):
        return{"data": attraction.model_dump()}