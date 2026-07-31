document.getElementById("contact-form").addEventListener("submit", function(event){

    event.preventDefault();

    alert("✅ Thank You! Your message has been sent.");

    document.getElementById("contact-form").reset();

});