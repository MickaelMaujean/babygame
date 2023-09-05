from sqlalchemy import Column, Integer, String, Boolean, Float, Date, Time, DateTime
from sqlalchemy.sql.expression import null, func, text
from sqlalchemy.sql.sqltypes import TIMESTAMP
from .database import Base

class Votes(Base):
    __tablename__ = "votes"

    id = Column(Integer, primary_key=True, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    gender = Column(String, nullable=False)
    size = Column(Float, nullable=False)
    weight = Column(Float, nullable=False)
    birthday = Column(DateTime, nullable=False)
    created_at = Column(TIMESTAMP(timezone=True), nullable=False, server_default=text('now()'))