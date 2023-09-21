from .. import models, schemas, oauth2
from sqlalchemy.orm import Session
from ..database import get_db
from typing import List
from fastapi import FastAPI, Response, status, HTTPException, Depends, APIRouter

router = APIRouter(
#    prefix="/votes",
#    tags=['Votes']
)


@router.get("/votes", response_model=List[schemas.Vote])
def get_votes(db : Session = Depends(get_db)):
    votes = db.query(models.Votes).all() 
    return votes
    #return {"data" : posts}

@router.post("/create_vote", status_code=status.HTTP_201_CREATED, response_model=schemas.Vote)
def create_vote(vote : schemas.CreateVote, db : Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

    new_vote = models.Votes(owner_id = current_user.id, **vote.model_dump())
    db.add(new_vote)
    db.commit()
    db.refresh(new_vote)
    return new_vote

@router.put("/update_vote/{id}",status_code=status.HTTP_200_OK, response_model=schemas.Vote)
def update_vote(id:int, updated_vote : schemas.CreateVote, db : Session = Depends(get_db), current_user: int = Depends(oauth2.get_current_user)):

    vote_query = db.query(models.Votes).filter(models.Votes.id == id)
    vote = vote_query.first()

    if vote == None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail= f"vote {id} not found")
    
    if vote.owner_id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Not authorized")
    
    vote_query.update(updated_vote.model_dump(), synchronize_session=False)
    db.commit()

    return vote_query.first()