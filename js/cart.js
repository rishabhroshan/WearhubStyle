console.log("Cart Page Ready")
let cart = JSON.parse(localStorage.getItem("cart")) || [];

let output = "";
let total = 0;

if (cart.length === 0) {

    output = "<p>Your cart is empty.</p>";

} else {

    cart.forEach(function (item) {
        total += item.price * item.quantity;

        output += `
                <div class="cart-item">
                <img src="${item.image}"alt="${item.title}>
                <div class="cart-info">
                <h3>${item.title}</h3>
                <p>₹ ${item.price}</p>
                <div class="quantity-box">

                    <button onclick="decreaseQty(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQty(${item.id})">+</button>

                </div>
                <button onclick="removeItem(${item.id})">
                Remove
                </button>
                </div>

                </div>

        `;

    });

}

document.getElementById("cart-items").innerHTML = output;
document.getElementById("total-price").innerText = total;

function removeItem(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart = cart.filter(function (item) {
        return item.id !== id;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

function increaseQty(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(function (item) {

        if (item.id === id) {
            item.quantity++;
        }

    });

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}

function decreaseQty(id) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.forEach(function (item) {

        if (item.id === id) {
            item.quantity--;
        }

    });

    cart = cart.filter(function (item) {
        return item.quantity > 0;
    });

    localStorage.setItem("cart", JSON.stringify(cart));

    location.reload();

}