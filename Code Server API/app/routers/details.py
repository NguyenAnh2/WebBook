from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from .. import models, schemas, oauth2
from ..database import get_db


router = APIRouter(
    prefix="/details",
    tags=['Details']
)


# API Details
@router.get("/", response_model=List[schemas.DetailsOut])
def get_details(db: Session = Depends(get_db)):
    details = db.query(models.Detail).all()
    return details


@router.get("/summary", response_model=List[schemas.DetailOut])
def get_summary(db: Session = Depends(get_db)):
    query = db.query(
        models.Detail.iddonhang,
        func.sum(models.Detail.soluong).label('tong_soluong'),
        func.sum(models.Detail.soluong * models.Detail.dongia).label('tong_giatri')
    ).group_by(models.Detail.iddonhang).all()

    return query


@router.post("/", status_code=status.HTTP_201_CREATED)
def create_detail(detail: schemas.Details, db: Session = Depends(get_db)):
    new_details = models.Detail(**detail.dict())
    db.add(new_details)
    db.commit()
    db.refresh(new_details)

    return new_details


@router.get("/{id}")
def get_detail(id: int, db: Session = Depends(get_db)):
    detail = db.query(models.Detail).filter(models.Detail.idchitiet == id).first()

    if not detail:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Detail with id: {id} was not found")
    return detail


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_detail(id: int, db: Session = Depends(get_db)):
    detail_query = db.query(models.Detail).filter(models.Detail.idchitiet == id)
    deleted_detail = detail_query.first()

    if deleted_detail is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Detail with id: {id} does not exist")

    detail_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_detail(id: int, detail: schemas.Details, db: Session = Depends(get_db)):
    detail_query = db.query(models.Detail).filter(models.Detail.idchitiet == id)
    updated_detail = detail_query.first()

    if updated_detail is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Detail with id: {id} does not exist")

    detail_query.update(detail.dict(), synchronize_session=False)
    db.commit()

    return detail_query.first()
