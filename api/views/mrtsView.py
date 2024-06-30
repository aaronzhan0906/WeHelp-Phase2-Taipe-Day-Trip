from pydantic import BaseModel
from typing import List, Union ,Tuple

class MRTResponse(BaseModel):
    data: Union[List[str], List[Union[str, Tuple]]]



