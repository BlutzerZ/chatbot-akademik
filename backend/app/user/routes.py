from typing import Annotated, Union

from fastapi.responses import RedirectResponse
from fastapi.security import HTTPBearer, OAuth2PasswordBearer
from app.user.service import UserService
from middleware.jwt import JWTBearer
from config.database import get_db
from app.user import request, response
from fastapi import APIRouter, Depends, HTTPException, Request
from sqlalchemy.orm import Session
from exceptions.custom_exceptions import CustomHTTPException

from urllib.parse import urlencode, parse_qs, urlparse
import requests, os

router = APIRouter()
oauth2_scheme = HTTPBearer()


# Replace these with your own values from the Google Developer Console
@router.get("/auth/sing-in/google", tags=["User"])
async def login_google(callback_url: str):
    state = urlencode({"callback_url": callback_url})
    return {
        "url": f"https://accounts.google.com/o/oauth2/auth"
        f"?response_type=code&client_id={os.getenv('GOOGLE_CLIENT_ID')}"
        f"&redirect_uri={os.getenv('GOOGLE_REDIRECT_URI')}"
        f"&scope=openid%20profile%20email&access_type=offline&state={state}"
    }


@router.get("/auth/sign-in/google/callback/", tags=["Callback"])
async def auth_google(
    request: Request, code: str, state: str, session: Session = Depends(get_db)
):
    parsedState = parse_qs(state)
    callbackUrl = parsedState.get("callback_url", [None])[0]

    _response = requests.post(
        url="https://accounts.google.com/o/oauth2/token",
        data={
            "code": code,
            "client_id": os.getenv("GOOGLE_CLIENT_ID"),
            "client_secret": os.getenv("GOOGLE_CLIENT_SECRET"),
            "redirect_uri": os.getenv("GOOGLE_REDIRECT_URI"),
            "grant_type": "authorization_code",
        },
    )
    if _response.status_code != 200:
        return RedirectResponse(url=f"{callbackUrl}?error=access_denied")

    accessToken = _response.json().get("access_token")
    userInfo = requests.get(
        url="https://www.googleapis.com/oauth2/v1/userinfo",
        headers={"Authorization": f"Bearer {accessToken}"},
    )
    if userInfo.status_code != 200:
        return RedirectResponse(url=f"{callbackUrl}?error=failed_to_retrieve_user")

    _service = UserService(session)
    e, token = _service.get_token_by_username(userInfo.json().get("email"))

    if e != None:
        return RedirectResponse(url=f"{callbackUrl}?access_token=invalid")

    return RedirectResponse(url=f"{callbackUrl}?access_token={token}")


@router.post("/auth/sign-in", response_model=response.UserAuthResponse, tags=["User"])
async def user_authentication(
    data: request.UserAuthRequest, session: Session = Depends(get_db)
):
    _service = UserService(session)
    return _service.auth(data)


@router.get(
    "/auth/me",
    dependencies=[Depends(JWTBearer())],
    response_model=response.UserDetailResponse,
    tags=["User"],
)
async def user_detail(request: Request, session: Session = Depends(get_db)):
    _service = UserService(session)
    e, user = _service.get_user_detail(request.state.jwtData)
    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not user:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.UserDetailResponse(
        code=200,
        message="Loh valid",
        data=user,
    )


@router.get(
    "/auth/refresh-token",
    dependencies=[Depends(JWTBearer())],
    response_model=response.UserAuthResponse,
    tags=["User"],
)
async def refresh_token(request: Request, session: Session = Depends(get_db)):
    _service = UserService(session)
    e, token = _service.refresh_token(request.state.jwtData)
    if e:
        raise CustomHTTPException(
            type_="/internal-server-error",
            title="Internal Server Error at Service",
            status=500,
            detail=str(e),
        )

    if not token:
        raise CustomHTTPException(
            type_="/not-found",
            title="Not Found",
            status=404,
            detail="Data not found or empty",
        )

    return response.UserAuthResponse(
        code=200,
        message="Loh valid",
        data={
            "token": token,
        },
    )
