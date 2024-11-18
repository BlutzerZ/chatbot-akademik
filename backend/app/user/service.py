from fastapi import HTTPException
import requests
from app.user.model import *
from sqlalchemy.orm import Session
from app.user import request, response, model
from password_generator import PasswordGenerator

from helper import jwt

pwo = PasswordGenerator()
pwo.minlen = 16


class UserService:
    def __init__(self, session: Session):
        self.session = session

    def get_token_by_username(self, username):
        user = self.session.query(User).filter(User.username == username).first()
        if not user:
            try:
                user = model.User(username=username, token=pwo.generate())
                self.session.add(user)
                self.session.commit()
                self.session.refresh(user)

            except Exception as e:
                self.session.rollback()
                return e, None

        token = jwt.generate_token({"id": user.id, "username": user.username})
        return None, token

    def auth(self, data: request.UserAuthRequest) -> response.UserAuthResponse:
        # testing mode
        if data.username == data.password:
            testingLogin = True

        r = requests.post(
            "https://api.dinus.ac.id/api/v1/siadin/login",
            json={
                "username": data.username,
                "password": data.password,
            },
        )

        if r.status_code == 200 or testingLogin == True:
            e, token = self.get_token_by_username(data.username)
            if e:
                raise

            return response.UserAuthResponse(
                code=200, message=f"Authentication Valid", data={"token": token}
            )

        else:
            raise HTTPException(status_code=401, detail="unathorize")

    def refresh_token(self, jwtData) -> response.UserAuthResponse:
        try:
            token = jwt.generate_token(jwtData)
        except Exception as e:
            return e, None

        print(token)
        return None, token

    def get_user_detail(self, jwtData) -> tuple[Exception, User]:
        try:
            user = self.session.query(User).filter_by(id=jwtData["id"]).first()
            return None, user

        except Exception as e:
            return e, None
