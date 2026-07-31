console.log("Tracking JS Loaded");

function trackOrder() {

    console.log("Button Clicked");

    let orderId = document.getElementById("orderId").value.trim();

    let result = document.getElementById("result");

    if (orderId === "") {

        result.innerHTML = "<p>Please enter Order ID.</p>";

        return;

    }

    result.innerHTML = `
        <div class="track-card">

            <h3>Order ID: ${orderId}</h3>

            <p>✅ Order Placed</p>

            <p>✅ Packed</p>

            <p>✅ Shipped</p>

            <p>🚚 Out For Delivery</p>

            <h4>Estimated Delivery: Tomorrow</h4>

        </div>
    `;

}