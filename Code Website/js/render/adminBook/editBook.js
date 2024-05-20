function editBook(e) {
    var editContainer = document.querySelector('#editContainer')
    editContainer.setAttribute("style", "display: flex; flex-direction: column; flex: 100%;")
    var contentUpdate = {}
    var id = e.parentElement.parentElement.parentElement.id;

    var tenSachEdit = document.querySelector('#tenSachEdit');
    tenSachEdit.focus()
    var tacGiaEdit = document.querySelector('#tacGiaEdit');
    var giaEdit = document.querySelector('#giaEdit');
    var soLuongEdit = document.querySelector('#soLuongEdit');
    var gioiThieuEdit = document.querySelector('#gioiThieuEdit');
    var nhaXuatBanEdit = document.querySelector('#nhaXuatBanEdit');
    var namPhatHanhEdit = document.querySelector('#namPhatHanhEdit');
    var hinhAnhEdit = document.querySelector('#hinhAnhEdit');
    var danhMucEdit = document.querySelector('#danhMucEdit');

    var btnSuaSach = document.querySelector('#btnSuaSach')
    fetch('http://127.0.0.1:8000/books/')
        .then(res => {
            return res.json();
       })
       .then(data => {
            for(var i = 0; i < data.length; i++) {
                if(data[i].idsach === +id) {
                    tenSachEdit.value = data[i].tensach;
                    tacGiaEdit.value = data[i].tacgia;
                    giaEdit.value = data[i].giamoi;
                    soLuongEdit.value = data[i].conlai;
                    gioiThieuEdit.value = data[i].gioithieu;
                    nhaXuatBanEdit.value = data[i].nhaxuatban;
                    namPhatHanhEdit.value = data[i].ngayphathanh;
                    hinhAnhEdit.value = data[i].hinhanh;
                    if(data[i].iddanhmuc == 1 || data[i].iddanhmuc == 2 || data[i].iddanhmuc == 3 || data[i].iddanhmuc == 4 ) {
                        danhMucEdit.value = 1
                    } else if (data[i].iddanhmuc == 5 || data[i].iddanhmuc == 6 || data[i].iddanhmuc == 7) {
                        danhMucEdit.value = 7
                    } else if (data[i].iddanhmuc == 8 || data[i].iddanhmuc == 9) {
                        danhMucEdit.value = 8
                    }


                    contentUpdate.idsach = data[i].idsach;
                    contentUpdate.tensach = data[i].tensach;
                    contentUpdate.tacgia = data[i].tacgia;
                    contentUpdate.giacu = +data[i].giacu;
                    contentUpdate.giamoi = +data[i].giamoi;
                    contentUpdate.conlai = +data[i].conlai;
                    contentUpdate.gioithieu = data[i].gioithieu;
                    contentUpdate.nhaxuatban = data[i].nhaxuatban;
                    contentUpdate.ngayphathanh = +data[i].ngayphathanh;
                    contentUpdate.hinhanh = data[i].hinhanh;
                    contentUpdate.iddanhmuc = data[i].iddanhmuc;
                }
            }
        })
        

        btnSuaSach.addEventListener('click', function(e) {
        e.preventDefault();
        var flag = showConfirmation();
        contentUpdate.tensach = tenSachEdit.value
        contentUpdate.tacgia = tacGiaEdit.value
        contentUpdate.giacu = +giaEdit.value;
        contentUpdate.giamoi = +giaEdit.value;
        contentUpdate.conlai = +soLuongEdit.value;
        contentUpdate.gioithieu = gioiThieuEdit.value;
        contentUpdate.nhaxuatban = nhaXuatBanEdit.value;
        contentUpdate.ngayphathanh = +namPhatHanhEdit.value;
        contentUpdate.hinhanh = hinhAnhEdit.value;
        contentUpdate.iddanhmuc = danhMucEdit.value;
        if(flag) {
            updateData('http://127.0.0.1:8000/books/' + +id, contentUpdate)
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