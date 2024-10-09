from datetime import date
from pydantic import BaseModel # type: ignore


class AnatomiResponse(BaseModel):
    nama: str
    deskripsi: str
    
    class Config:
        orm_mode = True 