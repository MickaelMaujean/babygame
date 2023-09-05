from typing import Optional, List
from fastapi import FastAPI, Response, status, HTTPException, Depends
from fastapi.params import Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from random import randrange
import psycopg2
from psycopg2.extras import RealDictCursor
import time
from sqlalchemy.orm import Session
from . import models, schemas
from .routers import votes
from .database import engine, get_db
from datetime import datetime

models.Base.metadata.create_all(bind=engine)

app = FastAPI()
# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with your frontend's URL
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


while True:
    try:
        conn = psycopg2.connect(host='localhost', database = 'babygame', user='postgres', 
                            password = 'Tjr280192', cursor_factory=RealDictCursor)
        cursor = conn.cursor()
        print("database connection was successfull !")
        break
    except Exception as error:
        print("Connection failed :", error)
        time.sleep(2)


app.include_router(votes.router)

@app.get("/")
async def root():
    return {"message":"Hello World"}