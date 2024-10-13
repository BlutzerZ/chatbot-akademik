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

# GET /models
# POST /model
# GET /model/{model_id}
