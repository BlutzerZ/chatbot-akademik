from typing import Annotated, Union

from fastapi.security import HTTPBearer
from exceptions.custom_exceptions import CustomHTTPException
from config.database import get_db
from app.feedback import model, request, response, service
from fastapi import APIRouter, Depends, Request, HTTPException
from sqlalchemy.orm import Session
import middleware
from uuid import UUID

router = APIRouter()

@router.get(
    "/feedback",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetAllFeedbackResponse,
    tags=["Feedback"],
)
async def get_all_feedback(
    request: Request, 
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.get_all_feedback(request.state.jwtData)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e)
        )
    
    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty"
        )

    return response.GetAllFeedbackResponse(
        code=200, message="Loh valid", data=feedback
    )

@router.get(
    "/feedback/{feedbacks_id}",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackMessageResponse,
    tags=["Feedback"],
)
async def feedback_to_message(
    request: Request, 
    feedbacks_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.get_feedback_by_id(
        jwtData=request.state.jwtData,
        feedback_id=feedbacks_id,
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e)
        )
    
    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty"
        )

    return response.FeedbackMessageResponse(
        code=200, message="Loh valid", data=feedback
    )


@router.put(
    "/messages/{messages_id}/feedback",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackMessageResponse,
    tags=["Feedback"],
)
async def feedback_to_message(
    request: Request, 
    messages_id: UUID,
    data: request.FeedbackRequest,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    print(data)
    e, feedback = _service.feedback_by_message(
        jwtData=request.state.jwtData,
        message_id=messages_id,
        data=data
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e)
        )
    
    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty"
        )

    return response.FeedbackMessageResponse(
        code=200, message="Loh valid", data=feedback
    )
