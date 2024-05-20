fetch("http://127.0.0.1:8000/authors")
    .then(res => {
         return res.json();
    })
    .then(data => { 
        var tbodyContainer = document.querySelector('#tbody-container')
        var innerAuthor = ''
        console.log(data);
        for(var i = 0; i < data.length; i++) { 
            innerAuthor += `
            <tr id=${data[i].idtacgia}>
                <td>${i + 1}</td>
                <td>
                    <img src="${data[i].hinhanh}" class="img-fluid avatar-50 rounded" alt="author-profile">
                </td>
                <td>${data[i].tentacgia}</td>
                <td>
                    <p class="mb-0">${data[i].mota}</p>
                </td>
                <td>
                    <div class="d-flex align-items-center list-user-action">
                        <div style="margin-right: 8px; cursor: pointer;" onclick="editAuthor(this)">Sửa</div>
                        <div style="cursor: pointer;" onclick="removeAuthor(this)">Xóa</div>
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