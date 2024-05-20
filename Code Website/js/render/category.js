
fetch("http://127.0.0.1:8000/categories")
    .then(res => {
         return res.json();
    })
    .then(data => { 
        var containCat = document.querySelector('.iq-card-body ul')
        var innerCat = ''
        for(var i = 0; i < data.length; i++) { 
            innerCat += `
            <li class="col-sm-6 d-flex mb-3 align-items-center">
                <div class="icon iq-icon-box mr-3">
                <a href="javascript:void();"><img class="img-fluid avatar-60 rounded-circle" src="${data[i].hinhanh}" alt=""></a>
                </div>
                <div class="mt-1">
                <h6>${data[i].theloai}</h6>
                <p class="mb-0 text-primary">Publish Books: <span class="text-body">${Math.floor(Math.random() * 200)}</span></p>
                </div>
            </li>
            `
        }
        containCat.innerHTML = innerCat
    })