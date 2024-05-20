var tenSachInput = document.querySelector('#tenSachInput')
var tacGiaInput = document.querySelector('#tacGiaInput')
var giaInput = document.querySelector('#giaInput')
var soLuongInput = document.querySelector('#soLuongInput')
var gioiThieuInput = document.querySelector('#gioiThieuInput')
var nhaXuatBanInput = document.querySelector('#nhaXuatBanInput')
var namPhatHanhInput = document.querySelector('#namPhatHanhInput')
var hinhAnhInput = document.querySelector('#hinhAnhInput')
var danhMucInput = document.querySelector('#danhMucInput')

var btnThemSach = document.getElementById('btnThemSach')

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

btnThemSach.addEventListener('click', function(event) {
  var dataPost = {}
  dataPost.tensach = tenSachInput.value
  dataPost.tacgia = tacGiaInput.value
  dataPost.giacu = giaInput.value + 20000
  dataPost.giamoi = +giaInput.value
  dataPost.conlai = +soLuongInput.value
  dataPost.gioithieu = gioiThieuInput.value
  dataPost.nhaxuatban = nhaXuatBanInput.value
  dataPost.ngayphathanh = +namPhatHanhInput.value
  dataPost.hinhanh = hinhAnhInput.value
  dataPost.iddanhmuc = +danhMucInput.value

  postData('http://127.0.0.1:8000/books/', dataPost)
  .then(data => {
    alert("Thêm thành công!");
  })
  .catch((error) => {
    console.error('Error:', error);
  });
});

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