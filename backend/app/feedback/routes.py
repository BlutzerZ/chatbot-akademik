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

@router.put(
    "/messages/{message_id}/feedback",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackMessageResponse,
    tags=["Feedback"],
)
async def feedback_to_message(
    request: Request,
    message_id: UUID,
    data: request.FeedbackRequest,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.feedback_by_message(
        jwtData=request.state.jwtData, message_id=message_id, data=data
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.FeedbackMessageResponse(
        code=200, message="Loh valid", data=feedback
    )

@router.get(
    "/feedbacks",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.GetAllFeedbackResponse,
    tags=["Feedback"],
)
async def get_all_feedback(
    request: Request,
    filterData: request.FeedbackFiltersRequest = Depends(),
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.get_all_feedback(request.state.jwtData, filterData)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetAllFeedbackResponse(code=200, message="Loh valid", data=feedback)


@router.get(
    "/feedbacks/{feedback_id}",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackMessageResponse,
    tags=["Feedback"],
)
async def get_feedback_by_id(
    request: Request,
    feedback_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.get_feedback_by_id(
        jwtData=request.state.jwtData,
        feedback_id=feedback_id,
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.FeedbackMessageResponse(
        code=200, message="Loh valid", data=feedback
    )

@router.put(
    "/feedbacks/{feedback_id}/status",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackMessageResponse,
    tags=["Feedback"],
)
async def change_feedback_status(
    request: Request,
    feedback_id: UUID,
    payload: request.FeedbackStatusRequest,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedback = _service.change_feedback_status(
        jwtData=request.state.jwtData,
        feedbackID=feedback_id,
        payload=payload,
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedback:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.FeedbackMessageResponse(
        code=200, message="Loh valid", data=feedback
    )



@router.get(
    "/feedbacks/{feedback_id}/correction",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackCorrectionResponse,
    tags=["Feedback"],
)
async def get_feedback_correction(
    request: Request,
    feedback_id: UUID,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedbackCorrection = _service.get_feedback_correction_by_feedback_id(
        jwtData=request.state.jwtData,
        feedback_id=feedback_id
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedbackCorrection:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.FeedbackCorrectionResponse(
        code=200, message="Loh valid", data=feedbackCorrection
    )

@router.put(
    "/feedbacks/{feedback_id}/correction",
    dependencies=[Depends(middleware.JWTBearer())],
    response_model=response.FeedbackCorrectionResponse,
    tags=["Feedback"],
)
async def change_feedback_correction(
    request: Request,
    feedback_id: UUID,
    payload: request.FeedbackCorrectionRequst,
    session: Session = Depends(get_db),
):

    _service = service.FeedbackService(session)
    e, feedbackCorrection = _service.edit_feedback_correction(
        jwtData=request.state.jwtData,
        feedback_id=feedback_id,
        payload=payload,
    )

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not feedbackCorrection:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.FeedbackCorrectionResponse(
        code=200, message="Loh valid", data=feedbackCorrection
    )