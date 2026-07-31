// Ye file har page ke navbar mein Cart aur Wishlist ka count
// localStorage se padh kar dikhata hai, taaki jis bhi page pe
// jao, sahi number dikhe.

function updateCounts() {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Cart mein total quantity ginenge (agar ek product 2 baar add
    // kiya hai to wo 2 count hoga, na ki 1)
    let cartCount = 0;

    cart.forEach(function (item) {
        cartCount += item.quantity || 1;
    });

    let cartCountEl = document.getElementById("cart-count");
    let wishlistCountEl = document.getElementById("wishlist-count");

    if (cartCountEl) {
        cartCountEl.textContent = cartCount;
    }

    if (wishlistCountEl) {
        wishlistCountEl.textContent = wishlist.length;
    }

}

// Page load hote hi count update kar do
updateCounts();

// Navbar mein Login/Account link ko update karta hai
function updateAuthUI() {

    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    let accountEl = document.getElementById("account-link");

    if (!accountEl) return;

    if (currentUser) {

        accountEl.innerHTML = '<i class="fa-solid fa-user"></i> ' + currentUser.name.split(" ")[0];
        accountEl.href = "#";

        accountEl.onclick = function (e) {
            e.preventDefault();

            if (confirm("Logout from WearhubStyle?")) {
                localStorage.removeItem("currentUser");
                window.location.href = "index.html";
            }
        };

    } else {

        accountEl.innerHTML = '<i class="fa-regular fa-user"></i> Login';
        accountEl.href = "login.html";
        accountEl.onclick = null;

    }

}

updateAuthUI();

// Mobile hamburger menu toggle
let menuToggle = document.getElementById("menu-toggle");
let navbarNav = document.getElementById("navbar-nav");

if (menuToggle && navbarNav) {

    menuToggle.addEventListener("click", function () {
        navbarNav.classList.toggle("show");
    });

    // Menu ke kisi link pe click karte hi mobile menu band ho jaye
    navbarNav.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
            navbarNav.classList.remove("show");
        });
    });

}


