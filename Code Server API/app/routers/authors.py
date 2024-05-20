from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/authors",
    tags=['Authors']
)


# API Authors
@router.get("/", response_model=List[schemas.AuthorOut])
def get_books(db: Session = Depends(get_db)):
    books = db.query(models.Author).all()

    return books


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_author(author: schemas.Author, db: Session = Depends(get_db)):
    new_author = models.Author(**author.dict())
    db.add(new_author)
    db.commit()
    db.refresh(new_author)

    return new_author


@router.get("/{id}")
def get_author(id: int, db: Session = Depends(get_db)):
    author_query = db.query(models.Author).filter(models.Author.idtacgia == id).first()

    if not author_query:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Author with id: {id} was not found")
    return author_query


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_author(id: int, db: Session = Depends(get_db)):
    author_query = db.query(models.Author).filter(models.Author.idtacgia == id)
    deleted_author = author_query.first()

    if deleted_author is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Author with id: {id} does not exist")

    author_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_author(id: int, author: schemas.Author, db: Session = Depends(get_db)):
    author_query = db.query(models.Author).filter(models.Author.idtacgia == id)
    updated_author = author_query.first()

    if updated_author is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Author with id: {id} does not exist")

    author_query.update(author.dict(), synchronize_session=False)
    db.commit()

    return author_query.first()
