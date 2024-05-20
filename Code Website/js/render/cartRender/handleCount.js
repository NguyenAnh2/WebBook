function incresCount(event) {
        var idUpdateCount = event.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
        hanleIncres(idUpdateCount)
}
function decresCount(event) {
    var idUpdateCount = event.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.id;
    hanleDecres(idUpdateCount)
}


function hanleIncres(idUpdateCount) {
    getCart()
        .then(data => {
            var indexUpdateCount;
            for(let i = 0; i < data.length; i++) {
                if(data[i].idgiohang === +idUpdateCount) {
                    let countIncres = +document.querySelector(`.count_${data[i].idgiohang}`).value
                    document.querySelector(`.count_${data[i].idgiohang}`).value =  countIncres + 1;
                    data[i].soluong = countIncres + 1
                    indexUpdateCount = i;
                }
            }

            fetch('http://127.0.0.1:8000/carts/' + +idUpdateCount, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data[indexUpdateCount])
            });
        })
    }


function hanleDecres(idUpdateCount) {
    getCart()
        .then(data => {
            var indexUpdateCount;
            let countIncres;
            for(let i = 0; i < data.length; i++) {
                if(data[i].idgiohang === +idUpdateCount) {
                    countIncres = +document.querySelector(`.count_${data[i].idgiohang}`).value
                    if(countIncres >= 2) {
                        document.querySelector(`.count_${data[i].idgiohang}`).value =  countIncres - 1;
                        data[i].soluong = countIncres - 1
                        indexUpdateCount = i;
                    } else {
                        alert("Không thể cho số lượng bằng 0")
                    }
                    
                }
            }

        fetch('http://127.0.0.1:8000/carts/' + +idUpdateCount, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data[indexUpdateCount])
        })
    })
}


document.querySelector('#updateCount').addEventListener('click', function() {
    location.reload()
})

async function getCart() {
    const response = await fetch('http://127.0.0.1:8000/carts');
    return response.json();
}
