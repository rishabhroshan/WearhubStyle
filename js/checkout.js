document.getElementById("checkout-form").addEventListener("submit", function (event) {

    event.preventDefault();

    alert("🎉 Order Placed Successfully!");

    localStorage.removeItem("cart");

    window.location.href = "index.html";

});