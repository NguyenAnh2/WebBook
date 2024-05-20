Promise.all([getOrders(), getCustomers(), getDetails()])
    .then(([dataOrder, accounts, details]) => {
        const accountMap = new Map();
        accounts.forEach(account => {
            accountMap.set(account.idtaikhoan, account.tentaikhoan); 
        });

        const detailsMap = new Map();
        details.forEach(detail => {
            const { iddonhang, tong_giatri } = detail; 
            detailsMap.set(iddonhang, tong_giatri);
        });

        var innerOrder = '';
        var ordersRender = document.querySelector('#ordersRender');
        for (let i = 0; i < dataOrder.length; i++) {
            const accountId = dataOrder[i].idtaikhoan;
            const accountName = accountMap.get(accountId) || 'Unknown'; 

            const orderId = dataOrder[i].iddonhang;
            const totalAmount = detailsMap.get(orderId) || 'N/A';

            innerOrder += `
            <tr>
                <td>${i + 1}</td>
                <td>${dataOrder[i].iddonhang}</td>
                <td class="nameCustomer">${accountName}</td>
                <td>${dataOrder[i].thoigiandat}</td>
                <td>${dataOrder[i].thoigianhoanthanh}</td>
                <td id="sumPay">${totalAmount.toLocaleString('vi-VN')}</td>
                <td><div class="badge badge-pill">${dataOrder[i].tinhtrang}</div></td>
                <td><button type="button" class="btn btn-primary" onclick="chiTietDonHang(${dataOrder[i].iddonhang})">Xem</button></td>
            </tr>`;
        }
        ordersRender.innerHTML = innerOrder;
    })
    .catch(error => console.error('Error fetching data:', error));



async function getOrders() {
    const response = await fetch('http://127.0.0.1:8000/orders');
    return response.json();
}

async function getCustomers() {
    const response = await fetch('http://127.0.0.1:8000/accounts');
    return response.json();
}


async function getDetails() {
    const response = await fetch('http://127.0.0.1:8000/details/summary');
    return response.json();
}

async function getChiTietDetails() {
    const response = await fetch('http://127.0.0.1:8000/details');
    return response.json();
}

async function getBooks() {
    const response = await fetch('http://127.0.0.1:8000/books');
    return response.json();
}

function getTenSach(idsach, booksData) {
    for(let i = 0; i < booksData.length; i++) {
        if(+booksData[i].idsach === +idsach) {
            return booksData[i].tensach;
        }
    }
}

function chiTietDonHang(id) {
    var headDetails = document.querySelector('#headDetails');
    headDetails.innerHTML = `
            <tr>
                <th width="15%">Mã hóa đơn</th>
                <th width="40%">Tên sách</th>
                <th width="15%">Số lượng</th>
                <th width="20%">Đơn giá</th>
            </tr>
                `
    getBooks()
        .then(dataBook => {
            var bookData = []
            for(let i = 0; i < dataBook.length; i++) {
                bookData.push(dataBook[i])
            }
        getChiTietDetails()
            .then(data => {
                console.log(getTenSach(+157, bookData));
                var ordersRender = document.querySelector('#ordersRender');
                var innerOrder = '';
                for(let i = 0; i < data.length; i++) {
                    if(+data[i].iddonhang === +id) {
                        var tenSach = getTenSach(+data[i].idsach, bookData);
                        innerOrder += `
                        <tr>
                            <td>${data[i].iddonhang}</td>
                            <td>${tenSach}</td>
                            <td>${data[i].soluong}</td>
                            <td>${data[i].dongia.toLocaleString('vi-VN')}</td>
                        </tr>
                        `
                    }
                }
                ordersRender.innerHTML = innerOrder;
            })
        })
    }
    
