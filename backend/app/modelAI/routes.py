from typing import List
from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.modelAI import model, request, response, service
from exceptions.custom_exceptions import CustomHTTPException
from config.database import get_db
from middleware.jwt import JWTBearer

router = APIRouter()


# GET /models
@router.get(
    "/models",
    dependencies=[Depends(JWTBearer())],
    response_model=response.GetAllModelResponse,
    tags=["ModelAI"],
)
async def get_all_models(
    request: Request, limit: int, session: Session = Depends(get_db)
):
    _service = service.ModelAIService(session)
    e, models = _service.get_all_models(limit=limit)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not models:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetAllModelResponse(
        code=status.HTTP_200_OK, message="Models fetched successfully", data=models
    )


# POST /model
@router.post(
    "/models",
    dependencies=[Depends(JWTBearer())],
    response_model=response.GetModelResponse,
    tags=["ModelAI"],
)
async def create_model(
    request: Request,
    model_request: request.CreateModelRequest,
    session: Session = Depends(get_db),
):
    _service = service.ModelAIService(session)
    e, new_model = _service.create_model(model_request)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not new_model:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )
    return response.GetModelResponse(
        code=status.HTTP_201_CREATED,
        message="Model created successfully",
        data=new_model,
    )


# GET /model/{model_id}
@router.get(
    "/models/{model_id}",
    dependencies=[Depends(JWTBearer())],
    response_model=response.GetModelResponse,
    tags=["ModelAI"],
)
async def get_model_by_id(
    request: Request, model_id: UUID, session: Session = Depends(get_db)
):
    _service = service.ModelAIService(session)
    e, model_data = _service.get_model_by_id(model_id)

    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not model_data:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.GetModelResponse(
        code=status.HTTP_200_OK, message="Model fetched successfully", data=model_data
    )
