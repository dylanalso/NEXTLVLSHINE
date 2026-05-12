const SiteConfig = {
    phone: "(555) 123-4567",
    phoneLink: "+15551234567",
    email: "quotes@nextlvlshine.com",
    areaServed: "the Houston area",
    hours: "Mon-Sat: 8am - 6pm<br>Sun: Closed"
};

document.addEventListener('DOMContentLoaded', () => {
    const setContent = (id, content) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = content;
    };
    const setHref = (id, prefix, content) => {
        const el = document.getElementById(id);
        if (el) el.href = prefix + content;
    };

    // Populate any elements that have these IDs
    setContent('config-phone', SiteConfig.phone);
    setHref('config-phone-link', 'tel:', SiteConfig.phoneLink);
    
    setContent('config-email', SiteConfig.email);
    setHref('config-email-link', 'mailto:', SiteConfig.email);

    setContent('config-area', SiteConfig.areaServed);
    setContent('config-hours', SiteConfig.hours);
});
