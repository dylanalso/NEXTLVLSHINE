// injection script

const footerInjection =
    `<footer class="site-footer">
        <div class="footer-grid">

            <div class="footer-brand">
                <h2>Next LVL Shine</h2>
                <p>
                    A higher standard of clean.
                </p>
                    <br>
                <p>
                    Professional, reliable, and safe chemical power washing.
                </p>
            </div>

            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About Us</a></li>
                    <li><a href="booking.html">Booking</a></li>
                    <li><a href="contact.html">Contact Us</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h3>Contact Us</h3>
                <p>📞 <a href="tel:${SiteConfig.phoneLink}">${SiteConfig.phone}</a></p>
                <p>✉️ <a href="mailto:${SiteConfig.email}">${SiteConfig.email}</a></p>
                <p>📍 Serving ${SiteConfig.areaServed}</p>
            </div>

        </div>

        <div class="footer-bottom">
            <p>&copy; <span id="currentYear">${new Date().getFullYear()}</span> Next LVL Shine. Fully licensed & insured.</p>
        </div>
    </footer>
`;

function loadFooter() {
    let navBox = document.getElementById("footer-container");
    if (navBox !== null) {
        navBox.innerHTML = footerInjection;
    }
}

window.addEventListener('DOMContentLoaded', loadFooter);