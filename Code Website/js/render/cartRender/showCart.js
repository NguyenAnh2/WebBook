fetch("http://127.0.0.1:8000/carts")
    .then(res => {
         return res.json();
    })
    .then(dataCart => { 
        var tbodyContainer = document.querySelector('#cartContainer');
        var infoCartPayment = document.querySelector('#infoCartPayment');
        var cartPaymentFinally = document.querySelector('#cartPaymentFinally');
        var innerCart = ''
        var innerPayment = ''
        var tongTien = 0;
        var data = []
        var userId = localStorage.getItem('userId');
        for(let i = 0; i < dataCart.length; i++) {
            if(dataCart[i].idtaikhoan === +userId) {
                data.push(dataCart[i]);
            }
        }
            
        if(data.length === 0) {
            innerCart = `
                <tr>
                    <td colspan="6" class="text-center">
                        <h3>Chưa có sản phẩm nào trong giỏ hàng</h3>
                    </td>
                </tr>
            `
            tbodyContainer.innerHTML = innerCart;
        }
        for(var i = 0; i < data.length; i++) {
            innerCart += `
                <li class="checkout-product" id="${data[i].idgiohang}">
                    <div class="row align-items-center">
                        <div class="col-sm-2">
                            <span class="checkout-product-img">
                            <a href="javascript:void();"><img class="img-fluid rounded" src="${data[i].hinhanh}" alt=""></a>
                            </span>
                        </div>
                        <div class="col-sm-4">
                            <div class="checkout-product-details">
                            <h5>${data[i].tensach}</h5>
                            <div class="price">
                                <h6 style="color: red;">${data[i].gia.toLocaleString('vi-VN')} đ</h6>
                            </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <div class="row">
                            <div class="col-sm-10">
                                <div class="row align-items-center mt-2">
                                    <div class="col-sm-7 col-md-6">
                                        <button type="button" class="fa fa-minus qty-btn" id="btn-minus" onclick="decresCount(this)"></button>
                                        <input type="text" id="quantity" class="count_${data[i].idgiohang}" name="quantitycount" value="${data[i].soluong}" disabled>
                                        <button type="button" class="fa fa-plus qty-btn" id="btn-plus" onclick="incresCount(this)"></button>
                                    </div>
                                    <div class="col-sm-5 col-md-6">
                                        <span class="product-price">${(data[i].gia * data[i].soluong).toLocaleString('vi-VN')} ₫</span>
                                    </div>
                                </div>
                            </div>
                            <div class="col-sm-2">
                                <a href="javascript:void();" class="text-dark font-size-20" onclick="deleteProFromCart(this)"><i class="ri-delete-bin-7-fill"></i></a>
                            </div>
                            </div>
                        </div>
                    </div>
                </li>
            `
            tongTien += data[i].gia * data[i].soluong;
        }
        tbodyContainer.innerHTML = innerCart
        innerPayment = `
            <div class="iq-card-body">
                <p><b>Chi tiết</b></p>
                <div class="d-flex justify-content-between mb-1">
                    <span>Tổng</span>
                    <span>${tongTien.toLocaleString('vi-VN')} đ</span>
                </div>
                <div class="d-flex justify-content-between">
                    <span>Phí vận chuyển</span>
                    <span class="text-success">${tongTien !== 0 ? 30000 : 0}</span>
                </div>
                <hr>
                <div class="d-flex justify-content-between">
                    <span class="text-dark"><strong>Tổng</strong></span>
                    <span class="text-dark"><strong>${tongTien !== 0 ? (tongTien + 30000).toLocaleString('vi-VN') : 0}</strong></span>
                </div>
            </div>
        `       
        infoCartPayment.innerHTML = innerPayment     
        cartPaymentFinally.innerHTML = `
            <h4 class="mb-2">Chi tiết</h4>
            <div class="d-flex justify-content-between">
                <span>Giá ${data.length} sản phẩm</span>
                <span><strong>${tongTien.toLocaleString('vi-VN')}đ</strong></span>
            </div>
            <div class="d-flex justify-content-between">
                <span>Phí vận chuyển</span>
                <span class="text-success">30.000</span>
            </div>
            <hr>
            <div class="d-flex justify-content-between">
                <span>Số tiền phải trả</span>
                <span><strong>${(tongTien + 30000).toLocaleString('vi-VN')}</strong></span>
            </div>
        `
    })
    


fetch('http://127.0.0.1:8000/accounts')
 .then(res => res.json())
 .then(data => {
    var infoAccount = document.querySelector('#infoAccount123')
    infoAccount.innerHTML = `
    <h4 class="mb-2">${data[2].tentaikhoan}</h4>
    <div class="shipping-address">
        <p class="mb-0">${data[2].diachi}</p>
        <p>${data[2].sodienthoai}</p>
    </div>
    `
 })


 fetch("http://127.0.0.1:8000/accounts")
 .then(res => {
         return res.json();
 })
 .then(data => {
     var infoAccountImg = document.querySelector('#infoAccountImg');
     var userId = +localStorage.getItem('userId');        
     for(var i = 0; i < data.length; i++) {
         if(data[i].idtaikhoan === userId) {
            infoAccountImg.innerHTML = `
                 <img src="${data[i].hinhanh}" class="img-fluid rounded-circle mr-3" alt="user">
                 <div class="caption">
                 <h6 class="mb-1 line-height">${data[i].tentaikhoan} </h6>
                 <p class="mb-0 text-primary">Tài Khoản</p>
                 </div>
             `

         }
     }
 })

function paySuccess() {
    alert("Đặt hàng thành công!");
    window.location.href = "http://127.0.0.1:5500/index.html";
}