from typing import Optional

from pydantic import BaseModel, EmailStr


class Book(BaseModel):
    tensach: str
    tacgia: str
    giacu: float
    giamoi: float
    conlai: int
    gioithieu: str
    nhaxuatban: str
    ngayphathanh: int
    hinhanh: str
    iddanhmuc: int


class BookRespond(Book):
    idsach: int

    class Config:
        orm_mode = True


class Author(BaseModel):
    tentacgia: str
    mota: str
    hinhanh: str


class AuthorOut(Author):
    idtacgia: int

    class Config:
        orm_mode = True


class Category(BaseModel):
    tendanhmuc: str
    theloai: str
    hinhanh:str


class CategoryOut(Category):
    iddanhmuc: int

    class Config:
        orm_mode = True


class Account(BaseModel):
    tentaikhoan: str
    diachi: str
    email: EmailStr
    matkhau: str
    sodienthoai: str
    hinhanh: str
    quyentruycap: int


class AccountOut(BaseModel):
    idtaikhoan: int
    email: EmailStr
    diachi: str
    hinhanh: str
    sodienthoai: str

    class Config:
        orm_mode = True


class Order(BaseModel):
    tinhtrang: str
    thoigiandat: str
    thoigianhoanthanh: str
    idtaikhoan: int


class Details(BaseModel):
    iddonhang: int
    idsach: int
    soluong: int
    dongia: float


class OrderOut(Order):
    iddonhang: int

    class Config:
        orm_mode = True


class DetailOut(BaseModel):
    iddonhang: int
    tong_soluong: int
    tong_giatri: float

    class Config:
        orm_mode = True


class DetailsOut(Details):
    idchitiet: int

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email: EmailStr
    matkhau: str


class Cart(BaseModel):
    tensach: str
    gia: float
    soluong: int
    hinhanh: str
    idsach: int
    idtaikhoan: int


class CartOut(Cart):
    idgiohang: int

    class Config:
        orm_mode = True


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    id: Optional[int] = None


class SummaryOrders(BaseModel):
    iddonhang: int
    tong_soluong: int
    tong_giatri: float