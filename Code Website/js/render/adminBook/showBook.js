fetch("http://127.0.0.1:8000/books")
    .then(res => {
         return res.json();
    })
    .then(data => { 
        var tbodyContainer = document.querySelector('#tbody-container')
        var innerAuthor = ''
        for(var i = 0; i < data.length; i++) { 
            innerAuthor += `
                <tr id=${data[i].idsach}>
                    <td>${i + 1}</td>
                    <td><img class="img-fluid rounded" src="${data[i].hinhanh}" alt=""></td>
                    <td>${data[i].tensach}</td>
                    <td>${data[i].tacgia}</td>
                    <td>
                        <p class="mb-0">${data[i].gioithieu}</p>
                    </td>
                    <td>${data[i].giamoi}</td>
                    <td><a href="book-pdf.html"><i class="ri-file-fill text-secondary font-size-18"></i></a></td>                                        
                    <td>
                        <div class="d-flex align-items-center list-user-action">
                            <div style="margin-right: 8px; cursor: pointer;" onclick="editBook(this)">Sửa</div>
                            <div style="cursor: pointer;" onclick="removeBook(this)">Xóa</div>
                        </div>
                    </td>
                </tr>
            `
        }
        tbodyContainer.innerHTML = innerAuthor
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