console.log("Wishlist Ready");

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

let output = "";

if (wishlist.length === 0) {

    output = "<h3>Your Wishlist is Empty ❤️</h3>";

} else {

    wishlist.forEach(function (item) {

        output += `

<div class="card">

    <img src="${item.image}" alt="${item.title}">

    <h3>${item.title}</h3>

    <p>₹ ${item.price}</p>

    <button onclick="addWishlistToCart(${item.id})">
        🛒 Add To Cart
    </button>

    <button onclick="removeWishlist(${item.id})">
        ❤️ Remove
    </button>

</div>

`;


    });

}

document.getElementById("wishlist-items").innerHTML = output;

function removeWishlist(id) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    wishlist = wishlist.filter(function (item) {

        return item.id !== id;

    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    location.reload();

}

function addWishlistToCart(id) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = wishlist.find(function (item) {
        return item.id === id;
    });

    if (!product) {
        return;
    }

    let found = false;

    cart.forEach(function (item) {

        if (item.id === id) {
            item.quantity++;
            found = true;
        }

    });

    if (!found) {

        cart.push({
            id: product.id,
            title: product.title,
            image: product.image,
            price: product.price,
            quantity: 1
        });

    }

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");

}