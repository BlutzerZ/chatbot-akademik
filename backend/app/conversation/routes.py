from typing import Annotated, Union

from fastapi.security import HTTPBearer
from exceptions.custom_exceptions import CustomHTTPException
from config.database import get_db
from app.conversation import model, request, response, service
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
import middleware
from uuid import UUID

router = APIRouter()


@router.get(
    "/conversations",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetAllConversationResponse,
    tags=["Conversation"],
)
async def get_all_conversation(
    request: Request, limit: int, session: Session = Depends(get_db)
):

    _service = service.ConversationService(session)
    e, conversations = _service.get_all_conversations(
        jwtData=request.state.jwtData,
        limit=limit,
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not conversations:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetAllConversationResponse(
        code=200, message="Loh valid", data=conversations
    )


@router.post(
    "/conversations",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.CreateConversationOrMessageResponse,
    tags=["Conversation"],
)
async def create_conversation(
    request: Request,
    data: request.CreateConversationOrMessageRequest,
    session: Session = Depends(get_db),
):

    _service = service.ConversationService(session)
    e, messages = _service.create_conversation(request.state.jwtData, data.message)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not messages:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.CreateConversationOrMessageResponse(
        code=200, message="Showing all message", data=messages
    )


@router.get(
    "/conversations/{conversation_id}",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetConversationByIDResponse,
    tags=["Conversation"],
)
async def get_conversation_by_id(
    request: Request,
    conversation_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.ConversationService(session)
    e, conversation = _service.get_conversation_by_id(
        request.state.jwtData, conversation_id
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not conversation:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetConversationByIDResponse(
        code=200, message="Loh valid", data=conversation
    )


@router.get(
    "/conversations/{conversation_id}/inquire",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetConversationByIDWithMessageResponse,
    tags=["Conversation"],
)
async def get_conversation_by_id_with_message(
    request: Request,
    conversation_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.ConversationService(session)
    e, conversation = _service.get_conversation_by_id(
        request.state.jwtData, conversation_id
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not conversation:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetConversationByIDWithMessageResponse(
        code=200, message="Loh valid", data=conversation.messages
    )


@router.post(
    "/conversations/{conversation_id}/inquire",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.CreateConversationOrMessageResponse,
    tags=["Conversation"],
)
async def create_message_by_coverstaion_id(
    request: Request,
    conversation_id: UUID,
    data: request.CreateConversationOrMessageRequest,
    session: Session = Depends(get_db),
):

    _service = service.ConversationService(session)
    e, message = _service.create_message_by_conversation_id(
        request.state.jwtData, data.message, conversation_id
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not message:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.CreateConversationOrMessageResponse(
        code=200, message="Loh valid", data=message
    )


@router.get(
    "/messages/{message_id}",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetMessageByIDResponse,
    tags=["Conversation"],
)
async def get_message_by_id(
    request: Request,
    message_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.ConversationService(session)
    e, message = _service.get_message_by_id(request.state.jwtData, message_id)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not message:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetMessageByIDResponse(code=200, message="Loh valid", data=message)


@router.get(
    "/messages/{message_id}/logs",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetLogResponse,
    tags=["Conversation"],
)
async def get_message_logs(
    request: Request,
    message_id: UUID,
    session: Session = Depends(get_db),
):
    """
    Endpoint untuk mendapatkan log berdasarkan message_id tertentu.
    """
    _service = service.ConversationService(session)
    e, log = _service.get_generation_logs(
        jwt_data=request.state.jwtData, message_id=message_id
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not log:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Logs not found for the specified message ID",
        )

    return response.GetLogResponse(
        id=log["id"], message_id=log["message_id"], data=log["data"]
    )


from fastapi import Body


@router.put(
    "/messages/{message_id}/logs",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.CreateOrUpdateLogResponse,
    tags=["Conversation"],
)
async def update_message_log(
    request: Request,
    message_id: UUID,
    log_data: dict = Body(...),  # Gunakan Body untuk menangkap request body
    session: Session = Depends(get_db),
):
    """
    Endpoint to create or update a log associated with a specific message.
    """
    _service = service.ConversationService(session)
    e, log = _service.create_or_update_log(
        jwt_data=request.state.jwtData, message_id=message_id, log_data=log_data
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    return response.CreateOrUpdateLogResponse(
        id=log["id"], message_id=log["message_id"], data=log["data"]
    )
