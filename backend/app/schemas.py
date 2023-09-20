from pydantic import BaseModel, EmailStr
from datetime import datetime, time, date
from typing import Optional

class UserCreate(BaseModel):
    email : EmailStr
    password :str


class UserOut(BaseModel): #Response the user will receive (he does not want to see his password sent back)
    email : EmailStr
    id : int
    created_at : datetime

    class Config:
        from_attributes = True


class UserLogin(BaseModel):
    email : EmailStr
    password : str

class VoteBase(BaseModel):
    first_name : str
    last_name : str
    gender : str
    size : float
    weight : float
    birthday : datetime #"YYYY-MM-DD HH:MM:SS"

class CreateVote(VoteBase):
    pass


# Pydantic model for the response
class Vote(VoteBase):
    id : int
    #owner_id : int
    #owner : UserOut
    #created_at : datetime

    #to make sure it converts to dict() - see doc
    class Config:
        from_attributes = True
