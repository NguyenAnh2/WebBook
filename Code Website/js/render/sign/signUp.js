function handleSignUp() {
    let nameValue = document.querySelector('#exampleInputName').value;
    let emailValue = document.querySelector('#exampleInputEmail').value;
    let passwordValue = document.querySelector('#exampleInputPassword').value;
    let customCheck1 = document.querySelector('#customCheck1');
    let emailValid = isValidEmail(emailValue);
    
    if(nameValue && passwordValue) {
        if(emailValid && customCheck1.checked) {
            isEmailExist(emailValue)
            .then(emailExists => {
                if (emailExists) {
                    alert('Email đã tồn tại!.');
                } else {
                    var dataPost = {};
                    dataPost.tentaikhoan = nameValue
                    dataPost.email = emailValue
                    dataPost.diachi = ''
                    dataPost.matkhau = passwordValue
                    dataPost.sodienthoai = ''
                    dataPost.hinhanh = 'https://inkythuatso.com/uploads/thumbnails/800/2023/03/9-anh-dai-dien-trang-inkythuatso-03-15-27-03.jpg'
                    dataPost.quyentruycap = 0
                    postData('http://127.0.0.1:8000/accounts/', dataPost)
                        .then(data => {
                            alert("Đăng ký thành công!");
                            window.location.href = 'http://127.0.0.1:5500/sign-in.html'
                        })
                        .catch((error) => {
                            console.error('Error:', error);
                        });         
                }
            });
        } else if(!emailValid) {
            alert('Email không hợp lệ!');
        } else if(!customCheck1.checked) {
            alert('Bạn chưa đồng ý với điều khoản sử dụng!');
        }
    } else {
        alert('Vui lòng điền đầy đủ thông tin!');
    }
}

async function isEmailExist(email) {
    try {
        const response = await fetch('http://127.0.0.1:8000/accounts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const accounts = await response.json();
        for (let i = 0; i < accounts.length; i++) {
            if (accounts[i].email === email) {
                return true; 
            }
        }
        return false; 
    } catch (error) {
        return false; 
    }
}


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return emailRegex.test(email);
  }

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