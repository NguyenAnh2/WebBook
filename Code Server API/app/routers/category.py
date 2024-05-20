from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/categories",
    tags=['Categories']
)


# API Category
@router.get("/", response_model=List[schemas.CategoryOut])
def get_categories(db: Session = Depends(get_db)):
    categories = db.query(models.Category).all()
    return categories


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_category(category: schemas.Category, db: Session = Depends(get_db)):
    new_category = models.Category(**category.dict())
    db.add(new_category)
    db.commit()
    db.refresh(new_category)

    return new_category


@router.get("/{id}")
def get_category(id: int, db: Session = Depends(get_db)):
    category = db.query(models.Category).filter(models.Category.iddanhmuc == id).first()

    if not category:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id: {id} was not found")
    return category


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_category(id: int, db: Session = Depends(get_db)):
    category_query = db.query(models.Category).filter(models.Category.iddanhmuc == id)
    del_category = category_query.first()

    if del_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id: {id} does not exist")

    category_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_category(id: int, category: schemas.Category, db: Session = Depends(get_db)):
    category_query = db.query(models.Category).filter(models.Category.iddanhmuc == id)
    updated_category = category_query.first()

    if updated_category is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Category with id: {id} does not exist")

    category_query.update(category.dict(), synchronize_session=False)
    db.commit()

    return category_query.first()



















# @router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
# def delete_category(id: int, db: Session = Depends(get_db), current_user: int =
# Depends(oauth2.get_current_user)):
#     category_query = db.query(models.Category).filter(models.Category.iddanhmuc == id)
#     del_category = category_query.first()
#
#     if del_category is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with id: {id} does not exist")
#
#     if del_category.idtaikhoan != current_user.idtaikhoan:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action!")
#
#     category_query.delete(synchronize_session=False)
#     db.commit()
#
#     return Response(status_code=status.HTTP_204_NO_CONTENT)
#
#
# @router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
# def update_category(id: int, category: schemas.Category, db: Session = Depends(get_db), current_user: int =
# Depends(oauth2.get_current_user)):
#     category_query = db.query(models.Category).filter(models.Category.iddanhmuc == id)
#     updated_category = category_query.first()
#
#     if updated_category is None:
#         raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Book with id: {id} does not exist")
#
#     if updated_category.idtaikhoan != current_user.idtaikhoan:
#         raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to perform requested action!")
#
#     category_query.update(category.dict(), synchronize_session=False)
#     db.commit()
#
#     return category_query.first()