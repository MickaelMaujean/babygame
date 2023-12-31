from .. import models, schemas, utils
from sqlalchemy.orm import Session
from ..database import get_db
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter 

# create a router to access app = fastAPI() from main.py
router = APIRouter(
    tags=['Users']
)


@router.post("/users", status_code=status.HTTP_201_CREATED, response_model=schemas.UserOut)
def create_user(user : schemas.UserCreate, db : Session = Depends(get_db)):

    hashed_password = utils.hash(user.password)
    user.password = hashed_password
    
    new_user = models.User(**user.model_dump()) # nice function to avoid writiting all in case they are 50 lines
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.get("/users/{id}", response_model=schemas.UserOut)
def get_user(id : int, db : Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, 
                            detail=f"user with id:{id} was not found")
    
    return user