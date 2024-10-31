from typing import Annotated, Union

from fastapi.security import HTTPBearer
from app.user.service import UserService
from middleware.jwt import JWTBearer
from config.database import get_db
from app.user import model, request, response
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
import middleware

router = APIRouter()


@router.post("/auth/sign-in", response_model=response.UserAuthResponse, tags=["User"])
async def user_authentication(
    data: request.UserAuthRequest, session: Session = Depends(get_db)
):
    _service = UserService(session)
    return _service.auth(data)


oauth2_scheme = HTTPBearer()


@router.get(
    "/auth/me",
    dependencies=[Depends(JWTBearer())],
    response_model=response.UserDetailResponse,
    tags=["User"],
)
async def user_detail(request: Request, session: Session = Depends(get_db)):
    _service = UserService(session)
    user = _service.get_user_detail(request.state.jwtData)

    return response.UserDetailResponse(code=200, message="Loh valid", data=user)


@router.get(
    "/auth/refresh-token",
    dependencies=[Depends(JWTBearer())],
    response_model=response.UserAuthResponse,
    tags=["User"],
)
async def refresh_token(request: Request, session: Session = Depends(get_db)):
    _service = UserService(session)
    e, token = _service.refresh_token(request.state.jwtData)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))

    return response.UserAuthResponse(
        code=200, message="Loh valid", data={"token": token}
    )
