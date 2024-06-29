import '../main.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
export const Footer = () => {

    return (
      <div id="footer" className="footer">
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
      </div>
    )
}

