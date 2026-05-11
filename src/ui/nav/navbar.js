const navTopBarInjection = `
    <header class="site-header">
        <nav class="main-nav">
            <a href="../../pages/index/index.html">
                <img src="../../src/img/mobileLogo.svg" alt="Company Brand Logo" width="100"></img>    
            </a>

            <div class="nav-actions">
                <a href="tel:+15551234567" class="btn-quote">Call Now</a>            
                <button class="hamburger-menu" id="menuToggle" aria-label="Open Menu">
                    ☰
                </button>
            </div>
        </nav>

        <ul class="nav-links" id="mobileNavLinks">
            <li><a href="">Services</a></li>
            <li><a href="#before-after">Our Work</a></li>
            <li><a href="../../pages/about/about.html">About</a></li>
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