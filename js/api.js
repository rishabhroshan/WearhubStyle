console.log("API Connected");

let allProducts = [];

// Fetch Products
fetch("https://dummyjson.com/products")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {

        allProducts = data.products;

        displayProducts(allProducts);

    });

// Display Products
function displayProducts(products) {

    let output = "";

    products.forEach(function (product) {

        const oldPrice = Math.round(product.price * 1.35);

        output += `
        <div class="card product-card">

            <span class="badge-sale">-${product.discountPercentage.toFixed(0)}%</span>

            <span class="wishlist-icon"
                onclick="addToWishlist(${product.id}, '${product.title}', '${product.thumbnail}', ${product.price})">
                <i class="fa-regular fa-heart"></i>
            </span>

            <a href="product.html?id=${product.id}">
                <img src="${product.thumbnail}" alt="${product.title}">
            </a>

            <div class="product-info">

                <h4>
                    <a href="product.html?id=${product.id}">
                        ${product.title}
                    </a>
                </h4>

                <div class="rating">
                    ⭐ ${product.rating}
                </div>

                <p class="price">
                    <del>₹${oldPrice}</del>
                    <span>₹${product.price}</span>
                </p>

                <button onclick="addToCart(${product.id}, '${product.title}', '${product.thumbnail}', ${product.price})">
                    <i class="fa-solid fa-cart-shopping"></i>
                    Add To Cart
                </button>

            </div>

        </div>
        `;

    });

    document.getElementById("products").innerHTML = output;
}

// Add To Cart
function addToCart(id, title, image, price) {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let product = {
        id: id,
        title: title,
        image: image,
        price: price,
        quantity: 1
    };

    let found = false;

    cart.forEach(function (item) {

        if (item.id === id) {
            item.quantity++;
            found = true;
        }

    });

    if (!found) {
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    showToast("✅ " + title + " Added To Cart");

}

// Search
function searchProduct() {
    updateProducts();
}

// Category Filter
function filterCategory() {
    updateProducts();
}

// Sort Products
function sortProducts() {
    updateProducts();
}

// Common Function
function updateProducts() {

    let products = [...allProducts];

    // Search
    let text = document.getElementById("search").value.toLowerCase();

    if (text !== "") {
        products = products.filter(function (product) {
            return product.title.toLowerCase().includes(text);
        });
    }

    // Category
    let category = document.getElementById("category").value;

    if (category !== "all") {
        products = products.filter(function (product) {
            return product.category === category;
        });
    }

    // Sort
    let sort = document.getElementById("sort").value;

    if (sort === "low") {

        products.sort(function (a, b) {
            return a.price - b.price;
        });

    } else if (sort === "high") {

        products.sort(function (a, b) {
            return b.price - a.price;
        });

    }

    displayProducts(products);

}

function addToWishlist(id, title, image, price) {

    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    let found = wishlist.find(function (item) {
        return item.id === id;
    });

    if (found) {
        showToast("❤️ Product Already in Wishlist");
        return;
    }

    wishlist.push({
        id: id,
        title: title,
        image: image,
        price: price
    });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));

    showToast("❤️ Added to Wishlist");
}

function showToast(message) {

    let toast = document.getElementById("toast");

    toast.innerHTML = message;

    toast.classList.add("show");

    setTimeout(function () {

        toast.classList.remove("show");

    }, 2000);

}