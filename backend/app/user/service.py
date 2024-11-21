from fastapi import HTTPException
import requests
from sqlalchemy.orm import Session
from app.user import request, response, model
from password_generator import PasswordGenerator

from datetime import datetime
from helper import jwt
from helper.role import is_admin, is_user

pwo = PasswordGenerator()
pwo.minlen = 16


class UserService:
    def __init__(self, session: Session):
        self.session = session

    def create_user(self, username) -> list[Exception, model.User]:  # should be change
        # if is_admin(jwtData):
        try:
            user = model.User(username=username, token=pwo.generate())
            role = model.Role(name=model.RoleType.user, user=user)
            self.session.add(user)
            self.session.add(role)
            self.session.commit()
            self.session.refresh(user)
            self.session.refresh(role)
            return None, user
        except Exception as e:
            self.session.rollback()
            return e, None

    def get_token_by_username(self, username) -> list[Exception, model.User]:
        user = (
            self.session.query(model.User)
            .filter(model.User.username == username)
            .first()
        )
        if not user:
            e, user = self.create_user(username)
            if e:
                return e, None

        token = jwt.generate_token(
            {
                "id": user.id,
                "username": user.username,
                "role": user.role.name.value,
            }
        )
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

    def get_user_detail(self, jwtData) -> list[Exception, model.User]:
        try:
            user = self.session.query(model.User).filter_by(id=jwtData["id"]).first()
            return None, user

        except Exception as e:
            return e, None

    def get_users(self, jwtData, filterData) -> list[Exception, model.User]:
        if is_admin(jwtData):
            try:
                # Start
                query = self.session.query(model.User)

                # Search
                if filterData.search_query:
                    query = query.filter(
                        model.User.username.ilike(f"%{filterData.search_query}%")
                    )

                if filterData.include_deleted:
                    query = query.filter(
                        model.User.deleted_at.isnot(None)
                    )  # Hanya tampilkan jika 'deleted_by' tidak kosong

                # Date
                if filterData.start_date:
                    query = query.filter(model.User.created_at >= filterData.start_date)
                if filterData.end_date:
                    query = query.filter(model.User.created_at <= filterData.end_date)

                # order_by
                field = (
                    getattr(model.User, filterData.sort_by)
                    if filterData.sort_by and hasattr(model.User, filterData.sort_by)
                    else model.User.id
                )

                # sort
                if filterData.order and filterData.order.lower() == "desc":
                    query = query.order_by(field.desc())
                else:
                    query = query.order_by(field.asc())

                # Pagination
                if filterData.page and filterData.limit:
                    offset = (filterData.page - 1) * filterData.limit
                    query = query.offset(offset).limit(filterData.limit)
                elif filterData.limit:
                    query = query.limit(filterData.limit)

                # Execute
                users = query.all()

                return None, users
            except Exception as e:
                return e, None
        else:
            return Exception("User is not allowed"), None

    def get_user_by_id(self, jwtData, userID) -> list[Exception, model.User]:
        if is_admin(jwtData):
            try:
                user = self.session.query(model.User).filter_by(id=userID).first()
                return None, user

            except Exception as e:
                return e, None
        else:
            return Exception("User is not Allowed"), None

    def edit_user_by_id(self, jwtData, userID, data) -> list[Exception, model.User]:
        if is_admin(jwtData):
            e, user = self.get_user_by_id(jwtData, userID)
        elif is_user(jwtData):
            e, user = self.get_user_detail(jwtData)
        else:
            return Exception("Invalid Role"), None

        if e:
            return e, None

        if data.new_username:
            user.username = data.new_username

        if is_admin(jwtData):

            if data.new_role:
                try:
                    role_type = model.RoleType[data.new_role.lower()]
                except Exception as e:
                    return e, None

                if user.role:
                    user.role.name = role_type
                else:
                    new_role = model.Role(name=role_type, user_id=user.id)
                    self.session.add(new_role)
            else:
                return Exception("User is not Allowed"), None

            self.session.commit()
            self.session.refresh(user)

        return None, user

    def delete_user_by_id(self, jwtData, userID) -> list[Exception, model.User]:
        if is_admin(jwtData):
            e, user = self.get_user_by_id(jwtData, userID)
            if e:
                return e, None

            try:
                user.deleted_at = datetime.today()
                self.session.add(user)
                self.session.commit()
                self.session.refresh(user)

                return None, user
            except Exception as e:
                self.session.rollback()
                return e, None
