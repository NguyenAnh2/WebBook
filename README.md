Server được viết bằng thư viện FastAPI và công cụ hỗ trợ SQLAlchemy. Tải thư mục Server và cài đặt các thư viện cần thiết. Sau đó sử dụng PostgreSQL với config như sau: DATABASE_HOSTNAME 
= localhost, DATABASE_PORT = 5432, DATABASE_PASSWORD = abcd1234, DATABASE_NAME = bookstore, DATABASE_USERNAME = postgres. Sau khi cài đặt thành công chạy lệnh fastapi dev main.py hoặc trỏ
đến thư file main theo đúng địa chỉ. Bấm enter để khởi động server. Đảm bảo rằng cơ sở dữ liệu tại PostgreSQL đang khởi động. Khi có server website phần front-end bắt đầu có dữ liệu để render
và hoạt động theo đúng mong muốn.
