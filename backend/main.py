from fastapi import FastAPI
from config import database
from fastapi.middleware.cors import CORSMiddleware

from app.user.routes import router as UserRouter
from app.conversation.routes import router as ConversationRouter
from app.modelAI import model

database.Base.metadata.create_all(bind=database.engine)  
app = FastAPI()

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"], 
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )


app.include_router(UserRouter)
app.include_router(ConversationRouter)