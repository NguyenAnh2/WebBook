from fastapi import Response, APIRouter, Depends, status, HTTPException
from fastapi.security.oauth2 import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from .. import database, schemas, models, oauth2
from passlib.context import CryptContext

router = APIRouter(
    tags=['Authentication']
)

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify(plain_password, hash_password):
    return pwd_context.verify(plain_password, hash_password)


@router.post('/login', response_model=schemas.Token)
def login(user_credentials: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(database.get_db)):
    user = db.query(models.Account).filter(models.Account.email == user_credentials.username).first()

    if not user:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Invalid Credentials")

    if not verify(user_credentials.password, user.matkhau):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=f"Password not match")

    # create a token

    access_token = oauth2.create_token(data={"user_id": user.idtaikhoan})
    return {"access_token": access_token, "token_type": "bearer"}
