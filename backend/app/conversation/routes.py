from typing import Annotated, Union

from fastapi.security import HTTPBearer
from app.user.service import UserService
from middleware.jwt import JWTBearer
from config.database import get_db
from app.user import model, request, response
from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
import middleware

router = APIRouter()


@router.get("/conversations", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.post("/conversation", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.get("/conversation/{convesation_id}", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.get("/conversation/{convesation_id}/messages", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.post("/conversation/{convesation_id}/message", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.get("/conversation/{convesation_id}/message/{message_id}", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



@router.post("/conversation/{convesation_id}/message/{message_id}/feedback", dependencies=[Depends(JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
async def user_detail(
        request: Request,
        session: Session = Depends(get_db)
    ):
    
    return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])

