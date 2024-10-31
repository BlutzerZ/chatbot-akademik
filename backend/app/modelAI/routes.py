# from typing import Annotated, Union

# from fastapi.security import HTTPBearer
# from app.user.service import UserService
# from middleware.jwt import JWTBearer
# from config.database import get_db
# from app.user import model, request, response
# from fastapi import APIRouter, Depends, Request
# from sqlalchemy.orm import Session
# import middleware

from typing import List
from fastapi import APIRouter, Depends, Request, HTTPException, status
from sqlalchemy.orm import Session
from uuid import UUID

from app.modelAI import model, request, response, service
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
    models = _service.get_all_models(limit=limit)

    if not models:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="No models found."
        )

    return response.GetAllModelResponse(
        code=status.HTTP_200_OK, message="Models fetched successfully", data=models
    )


# POST /model
@router.post(
    "/model",
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

    if e != None:
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=e)

    return response.GetModelResponse(
        code=status.HTTP_201_CREATED,
        message="Model created successfully",
        data=new_model,
    )


# GET /model/{model_id}
@router.get(
    "/model/{model_id}",
    dependencies=[Depends(JWTBearer())],
    response_model=response.GetModelResponse,
    tags=["ModelAI"],
)
async def get_model_by_id(
    request: Request, model_id: UUID, session: Session = Depends(get_db)
):
    _service = service.ModelAIService(session)
    model_data = _service.get_model_by_id(model_id)

    if not model_data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Model not found."
        )

    return response.GetModelResponse(
        code=status.HTTP_200_OK, message="Model fetched successfully", data=model_data
    )
