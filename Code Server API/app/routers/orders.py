from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db

router = APIRouter(
    prefix="/orders",
    tags=['Orders']
)


# API Orders
@router.get("/", response_model=List[schemas.OrderOut])
def get_orders(db: Session = Depends(get_db)):
    orders = db.query(models.Order).all()
    return orders


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_order(order: schemas.Order, db: Session = Depends(get_db)):
    new_order = models.Order(**order.dict())
    db.add(new_order)
    db.commit()
    db.refresh(new_order)

    return new_order


@router.get("/{id}")
def get_order(id: int, db: Session = Depends(get_db)):
    order = db.query(models.Order).filter(models.Order.iddonhang == id).first()

    if not order:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order with id: {id} was not found")
    return order


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_order(id: int, db: Session = Depends(get_db)):
    order_query = db.query(models.Order).filter(models.Order.iddonhang == id)
    deleted_order = order_query.first()

    if deleted_order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order with id: {id} does not exist")

    order_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_order(id: int, order: schemas.Order, db: Session = Depends(get_db)):
    order_query = db.query(models.Order).filter(models.Order.iddonhang == id)
    updated_order = order_query.first()

    if updated_order is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Order with id: {id} does not exist")

    order_query.update(order.dict(), synchronize_session=False)
    db.commit()

    return order_query.first()
