// injection script

const footerHtml =
`
    <footer class="footer">
        <div class="container footer-content grid-3">
            <div class="footer-col">
                <h4>Next LVL Shine</h4>
                <p>The premium chemical soft washing experts. Delivering safe and lasting results for your home.</p>
            </div>
            <div class="footer-col">
                <h4>Quick Links</h4>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#contact">Contact Us</a></li>
                </ul>
            </div>
            <div class="footer-col">
                <h4>Contact</h4>
                <p>Phone: (xxx) xxx-xxxx</p>
                <p>Email: xxxxx@xxxxx.com</p>
                <p>Address: xxxxx, xx xxxxx</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2026 xxxxx Chemical Soft Washing. All rights reserved.</p>
        </div>
    </footer>
`;

function loadFooter() {
    let navBox = document.getElementById("footer-container");
    if (navBox !== null) {
        // Parse the static HTML string into DOM nodes safely
        const parser = new DOMParser();
        const doc = parser.parseFromString(footerHtml, 'text/html');
        const footerNode = doc.body.firstChild;

        // Safely set the dynamic values using textContent and properties
        const phoneLinkEl = footerNode.querySelector('#footer-phone-link');
        if (phoneLinkEl) {
            phoneLinkEl.href = 'tel:' + SiteConfig.phoneLink;
            phoneLinkEl.textContent = SiteConfig.phone;
        }

        const emailLinkEl = footerNode.querySelector('#footer-email-link');
        if (emailLinkEl) {
            emailLinkEl.href = 'mailto:' + SiteConfig.email;
            emailLinkEl.textContent = SiteConfig.email;
        }

        const areaServedEl = footerNode.querySelector('#footer-area-served');
        if (areaServedEl) {
            areaServedEl.textContent = '📍 Serving ' + SiteConfig.areaServed;
        }

        const currentYearEl = footerNode.querySelector('#currentYear');
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear().toString();
        }

        // Clear existing contents and append the new footer safely
        navBox.replaceChildren();
        navBox.appendChild(footerNode);
    }
}

window.addEventListener('DOMContentLoaded', loadFooter);