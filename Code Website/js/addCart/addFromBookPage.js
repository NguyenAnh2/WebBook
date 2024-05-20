function addFromBookPage(id, tensachPost, giaPost, hinhanhPost) {
    getCart()
        .then(data => {
            var dataPost = {};
            var dataUpdate = {};
            var idSachCart = [];
            let idGioHang = [];
            let flagUpdate = false;
            let flagPost = false;
            var userId = localStorage.getItem('userId');
            for(var i = 0; i < data.length; i++) {
                idSachCart.push(+data[i].idsach)
                idGioHang.push(+data[i].idgiohang)
            }
            if(idSachCart.includes(+id)) {
                var indexUpdate = idSachCart.indexOf(+id)
                flagUpdate = true
                dataUpdate.tensach = data[indexUpdate].tensach;
                dataUpdate.gia = data[indexUpdate].gia;
                dataUpdate.hinhanh = data[indexUpdate].hinhanh;
                dataUpdate.soluong = data[indexUpdate].soluong + 1;
                dataUpdate.idsach = data[indexUpdate].idsach;
                dataUpdate.idtaikhoan = data[indexUpdate].idtaikhoan;
            }
            else {
                flagPost = true;
                dataPost = {
                    tensach: tensachPost,
                    gia: giaPost,
                    hinhanh: hinhanhPost,
                    soluong: 1,
                    idsach: id,
                    idtaikhoan: userId
                }
            }
            if(flagUpdate) {
                fetch('http://127.0.0.1:8000/carts/' + data[indexUpdate].idgiohang, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataUpdate)
                });
                alert("Update!")
                window.location.href = 'http://127.0.0.1:5500/Checkout.html';
            }
            if(flagPost) {
                postData('http://127.0.0.1:8000/carts', dataPost)
                .then(dt => {
                    dataPost = {}
                    alert("Thêm thành công!");
                    window.location.href = 'http://127.0.0.1:5500/Checkout.html';
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
            }
    })
}


async function getCart() {
    const response = await fetch('http://127.0.0.1:8000/carts');
    return response.json();
}

async function postData(url = '', data = {}) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    });
    return response.json(); 
    }






