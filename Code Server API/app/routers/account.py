from fastapi import Response, status, HTTPException, Depends, APIRouter
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .. import models, schemas
from ..database import engine, get_db


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
models.Base.metadata.create_all(bind=engine)

router = APIRouter(
    prefix="/accounts",
    tags=['Account']
)


# API Account
@router.get("/")
def get_accounts(db: Session = Depends(get_db)):
    accounts = db.query(models.Account).all()
    return accounts


@router.post("/", status_code=status.HTTP_201_CREATED, response_model=schemas.AccountOut)
def create_account(account: schemas.Account, db: Session = Depends(get_db)):
    # hash pass
    # hash_password = pwd_context.hash(account.matkhau)
    # account.matkhau = hash_password

    new_account = models.Account(**account.dict())
    db.add(new_account)
    db.commit()
    db.refresh(new_account)

    return new_account


@router.get("/{id}", response_model=schemas.AccountOut)
def get_account(id: int, db: Session = Depends(get_db)):
    account = db.query(models.Account).filter(models.Account.idtaikhoan == id).first()

    if not account:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Account with id: {id} was not found")
    return account

    return


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_account(id: int, db: Session = Depends(get_db)):
    account_query = db.query(models.Account).filter(models.Account.idtaikhoan == id)
    deleted_account = account_query.first()

    if deleted_account is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Account with id: {id} does not exist")

    account_query.delete(synchronize_session=False)
    db.commit()

    return Response(status_code=status.HTTP_204_NO_CONTENT)


@router.put("/{id}", status_code=status.HTTP_202_ACCEPTED)
def update_account(id: int, taikhoan: schemas.Account, db: Session = Depends(get_db)):
    account_query = db.query(models.Account).filter(models.Account.idtaikhoan == id)
    updated_account = account_query.first()

    if updated_account is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"Account with id: {id} does not exist")

    account_query.update(taikhoan.dict(), synchronize_session=False)
    db.commit()

    return account_query.first()
