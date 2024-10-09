from fastapi import FastAPI # type: ignore
from config import database
from fastapi.middleware.cors import CORSMiddleware

# from api.patologi.routes import router as patologi_router

database.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# app.include_router(patologi_router)