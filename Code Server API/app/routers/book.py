from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/books",
    tags=['Books']
)


# API Books
@router.get("/", response_model=List[schemas.BookRespond])
def get_books(db: Session = Depends(get_db)):
    books = db.query(models.Book).all()

    return books


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_book(book: schemas.Book, db: Session = Depends(get_db)):
    new_book = models.Book(**book.dict())
    db.add(new_book)
    db.commit()
    db.refresh(new_book)

    return new_book


@router.get("/{id}")
def get_book(id: int, db: Session = Depends(get_db)):
    book = db.query(models.Book).filter(models.Book.idsach == id).first()

    if not book:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with id: {id} was not found")
    return book


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_book(id: int, db: Session = Depends(get_db)):
    book_query = db.query(models.Book).filter(models.Book.idsach == id)
    del_book = book_query.first()

    if del_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with id: {id} does not exist")

    book_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_book(id: int, book: schemas.Book, db: Session = Depends(get_db)):
    book_query = db.query(models.Book).filter(models.Book.idsach == id)
    updated_book = book_query.first()

    if updated_book is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with id: {id} does not exist")

    book_query.update(book.dict(), synchronize_session=False)
    db.commit()

    return book_query.first()
