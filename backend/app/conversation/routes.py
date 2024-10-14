from typing import Annotated, Union

from fastapi.security import HTTPBearer
from config.database import get_db
from app.conversation import model, request, response, service
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
import middleware 
from uuid import UUID
router = APIRouter()


@router.get("/conversations", dependencies=[Depends(middleware.JWTBearer())], response_model=response.GetAllConversationResponse, tags=["Conversation"])
async def get_all_conversation(
        request: Request,
        limit: int,
        session: Session = Depends(get_db)
    ):

    _service = service.ConversationService(session)
    conversations = _service.get_all_conversations(
        jwtData=request.state.jwtData, 
        limit=limit,
    )

    return response.GetAllConversationResponse(code=200, message="Loh valid", data=conversations)



@router.post("/conversation", dependencies=[Depends(middleware.JWTBearer())], response_model=response.CreateConversationResponse, tags=["Conversation"])
async def create_conversation(
        request: Request,
        data: request.CreateConversationRequest,
        session: Session = Depends(get_db),
    ):

    _service = service.ConversationService(session)
    e, messages = _service.create_conversation(request.state.jwtData, data.message)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))

    return response.CreateConversationResponse(code=200, message="Showing all message", data=messages)



@router.get("/conversation/{convesation_id}", dependencies=[Depends(middleware.JWTBearer())], response_model=response.GetConversationByIDResponse, tags=["Conversation"])
async def get_conversation_by_id(
        request: Request,
        conversation_id : UUID,
        session: Session = Depends(get_db),
    ):

    _service = service.ConversationService(session)
    e, conversation = _service.get_conversation_by_id(request.state.jwtData, conversation_id)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))


    return response.GetConversationByIDResponse(code=200, message="Loh valid", data=[conversation])



# @router.get("/conversation/{convesation_id}/messages", dependencies=[Depends(jwt.JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
# async def user_detail(
#         request: Request,
#         session: Session = Depends(get_db)
#     ):
    
#     return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



# @router.post("/conversation/{convesation_id}/message", dependencies=[Depends(jwt.JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
# async def user_detail(
#         request: Request,
#         session: Session = Depends(get_db)
#     ):
    
#     return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



# @router.get("/conversation/{convesation_id}/message/{message_id}", dependencies=[Depends(jwt.JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
# async def user_detail(
#         request: Request,
#         session: Session = Depends(get_db)
#     ):
    
#     return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])



# @router.post("/conversation/{convesation_id}/message/{message_id}/feedback", dependencies=[Depends(jwt.JWTBearer())], response_model=response.UserDetailResponse, tags=["User"])
# async def user_detail(
#         request: Request,
#         session: Session = Depends(get_db)
#     ):
    
#     return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])

