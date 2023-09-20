from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from . import models
from .routers import votes, users
from .database import engine
from .config import settings

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings.frontend_url],  # Replace with your frontend's URL
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

app.include_router(votes.router)
app.include_router(users.router)

@app.get("/")
async def root():
    return {"message":"Hello World"}