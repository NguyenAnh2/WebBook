from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql.sqltypes import TIMESTAMP

from .database import Base


class Book(Base):
    __tablename__ = "book"
    idsach = Column(Integer, primary_key=True, nullable=False)
    tensach = Column(String)
    tacgia = Column(String)
    giacu = Column(Float)
    giamoi = Column(Float)
    conlai = Column(Integer)
    gioithieu = Column(String)
    nhaxuatban = Column(String)
    ngayphathanh = Column(String)
    hinhanh = Column(String)
    iddanhmuc = Column(Integer, ForeignKey("category.iddanhmuc", ondelete="CASCADE"), nullable=False)
    danhmuc = relationship("Category")


class Category(Base):
    __tablename__ = "category"
    iddanhmuc = Column(Integer, primary_key=True, nullable=False)
    tendanhmuc = Column(String, nullable=False)
    theloai = Column(String, nullable=False)
    hinhanh = Column(String, nullable=False)


class Author(Base):
    __tablename__ = "author"
    idtacgia = Column(Integer, primary_key=True, nullable=False)
    tentacgia = Column(String, nullable=False)
    mota = Column(String, nullable=False)
    hinhanh = Column(String, nullable=False)


class Account(Base):
    __tablename__ = "account"
    idtaikhoan = Column(Integer, primary_key=True, nullable=False)
    tentaikhoan = Column(String, nullable=False)
    diachi = Column(String)
    email = Column(String, nullable=False)
    matkhau = Column(String, nullable=False)
    sodienthoai = Column(String)
    hinhanh = Column(String)
    quyentruycap = Column(Integer, nullable=False)


class Cart(Base):
    __tablename__ = "cart"
    idgiohang = Column(Integer, primary_key=True, nullable=False)
    tensach = Column(String, nullable=False)
    gia = Column(Float, nullable=False)
    soluong = Column(Integer, nullable=False)
    hinhanh = Column(String, nullable=False)
    idsach = Column(Integer, ForeignKey("book.idsach", ondelete="CASCADE"), nullable=False)
    idtaikhoan = Column(Integer, ForeignKey("account.idtaikhoan", ondelete="CASCADE"), nullable=False)


class Cart_Account(Base):
    __tablename__ = "cart_account"
    idcart = Column(Integer, primary_key=True, nullable=False)
    idgiohang = Column(Integer, ForeignKey("cart.idgiohang", ondelete="CASCADE"), nullable=False)
    idtaikhoan = Column(Integer, ForeignKey("account.idtaikhoan", ondelete="CASCADE"), nullable=False)


class Order(Base):
    __tablename__ = "orders"
    iddonhang = Column(Integer, primary_key=True, nullable=False)
    tinhtrang = Column(String, nullable=False)
    thoigiandat = Column(String, nullable=False)
    thoigianhoanthanh = Column(String, nullable=False)
    idtaikhoan = Column(Integer, ForeignKey("account.idtaikhoan", ondelete="CASCADE"), nullable=False)


class Detail(Base):
    __tablename__ = 'detail_orders'
    idchitiet = Column(Integer, primary_key=True, nullable=False)
    iddonhang = Column(Integer, ForeignKey("orders.iddonhang", ondelete="CASCADE"), nullable=False)
    idsach = Column(Integer, ForeignKey("book.idsach", ondelete="CASCADE"), nullable=False)
    soluong = Column(Integer, nullable=False)
    dongia = Column(Float, nullable=False)
