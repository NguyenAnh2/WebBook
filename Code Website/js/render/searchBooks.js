function getValueSearch() {
    let searchInput = document.querySelector('#searchInput')
    var searchValue = searchInput.value;
    var containerSearchBook = document.querySelector('#containerSearchBook');
    var innerSearchBook = '';

    fetch('http://127.0.0.1:8000/books/')
        .then(res => res.json())
        .then(data => {
            if(searchInput) {
                searchValue = searchValue.toLowerCase();
                for(let i = 0; i < data.length; i++) {
                    if(data[i].tensach.toLowerCase().includes(`${searchValue}`)) {
                        innerSearchBook += `
                        <div class="col-sm-6 col-md-4 col-lg-3" id="${data[i].idsach}">
                            <div class="iq-card iq-card-block iq-card-stretch iq-card-height browse-bookcontent">
                                <div class="iq-card-body p-0">
                                    <div class="d-flex align-items-center">
                                        <div class="col-6 p-0 position-relative image-overlap-shadow">
                                        <a href="javascript:void();"><img class="img-fluid rounded w-100" src="${data[i].hinhanh} alt=""></a>
                                            <div class="view-book">
                                            <button type="button" onclick="moveToPageBook(${data[i].idsach})" class="btn btn-sm btn-white" >Xem Ngay</button>
                                            </div>
                                        </div>
                                        <div class="col-6">
                                            <div class="mb-2">
                                            <h6 class="mb-1">${data[i].tensach}</h6>
                                            <p class="font-size-13 line-height mb-1">${data[i].tacgia}</p>
                                            <div class="d-block line-height">
                                                <span class="font-size-11 text-warning">
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
                                            <a href="javascript:void();" onClick="addToCart(this)"><i class="ri-shopping-cart-2-fill text-primary"></i></a>
                                            <a href="javascript:void();" class="ml-2"><i class="ri-heart-fill text-danger"></i></a>
                                            </div>                                      
                                            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                    }
                }
            }
            containerSearchBook.innerHTML = innerSearchBook;
        })
}