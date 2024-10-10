
import requests
from app.user.model import *
from sqlalchemy.orm import Session # type: ignore
from app.user.request import *
from app.user.response import *


class UserService:
    def __init__(self, session: Session):
        self.session = session
    
    def auth(self, data:UserAuthRequest) -> UserAuthResponse:
        r = requests.post("https://api.dinus.ac.id/api/v1/siadin/login", {
            "username": data.username,
            "password": data.password,
        })
        user = self.session.query(User).filter_by(user)

