const navTopBarInjection = `
    <nav>
        <div class="nav-topbar">
            <div class="brand"> <img src="./img/nxtlvlshineLBG.png" id="companyBrand" alt="Company Brand"></div>
            <ul class="nav-topbar-links">
                <a class="topbar-link-item" href="/index.html">Home</a>
                <a class="topbar-link-item" href="/contact.html">Contact Us</a>
                <a class="topbar-link-item" href="/about.html">About Us</a>
                <a class="topbar-link-item" href="/booking.html">Booking</a>
            </ul>
        </div>
    </nav>
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