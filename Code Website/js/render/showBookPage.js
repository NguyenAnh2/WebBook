const bookId = new URLSearchParams(window.location.search).get('id');

fetch('http://127.0.0.1:8000/books/' + +bookId)
    .then(res => res.json())
    .then(data => {
        var descriptionSlider = document.querySelector('#description-slider');
        var containerBookPage = document.querySelector('#containerBookPage');
        var tensach = data.tensach;
        var gia = data.giamoi;
        var hinhanh = data.hinhanh;
        var innerBookPage = `
            <div class="iq-card-transparent iq-card-block iq-card-stretch iq-card-height" id="${bookId}">
                <div class="iq-card-body p-0">
                    <h3 class="mb-3">${data.tensach}</h3>
                    <div class="price d-flex align-items-center font-weight-500 mb-2">
                        <span class="font-size-20 pr-2 old-price">${data.giacu.toLocaleString('vi-VN')} đ</span>
                        <span class="font-size-24 text-dark">${data.giamoi.toLocaleString('vi-VN')} đ</span>
                    </div>
                    <div class="mb-3 d-block">
                        <span class="font-size-20 text-warning">
                        <i class="fa fa-star mr-1"></i>
                        <i class="fa fa-star mr-1"></i>
                        <i class="fa fa-star mr-1"></i>
                        <i class="fa fa-star mr-1"></i>
                        <i class="fa fa-star"></i>
                        </span>
                    </div>
                    <span class="text-dark mb-4 pb-4 iq-border-bottom d-block">${data.gioithieu}</span>
                    <div class="text-primary mb-4">Tác giả: <span class="text-body">${data.tacgia}</span></div>
                    <div class="mb-4 d-flex align-items-center">                                       
                        <button type="button" onclick="addFromBookPage(${bookId}, '${tensach}', ${gia}, '${hinhanh}')" class="btn btn-primary view-more mr-2">Thêm vào giỏ hàng</button>
                    </div>
                    <div class="iq-social d-flex align-items-center">
                        <h5 class="mr-2">Chia sẻ:</h5>
                        <ul class="list-inline d-flex p-0 mb-0 align-items-center">
                            <li>
                            <a href="#" class="avatar-40 rounded-circle bg-primary mr-2 facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            </li>
                            <li>
                            <a href="#" class="avatar-40 rounded-circle bg-primary mr-2 twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            </li>
                            <li>
                            <a href="#" class="avatar-40 rounded-circle bg-primary mr-2 youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                            </li>
                            <li >
                            <a href="#" class="avatar-40 rounded-circle bg-primary pinterest"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
        containerBookPage.innerHTML = innerBookPage;
        descriptionSlider.innerHTML = `
            <li>
                <a href="javascript:void(0);">
                <img src="${data.hinhanh}" class="img-fluid rounded" alt="" style="width:100%; display:block;">
                </a>
            </li>
        `;
    })
    
