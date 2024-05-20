var tenDanhMuc = document.getElementById('tenDanhMuc')
var theLoai = document.getElementById('theLoai')
var hinhAnh = document.getElementById('hinhAnh')
var btnThemDanhMuc = document.getElementById('btnThemDanhMuc')

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

btnThemDanhMuc.addEventListener('click', function(event) {
  var dataPost = {}
  dataPost.tendanhmuc = tenDanhMuc.value
  dataPost.theloai = theLoai.value
  dataPost.hinhanh = hinhAnh.value

  postData('http://127.0.0.1:8000/categories/', dataPost)
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