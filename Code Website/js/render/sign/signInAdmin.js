localStorage.removeItem('userId');

function navigatorIndex() {
    let emailValue = document.querySelector('#exampleInputEmail1').value;
    let passwordValue = document.querySelector('#exampleInputPassword1').value;

    fetch("http://127.0.0.1:8000/accounts")
         .then(res => {
              return res.json();
         })
         .then(data => {
              for(let i = 0; i < data.length; i++) {
                   if(emailValue === data[i].email && passwordValue === data[i].matkhau) {
                        if(data[i].quyentruycap === 1) {
                              localStorage.setItem('userId', data[i].idtaikhoan);
                             window.location.href = "http://127.0.0.1:5500/admin-dashboard.html";
                        } else {
                             alert("Không có quyền truy cập");
                        }
                   }
               }
         })
         .catch((error) => {
              console.error('Server có lỗi ', error);
         });
    }