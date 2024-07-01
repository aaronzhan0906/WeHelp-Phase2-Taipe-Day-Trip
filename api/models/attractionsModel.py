from typing import List, Optional, Tuple
from pydantic import BaseModel
from data.database import get_cursor, conn_commit, conn_close


class Attraction(BaseModel):
    id: int
    name: str
    category: str
    description: str
    address: str
    transport: str
    mrt: Optional[str]
    latitude: float
    longitude: float
    images: List[str]

class AttractionModel:
    @staticmethod
    def get_attractions(offset: int, limit: int, keyword: Optional[str] = None) -> Tuple[List[Tuple], int]:
        try:
            cursor, conn = get_cursor()
            base_query = "SELECT * FROM attractions"
            count_query = "SELECT COUNT(*) FROM attractions"
            params = []

            if keyword:
                base_query += " WHERE name LIKE %s OR mrt = %s"
                count_query += " WHERE name LIKE %s OR mrt = %s"
                params.extend([f"%{keyword}%", keyword])

            cursor.execute(count_query, params)
            total_count = cursor.fetchone()[0]
            
            base_query += " LIMIT %s OFFSET %s"
            params.extend([limit, offset])
            cursor.execute(base_query, params)
            attractions_tuple = cursor.fetchall()

            return attractions_tuple, total_count
        finally:
            conn_commit(conn)
            conn_close(conn)

    @staticmethod
    def get_attraction_by_id(attraction_id: int) -> Optional[tuple]:
        try:
            cursor, conn = get_cursor()
            query = "SELECT * FROM attractions WHERE id = %s"
            cursor.execute(query, (attraction_id,))
            return cursor.fetchone()
        finally:
            conn_commit(conn)
            conn_close(conn)