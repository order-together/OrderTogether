document.addEventListener("DOMContentLoaded", function() {
    const header = document.getElementById("header");
    header.innerHTML = `
        <div class="logo">LOGO</div>
        <nav>
            <a href="#">PRODUCT</a>
            <a href="#">ORDERS</a>
            <a href="#">CREATE</a>
        </nav>
        <div class="right-header">
            <input type="search" placeholder="What are you looking for?">
            <div class="icons">
                <i class="fas fa-shopping-cart"></i>
                <i class="fas fa-user"></i>
            </div>
        </div>
    `;
});
