var countCart = document.querySelector('#countCart')
fetch('http://127.0.0.1:8000/carts')
    .then(res => res.json())
    .then(dataCart => {
        let data = []
        for(let i = 0; i < dataCart.length; i++) {
            if(dataCart[i].idtaikhoan === +localStorage.getItem('userId')) {
                data.push(dataCart[i])
            }
        }
        countCart.innerHTML = `<span class="badge badge-danger count-cart rounded-circle">${data.length}</span>`
        //     innerCart += `
        //     <a href="#" class="iq-sub-card" id=${data[i].idsach}>
        //         <div class="media align-items-center">
        //         <div class="">
        //             <img class="rounded" src="${data[i].hinhanh}" alt="">
        //         </div>
        //         <div class="media-body ml-3">
        //             <h6 class="mb-0 ">${data[i].tensach}</h6>
        //             <p class="mb-0">${data[i].gia}</p>
        //         </div>
        //         <div class="float-right font-size-24 text-danger"><i class="ri-close-fill"></i></div>
        //         </div>
        //     </a>
        //     `
        // }
        // cartOutside.innerHTML = innerCart;
    })

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
function addToCart(e) {
    var nameBookAddToCart = e.parentElement.parentElement.querySelector('div').querySelector('h6').innerText;
    var idBookAddToCart = e.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    var priceBookAddToCart = e.parentElement.parentElement.querySelector('.price').querySelector('h6').innerText;
    var imageBookAddToCart = e.parentElement.parentElement.parentElement.querySelector('img').getAttribute('src');
    var userId = localStorage.getItem('userId');
    fetch('http://127.0.0.1:8000/carts/account/' + +userId)
        .then(res => res.json())
        .then(data => {
            var dataPost = {};
            var dataUpdate = {};
            var idSachCart = [];
            let idGioHang = [];
            let flagUpdate = false;
            let flagPost = false;
            for(var i = 0; i < data.length; i++) {
                idSachCart.push(+data[i].idsach)
                idGioHang.push(+data[i].idgiohang)
            }
            if(idSachCart.includes(+idBookAddToCart)) {
                var indexUpdate = idSachCart.indexOf(+idBookAddToCart)
                flagUpdate = true
                dataUpdate.tensach = data[indexUpdate].tensach;
                dataUpdate.gia = data[indexUpdate].gia;
                dataUpdate.hinhanh = data[indexUpdate].hinhanh;
                dataUpdate.soluong = data[indexUpdate].soluong + 1;
                dataUpdate.idsach = data[indexUpdate].idsach;
                dataUpdate.idtaikhoan = userId;
            }
            else {
                flagPost = true;
                dataPost = {
                    tensach: nameBookAddToCart,
                    gia: priceBookAddToCart,
                    hinhanh: imageBookAddToCart,
                    soluong: 1,
                    idsach: idBookAddToCart,
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
            }
            if(flagPost) {
                postData('http://127.0.0.1:8000/carts', dataPost)
                .then(dt => {
                    dataPost = {}
                    alert("Thêm thành công!");
                    location.reload();
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


function navigateCheckout() {
    window.location.href = "http://127.0.0.1:5500/Checkout.html";
}