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



@router.post("/conversations", dependencies=[Depends(middleware.JWTBearer())], response_model=response.CreateConversationOrMessageResponse, tags=["Conversation"])
async def create_conversation(
        request: Request,
        data: request.CreateConversationOrMessageRequest,
        session: Session = Depends(get_db),
    ):

    _service = service.ConversationService(session)
    e, messages = _service.create_conversation(request.state.jwtData, data.message)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))

    return response.CreateConversationOrMessageResponse(code=200, message="Showing all message", data=messages)



@router.get("/conversations/{convesation_id}", dependencies=[Depends(middleware.JWTBearer())], response_model=response.GetConversationByIDResponse, tags=["Conversation"])
async def get_conversation_by_id(
        request: Request,
        conversation_id : UUID,
        session: Session = Depends(get_db),
    ):

    _service = service.ConversationService(session)
    e, conversation = _service.get_conversation_by_id(request.state.jwtData, conversation_id)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))


    return response.GetConversationByIDResponse(code=200, message="Loh valid", data=conversation)



@router.get("/conversations/{convesation_id}/messages", dependencies=[Depends(middleware.JWTBearer())], response_model=response.GetConversationByIDWithMessageResponse, tags=["Conversation"])
async def get_conversation_by_id_with_message(
        request: Request,
        conversation_id : UUID,
        session: Session = Depends(get_db),
    ):

    _service = service.ConversationService(session)
    e, conversation = _service.get_conversation_by_id(request.state.jwtData, conversation_id)
    
    if e != None:
        raise HTTPException(status_code=501, detail=str(e))

    
    return response.GetConversationByIDWithMessageResponse(code=200, message="Loh valid", data=conversation.messages)



@router.post("/conversations/{convesation_id}/messages", dependencies=[Depends(middleware.JWTBearer())], response_model=response.CreateConversationOrMessageResponse, tags=["Conversation"])
async def create_message_by_coverstaion_id(
        request: Request,
        conversation_id : UUID,
        data: request.CreateConversationOrMessageRequest,
        session: Session = Depends(get_db)
    ):

    _service = service.ConversationService(session)
    e, message = _service.create_message_by_conversation_id(request.state.jwtData, data.message, conversation_id)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))
    
    return response.CreateConversationOrMessageResponse(code=200, message="Loh valid", data=message)



@router.get("/conversations/{convesation_id}/messages/{message_id}", dependencies=[Depends(middleware.JWTBearer())], response_model=response.GetMessageByIDResponse, tags=["Conversation"])
async def get_message_with_convetsation_id_and_message_id(
        request: Request,
        conversation_id : UUID,
        message_id: UUID,
        session: Session = Depends(get_db)
    ):

    _service = service.ConversationService(session)
    e, message = _service.get_message_by_id(request.state.jwtData, message_id, conversation_id)

    if e != None:
        raise HTTPException(status_code=501, detail=str(e))
    
    return response.GetMessageByIDResponse(code=200, message="Loh valid", data=message)



# @router.post("/conversations/{convesation_id}/messages/{message_id}/feedback", dependencies=[Depends(jwt.JWTBearer())], response_model=response.UserDetailResponse, tags=["Conversation"])
# async def user_detail(
#         request: Request,
#         session: Session = Depends(get_db)
#     ):
    
#     return response.UserDetailResponse(code=200, message="Loh valid", data=[user_detail])

