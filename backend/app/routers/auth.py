from fastapi import APIRouter, Depends, status, HTTPException, Response
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from ..database import get_db
from .. import schemas, models, utils, oauth2

router = APIRouter(
    tags=['Authentification']
)

@router.post("/login")
def login(user_credentials : OAuth2PasswordRequestForm = Depends(), db:Session=Depends(get_db)):

    #OAuth form return username and password (not email)
    user = db.query(models.User).filter(models.User.email == user_credentials.username).first() #reference username here and not email
    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")
    
    if not utils.verify(user_credentials.password, user.password):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail= f"Invalid Credentials")
    
    #create token
    access_token = oauth2.create_access_token(data = {"user_id" : user.id})
    return {"token" : access_token, "token_type" : "bearer", "id" : user.id}