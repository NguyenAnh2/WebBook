
function showConfirmation() {
  const message = "Bạn có chắc chắn muốn xóa tác giả không?";
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

function removeAuthor(event) {
  var flag = showConfirmation()
  if (flag) { 
  var id = event.parentElement.parentElement.parentElement.id;
  var url = 'http://127.0.0.1:8000/authors/' + +id
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