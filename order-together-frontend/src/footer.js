document.addEventListener("DOMContentLoaded", function() {
    const footer = document.getElementById("footer");
    footer.innerHTML = `
        <div class="social-media">
            <i class="fab fa-facebook"></i>
            <i class="fab fa-twitter"></i>
            <i class="fab fa-instagram"></i>
            <i class="fab fa-youtube"></i>
            <i class="fab fa-linkedin"></i>
        </div>
        <div class="footer-nav">
            <a href="#">Terms</a>
            <a href="#">Privacy</a>
            <a href="#">My Policy</a>
        </div>
    `;
});
