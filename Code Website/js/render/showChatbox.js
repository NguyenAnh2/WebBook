var chatBoxIcon = document.querySelector('#chatbox_icon')
var chatBox = document.querySelector('#chatbox')
var chatBoxClose = document.querySelector('#closeChatBox')
chatBoxIcon.addEventListener("click", function() {
    chatBox.setAttribute('style', 'display: block;');
});
chatBoxClose.addEventListener("click", function() {
    chatBox.setAttribute('style', 'display: none;');
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