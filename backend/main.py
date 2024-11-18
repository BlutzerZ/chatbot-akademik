from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from config import database
from fastapi.middleware.cors import CORSMiddleware

from app.user.routes import router as UserRouter
from app.conversation.routes import router as ConversationRouter
from app.modelAI.routes import router as ModelRouter
from app.feedback.routes import router as FeedbackRouter
from exceptions.handlers import (
    custom_http_exception_handler,
    validation_exception_handler,
)
from exceptions.custom_exceptions import CustomHTTPException
from exceptions.schemas.custom_error_schema import CustomErrorSchema


database.Base.metadata.create_all(bind=database.engine)
app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# APP
app.include_router(UserRouter)
app.include_router(ConversationRouter)
app.include_router(ModelRouter)
app.include_router(FeedbackRouter)


# Exceptions
app.add_exception_handler(CustomHTTPException, custom_http_exception_handler)
app.add_exception_handler(RequestValidationError, validation_exception_handler)
# Override documentaion for error handling
original_openapi = app.openapi


def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = original_openapi()
    validation_error_response = {
        "description": "Validation Error",
        "content": {"application/json": {"schema": CustomErrorSchema.schema()}},
    }
    custom_responses = {
        "404": {
            "description": "Not Found",
            "content": {"application/json": {"schema": CustomErrorSchema.schema()}},
        },
        "500": {
            "description": "Internal Server Error",
            "content": {"application/json": {"schema": CustomErrorSchema.schema()}},
        },
    }
    for path in openapi_schema["paths"].values():
        for method in path.values():
            responses = method.get("responses")
            responses.update(custom_responses)
            if responses and "422" in responses:
                responses["422"] = validation_error_response
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app.openapi = custom_openapi
