from typing import Union
from app.user.service import UserService
from config.database import get_db
from helper.jwt import generate_token
from app.user import model, request, response
from fastapi import APIRouter, Depends # type: ignore
from sqlalchemy.orm import Session # type: ignore

router = APIRouter()

@router.get("/auth", response.UserAuthResponse, tags=["User"])
async def get_all_anatomi(
        data: response.UserAuthResponse,
        session: Session = Depends(get_db)
    ):
    _service = UserService(session)
    return _service.auth(data)
