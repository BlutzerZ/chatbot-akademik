from app.user.model import RoleType


def is_admin(jwtData):
    return jwtData["role"] == RoleType.admin.value


def is_user(jwtData):
    return jwtData["role"] == RoleType.user.value
