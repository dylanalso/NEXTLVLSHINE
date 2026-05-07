const navTopBarInjection = `
    <header class="site-header">
        <nav class="main-nav">
            <a href="#home">
                <img src="../../src/img/nxtlvlshine.svg" alt="Company Brand Logo" width="100"></img>    
            </a>

            <div class="nav-actions">
                <a href="tel:+15551234567" class="btn-quote">Call Now</a>            
                <button class="hamburger-menu" id="menuToggle" aria-label="Open Menu">
                    ☰
                </button>
            </div>
        </nav>

        <ul class="nav-links" id="mobileNavLinks">
            <li><a href="#services">Services</a></li>
            <li><a href="#before-after">Our Work</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </header>
    `;

function loadNavTopbar() {
    let navBox = document.getElementById("topbar-container");

    if (navBox !== null) {
        navBox.innerHTML = navTopBarInjection;

        let currentPage = window.location.pathname.split("/").pop(); // get current page name

        if (currentPage === "") {
            currentPage = "index.html";
        }

        let navLinks = document.querySelectorAll('.topbar-link-item');

        navLinks.forEach(function (link) {
            if (link.getAttribute('href').endsWith(currentPage)) {
                link.classList.add('active'); // active class for current page
            }
        });
    }
}

window.addEventListener('DOMContentLoaded', loadNavTopbar);