fetch("http://127.0.0.1:8000/categories")
    .then(res => {
         return res.json();
    })
    .then(data => { 
        var tbodyContainer = document.querySelector('.tbody-container')
        var innerCat = ''
        for(var i = 0; i < data.length; i++) { 
            innerCat += `
                <tr id=${data[i].iddanhmuc}>
                    <td>${i + 1}</td>
                    <td>${data[i].tendanhmuc}</td>
                    <td>
                        <p class="mb-0">${data[i].theloai}</p>
                    </td>
                    <td>
                        <div class="d-flex align-items-center list-user-action ">
                            <div style="margin-right: 8px; cursor: pointer;" onclick="editCategory(this)">Sửa</div>
                            <div style="cursor: pointer;" onclick="removeCategory(this)">Xóa</div>
                        </div>
                    </td>
                </tr>
                `
            }
            tbodyContainer.innerHTML = innerCat
        })

var infoAccount = document.querySelector('#infoAccount');
var userId = +localStorage.getItem('userId');

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
                    <img src="${data[i].hinhanh}" class="img-fluid rounded-circle mr-3" alt="user" style="display: block; object-fit: cover;">
                    <div class="caption">
                    <h6 class="mb-1 line-height">${data[i].tentaikhoan} </h6>
                    <p class="mb-0 text-primary">Tài Khoản</p>
                    </div>
                `

            }
        }
    })