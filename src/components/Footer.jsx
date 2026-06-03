export default function Footer() {
  return (
    <section className="footerSection">
      <div className="footerWrapper">
        <div className="footerContainer">
          <div className="footerContent">

            {/* Logo Section */}
            <div className="footerColumn logoColumn">
              <div className="footerLogo">
                <div className="logoIcon">
                  <span>CCIE</span>
                  <div className="logoSubtext">
                    RACK<br />RENTAL
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footerColumn">
              <h3 className="footerHeading">Quick Link</h3>
              <ul className="footerLinks">
                <li><a href="/">Home</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact Us</a></li>
                <li><a href="/terms">Terms & Conditions</a></li>
                <li><a href="/privacy">Privacy Policy</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footerColumn">
              <h3 className="footerHeading">Contact Us</h3>
              <div className="contactInfo">
                <div className="contactItem">
                  <span>support@ccierack.rentals</span>
                </div>
                <div className="contactItem">
                  <span>+1 951-376-4336</span>
                </div>
              </div>
              <h4 className="connectHeading">Connect with us</h4>
              
                <a href="https://wa.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsappBtn"
              >
                Whatsapp group
              </a>
            </div>

          </div>

          {/* Bottom */}
          <div className="footerBottom">
            <div className="container">
              <small>© {new Date().getFullYear()} CCIE Rack Rentals</small>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}