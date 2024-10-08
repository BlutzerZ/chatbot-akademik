from fastapi import FastAPI # type: ignore
from config import database
from fastapi.middleware.cors import CORSMiddleware

from api.patologi.routes import router as patologi_router
from api.terminologi.routes import router as terminologi_router
from api.anatomi.routes import router as anatomi_router

database.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(patologi_router)
app.include_router(terminologi_router)
app.include_router(anatomi_router)