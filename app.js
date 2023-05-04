

var productApi = 'http://64532f93e9ac46cedf1f031d.mockapi.io/api/products/';


function start() {
    getProduct(renderProducts);
    handleCreate();
}

start();

//funtion
function getProduct(callback) {
    fetch(productApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}


function createProduct(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    };
    fetch(productApi, options)
        .then(function (response) {
            response.json();
        })
        .then(callback);
}

function handleDeleteProduct(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
    };
    fetch(productApi + '/' + id, options)
        .then(function (response) {
            response.json();
        })
        .then(function () {
            var productItem = document.querySelector('.product-item-' + id);
            if (productItem) {
                productItem.remove();
            }
        });
}

function handleUpdateProduct(id, callback) {
    var nameC = document.querySelector('.name-' + id).textContent;
    var priceC = document.querySelector('.price-' + id).textContent;
    var statusC = document.querySelector('.status-' + id).textContent;

    console.log(nameC);
    console.log(priceC);
    console.log(statusC);

    var name = document.querySelector('input[name="name"]');
    var price = document.querySelector('input[name="price"]');
    var status = document.querySelector('input[name="status"]');

    name.value = nameC;
    price.value = priceC;
    status.value = statusC;

    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {

        var options = {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({
                name: name.value,
                price: price.value,
                status: status.value
            })
        }
        fetch(productApi + '/' + id, options)
            .then(function (response) {
                response.json();
            })
            .then(callback);
    }

}
function renderProducts(products) {
    var listProducts = document.querySelector('#list-products');
    var str = `<tr>
        <th>Ten</th>
        <th>Gia</th>
        <th>Trang Thai</th>
        <th colspan='2'>Chuc nang</th>
    </tr>`;
    var htmls = products.map(function (product) {
        return str+= `
        <tr class=  " product-item-${product.id}">
            <td><h3 class="name-${product.id}">${product.name}</h3></td>
            <td><p class="price-${product.id}">${product.price}</p></td>
            <td><p class="status-${product.id}">${product.status}</p></td>
            <td><button onclick="handleDeleteProduct(${product.id})">Xoa</button></td>
            <td><button onclick="handleUpdateProduct(${product.id})">Sua</button></td>
        </tr>

        `;
    });

    listProducts.innerHTML = str;
}


function handleCreate() {
    var createBtn = document.querySelector('#create');
    createBtn.onclick = function () {
        var name = document.querySelector('input[name="name"]').value;
        var price = document.querySelector('input[name="price"]').value;
        var status = document.querySelector('input[name="status"]').value;

        // console.log(status);

        var formData = {
            name: name,
            price: price,
            status: status
        };

        createProduct(formData, function () {
            getProduct(renderProducts);
        });
    }
}