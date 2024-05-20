from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/carts",
    tags=['Carts']
)


# API Carts
@router.get("/", response_model=List[schemas.CartOut])
def get_carts(db: Session = Depends(get_db)):
    carts = db.query(models.Cart).all()
    return carts


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_cart(cart: schemas.Cart, db: Session = Depends(get_db)):
    new_cart = models.Cart(**cart.dict())
    db.add(new_cart)
    db.commit()
    db.refresh(new_cart)

    return new_cart


@router.get("/{id}")
def get_cart(id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.idgiohang == id).first()

    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cart with id: {id} was not found")
    return cart


@router.get("/account/{id}")
def get_cart(id: int, db: Session = Depends(get_db)):
    cart = db.query(models.Cart).filter(models.Cart.idtaikhoan == id).all()

    if not cart:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cart with id: {id} was not found")
    return cart


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_cart(id: int, db: Session = Depends(get_db)):
    cart_query = db.query(models.Cart).filter(models.Cart.idgiohang == id)
    deleted_cart = cart_query.first()

    if deleted_cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cart with id: {id} does not exist")

    cart_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_cart(id: int, cart: schemas.Cart, db: Session = Depends(get_db)):
    cart_query = db.query(models.Cart).filter(models.Cart.idgiohang == id)
    updated_cart = cart_query.first()

    if updated_cart is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Cart with id: {id} does not exist")

    cart_query.update(cart.dict(), synchronize_session=False)
    db.commit()

    return cart_query.first()
