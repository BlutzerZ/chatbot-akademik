from fastapi import Request
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from exceptions.custom_exceptions import CustomHTTPException


async def custom_http_exception_handler(request: Request, exc: CustomHTTPException):
    return JSONResponse(
        status_code=exc.status,
        content={
            "type": exc.type_,
            "title": exc.title,
            "status": exc.status,
            "detail": exc.detail,
            "validation_problems": exc.validation_problems,
        },
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    validation_errors = [
        f"{error['loc'][-1]}: {error['msg']}" for error in exc.errors()
    ]
    return JSONResponse(
        status_code=422,
        content={
            "type": "/validation-error",
            "title": "Validation Error",
            "status": 422,
            "detail": "There was an error validating your request.",
            "validation_problems": validation_errors,
        },
    )
