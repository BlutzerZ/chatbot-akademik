from config.database import dbSession
from helper.jwt import generate_token
from app.user import models, request, response, 
from fastapi import APIRouter

router = APIRouter()

@router.get(
        "/", 
        response_model=list[response.AnatomiResponse], 
        tags=["Anatomi"])
async def get_all_anatomi(
        page: Union[int, None] = None,
        limit: Union[int, None] = None,
    ):
    db = database.dbSession()
    
    if page == None:
        anatomis = db.query(models.Anatomi).limit(100 if limit == None else limit).all()
    else:
        offset = (page - 1) * limit
        anatomis = db.query(models.Anatomi).offset(offset).limit(limit).all()

    db.close()
    return anatomis
