function deleteProFromCart(event) {
    let idToDelete = event.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    var flag = showConfirmation()
    if (flag) { 
    var url = 'http://127.0.0.1:8000/carts/' + +idToDelete
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
   .then(res => res.json())
   alert("Xóa sách thành công!")
   location.reload()
    } else {
      alert("Huỷ bỏ")
    }
}


function showConfirmation() {
    const message = "Bạn có chắc chắn muốn xóa sách không?";
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
  