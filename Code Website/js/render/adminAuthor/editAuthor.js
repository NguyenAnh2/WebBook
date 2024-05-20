function editAuthor(e) {
    var editContainer = document.querySelector('#editContainer')
    editContainer.setAttribute("style", "display: flex; flex-direction: column; flex: 100%;")
    var contentUpdate = {}
    var id = e.parentElement.parentElement.parentElement.id;

    var tenTacGiaInput = document.querySelector('#tenTacGiaInput');
    tenTacGiaInput.focus()
    var moTaInput = document.querySelector('#moTaInput');
    var hinhAnhInput = document.querySelector('#hinhAnhInput');

    var btnSuaTacGia = document.querySelector('#btnSuaTacGia')
    fetch('http://127.0.0.1:8000/authors/')
        .then(res => {
            return res.json();
       })
       .then(data => {
            for(var i = 0; i < data.length; i++) {
                if(data[i].idtacgia === +id) {
                  tenTacGiaInput.value = data[i].tentacgia;
                  moTaInput.value = data[i].mota;
                  hinhAnhInput.value = data[i].hinhanh;
                    
                    contentUpdate.idtacgia = data[i].idtacgia;
                    contentUpdate.tentacgia = data[i].tentacgia;
                    contentUpdate.mota = data[i].mota;
                    contentUpdate.hinhanh = data[i].hinhanh;
                }
            }
        })
        

        btnSuaTacGia.addEventListener('click', function(e) {
        e.preventDefault();
        var flag = showConfirmation();
        contentUpdate.tentacgia = tenTacGiaInput.value
        contentUpdate.mota = moTaInput.value
        contentUpdate.hinhanh = hinhAnhInput.value;

        if(flag) {
            updateData('http://127.0.0.1:8000/authors/' + +id, contentUpdate)
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