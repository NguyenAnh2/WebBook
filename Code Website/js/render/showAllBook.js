fetch("http://127.0.0.1:8000/books")
    .then(res => {
         return res.json();
    })
    .then(data => {
        var containBook = document.querySelector('.iq-card-body .row')

        var innerBook = ''
        for(var i = 0; i < data.length; i++) { 
            innerBook += `
            <div class="col-sm-6 col-md-4 col-lg-3" id="${data[i].idsach}">
                <div class="iq-card iq-card-block iq-card-stretch iq-card-height search-bookcontent">
                    <div class="iq-card-body p-0">
                        <div class="d-flex align-items-center">
                            <div class="col-6 p-0 position-relative image-overlap-shadow">
                                <a href="javascript:void();"><img class="img-fluid rounded w-100" src="${data[i].hinhanh}" alt=""></a>
                                <div class="view-book">
                                <button type="button" class="btn btn-sm btn-white" onclick="moveToPageBook(${data[i].idsach})">Xem Ngay</button>
                                </div>
                            </div>
                            <div class="col-6">
                                <div class="mb-2">
                                <h6 class="mb-1">${data[i].tensach}</h6>
                                <p class="font-size-13 line-height mb-1">${data[i].tacgia}</p>
                                <div class="d-block">
                                    <span class="font-size-13 text-warning">
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                        <i class="fa fa-star"></i>
                                    </span>
                                </div>
                                </div>
                                <div class="price d-flex align-items-center">
                                <h6><b>${data[i].giamoi}</b></h6>
                                </div>
                                <div class="iq-product-action">
                                <a href="javascript:void();" onclick="addToCart(this)"><i class="ri-shopping-cart-2-fill text-primary"></i></a>
                                <a href="javascript:void();" class="ml-2"><i class="ri-heart-fill text-danger"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `
        }
        containBook.innerHTML = innerBook
    })

    
fetch("http://127.0.0.1:8000/accounts")
.then(res => {
        return res.json();
})
.then(data => {
    var infoAccount = document.querySelector('#infoAccount');
    var userId = +localStorage.getItem('userId');        
    for(var i = 0; i < data.length; i++) {
        if(data[i].idtaikhoan === userId) {
            infoAccount.innerHTML = `
                <img src="${data[i].hinhanh}" class="img-fluid rounded-circle mr-3" alt="user">
                <div class="caption">
                <h6 class="mb-1 line-height">${data[i].tentaikhoan} </h6>
                <p class="mb-0 text-primary">Tài Khoản</p>
                </div>
            `

        }
    }
})