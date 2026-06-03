/**
 * Application Logic for Lead Generation Site
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Intersection Observer for Scroll Animations
    // ==========================================
    const animationSelectors = [
        '.fade-in-up',
        '.slide-in-left',
        '.slide-in-right',
        '.slide-in-bottom'
    ];
    
    const elementsToAnimate = document.querySelectorAll(animationSelectors.join(', '));
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };
    
    const animationObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Optional: stop observing once animated to keep it visible
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    elementsToAnimate.forEach(el => {
        animationObserver.observe(el);
    });

    // ==========================================
    // 2. Smooth Scrolling for Navigation Links
    // ==========================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Adjust for fixed header height
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 3. Form Submission Handling (Simulation)
    // ==========================================
    const leadForm = document.getElementById('leadForm');
    const formSuccess = document.getElementById('formSuccess');
    const submitBtn = leadForm ? leadForm.querySelector('.btn-submit') : null;
    
    if (leadForm) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation check (HTML5 validation already handles required fields)
            if (leadForm.checkValidity()) {
                // Change button state to show processing
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Simulate API call/processing time
                setTimeout(() => {
                    // Show success message
                    formSuccess.classList.remove('hidden');
                    
                    // Reset form
                    leadForm.reset();
                    
                    // Reset button
                    submitBtn.textContent = originalText;
                    submitBtn.disabled = false;
                    
                    // Hide success message after 5 seconds
                    setTimeout(() => {
                        formSuccess.classList.add('hidden');
                    }, 5000);
                    
                }, 1500);
            }
        });
    }

    // ==========================================
    // 4. Before/After Image Slider
    // ==========================================
    const overlays = document.querySelectorAll(".img-comp-overlay");
    overlays.forEach(overlay => {
        let slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        overlay.parentElement.insertBefore(slider, overlay);
        
        let img = overlay.querySelector('img') || overlay.previousElementSibling.querySelector('img');
        
        if (img && img.complete) {
            initSlider(overlay, slider);
        } else if (img) {
            img.addEventListener('load', () => initSlider(overlay, slider));
        } else {
            initSlider(overlay, slider); // fallback
        }
    });

    function initSlider(overlay, slider) {
        let clicked = 0;
        let container = overlay.parentElement;
        let w = container.offsetWidth;
        let h = container.offsetHeight;
        
        // Find the images
        let overlayImg = overlay.querySelector('img');
        let baseImg = container.firstElementChild.querySelector('img');
        
        function setDimensions() {
            w = container.offsetWidth;
            h = container.offsetHeight;
            if (overlayImg) overlayImg.style.width = w + "px";
            if (baseImg) baseImg.style.width = w + "px";
        }
        
        // Initial setup
        setDimensions();
        slide(w / 2); // Start at 50%
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";

        // Handle window resize to prevent responsive breaking
        window.addEventListener('resize', () => {
            setDimensions();
            // Optional: reset slider to middle on resize
            slide(w / 2);
        });

        slider.addEventListener("mousedown", slideReady);
        window.addEventListener("mouseup", slideFinish);
        slider.addEventListener("touchstart", slideReady);
        window.addEventListener("touchend", slideFinish);

        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener("mousemove", slideMove);
            window.addEventListener("touchmove", slideMove);
        }

        function slideFinish() {
            clicked = 0;
        }

        function slide(pos) {
            overlay.style.width = pos + "px";
            slider.style.left = pos - (slider.offsetWidth / 2) + "px";
        }

        function slideMove(e) {
            if (clicked === 0) return false;
            let pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            let a = container.getBoundingClientRect();
            return e.pageX - a.left - window.pageXOffset;
        }

        // --- NEW: Scroll-Triggered Intro Animation ---
        function runIntroAnimation() {
            // 1. Turn on smooth CSS transitions for the intro
            overlay.style.transition = "width 0.6s ease-in-out";
            slider.style.transition = "left 0.6s ease-in-out";

            // 2. Wait a moment, then start sequence
            setTimeout(() => {
                slide(w * 0.75); // Go to 75%

                setTimeout(() => {
                    slide(w * 0.25); // Go to 25%

                    setTimeout(() => {
                        slide(w * 0.50); // Back to 50%

                        // 3. Remove transitions so manual dragging is instant again
                        setTimeout(() => {
                            overlay.style.transition = "none";
                            slider.style.transition = "none";
                        }, 600);

                    }, 600);
                }, 600);
            }, 400); // slight delay after scrolling into view
        }

        // Trigger the animation only once when the container scrolls into view
        let observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    runIntroAnimation();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 }); // trigger when 50% visible

        observer.observe(container);
    }
});
