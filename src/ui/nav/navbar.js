const navTopBarInjection = `
    <header class="site-header">
        <nav class="main-nav">
            <button class="hamburger-menu" id="menuToggle" aria-label="Open Menu">
                ☰
            </button>

            <a href="index.html" class="logo-link">
                <img src="src/img/mobileLogo.svg" alt="Company Brand Logo" width="100"></img>    
            </a>

            <div class="nav-actions">
                <a href="tel:${SiteConfig.phoneLink}" class="btn-quote" aria-label="Call Now">
                    <span class="btn-text">Call Now</span>
                    <svg class="btn-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                        <path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/>
                    </svg>
                </a>            
            </div>
        </nav>

        <ul class="nav-links" id="mobileNavLinks">
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Request a Quote</a></li>
        </ul>
    </header>
`;

function loadNavTopbar() {
    let navBox = document.getElementById("topbar-container");
    if (navBox !== null) {
        navBox.innerHTML = navTopBarInjection;

        // Active link logic
        let currentPage = window.location.pathname.split("/").pop();
        if (currentPage === "") currentPage = "index.html";

        let navLinks = document.querySelectorAll('.topbar-link-item');
        navLinks.forEach(function (link) {
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active');
            }
        });

        // --- NEW: Hamburger Menu Logic ---
        const menuToggle = document.getElementById('menuToggle');
        const mobileNavLinks = document.getElementById('mobileNavLinks');

        if (menuToggle && mobileNavLinks) {
            menuToggle.addEventListener('click', () => {
                // This toggles the class that shows/hides the menu in CSS
                mobileNavLinks.classList.toggle('show-menu');
            });
        }
    }
}

window.addEventListener('DOMContentLoaded', loadNavTopbar);