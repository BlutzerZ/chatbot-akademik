
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
    
    def auth(self, data:request.UserAuthRequest) -> response.UserAuthResponse:
        r = requests.post("https://api.dinus.ac.id/api/v1/siadin/login", json={
            "username": data.username,
            "password": data.password,
        })
        if r.status_code == 200:
            user = self.session.query(User).filter(User.username == data.username).first()
            if not user:
                try:
                    user = model.User(
                        username=data.username,
                        token=pwo.generate()
                    )
                    self.session.add(user)
                    self.session.commit()
                    self.session.refresh(user)
                except:
                    self.session.rollback()
                    raise
                
            token = jwt.generate_token({
                "id": user.id,
                "username": user.username
            })

            return response.UserAuthResponse(token=token)
        
        else:
            raise HTTPException(status_code=401, detail="unathorize")
