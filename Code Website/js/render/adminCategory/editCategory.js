function editCategory(e) {
    var editContainer = document.querySelector('#editContainer')
    editContainer.setAttribute("style", "display: flex; flex-direction: column; flex: 100%;")
    var contentUpdate = {}
    var id = e.parentElement.parentElement.parentElement.id;
    var tenDanhMucInput = document.querySelector('#tenDanhMucInput');
    tenDanhMucInput.focus()
    var moTaInput = document.querySelector('#moTaInput');
    var btnSuaDanhMuc = document.querySelector('#btnSuaDanhMuc')
    fetch('http://127.0.0.1:8000/categories/')
        .then(res => {
            return res.json();
       })
       .then(data => {
            for(var i = 0; i < data.length; i++) {
                if(data[i].iddanhmuc === +id) {
                    tenDanhMucInput.value = data[i].tendanhmuc;
                    moTaInput.value = data[i].theloai;
                    contentUpdate.iddanhmuc = data[i].iddanhmuc;
                    contentUpdate.tendanhmuc = data[i].tendanhmuc;
                    contentUpdate.theloai = data[i].theloai;
                    contentUpdate.hinhanh = '';
                }
            }
        })
    

    btnSuaDanhMuc.addEventListener('click', function(e) {
        e.preventDefault();
        var flag = showConfirmation();
        contentUpdate.tendanhmuc = tenDanhMucInput.value;
        contentUpdate.theloai = moTaInput.value;
        if(flag) {
            updateData('http://127.0.0.1:8000/categories/' + +id, contentUpdate)
            alert("Sửa thành công!")
            location.reload()
        } else {
            alert("Huỷ bỏ")
        }
    })
}

function showConfirmation() {
    const message = "Bạn có chắc chắn muốn sửa danh mục không?";
    const result = confirm(message);
    var flag = true
    if (result) {
      flag = true
      return flag
    } else {
      flag = false
      return flag
    }
  }

async function updateData(url, data) {

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update data');
      }

      const updatedData = await response.json();
    } catch (error) {
      return
    }
  }