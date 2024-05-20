from fastapi import FastAPI
from passlib.context import CryptContext
from . import models
from .database import engine
from .routers import book, account, category, authors, cart, orders, details, auth
from fastapi.middleware.cors import CORSMiddleware

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
models.Base.metadata.create_all(bind=engine)

app = FastAPI()


origins = ['*']
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(book.router)
app.include_router(account.router)
app.include_router(auth.router)
app.include_router(category.router)
app.include_router(authors.router)
app.include_router(cart.router)
app.include_router(orders.router)
app.include_router(details.router)


@app.get("/")
def root():
    return {"message": "Hello World"}
