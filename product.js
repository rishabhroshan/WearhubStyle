let params = new URLSearchParams(window.location.search);
let id = params.get("id");

fetch("https://dummyjson.com/products/" + id)
    .then(function (response) {
        return response.json();
    })
    .then(function (product) {

        document.getElementById("product-details").innerHTML = `
    
       <img src="${product.thumbnail}" alt="${product.title}">

<div class="product-info">

    <h2>${product.title}</h2>

    <h3>₹ ${product.price}</h3>

    <p>${product.description}</p>

    <p><b>Brand:</b> ${product.brand}</p>

    <p><b>Rating:</b> ⭐ ${product.rating}</p>

    <button>Add to Cart</button>

</div>

    `;
    });