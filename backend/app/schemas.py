from pydantic import BaseModel, EmailStr
from datetime import datetime, time, date
from typing import Optional

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
    #created_at : datetime

    #to make sure it converts to dict() - see doc
    class Config:
        from_attributes = True