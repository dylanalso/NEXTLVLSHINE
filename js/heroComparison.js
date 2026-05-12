function initComparisons() {
    var x, i;
    /* Find all elements with an "overlay" class: */
    x = document.getElementsByClassName("img-comp-overlay");
    for (i = 0; i < x.length; i++) {
        /* Once for each "overlay" element:
        pass the "overlay" element as a parameter when executing the compareImages function: */
        compareImages(x[i]);
    }

    function compareImages(img) {
        var slider, clicked = 0, w, h;
        /* Get the width and height of the img element */
        w = img.offsetWidth;
        h = img.offsetHeight;

        /* Set the width of the img element to 50%: */
        img.style.width = (w / 2) + "px";

        /* Create slider: */
        slider = document.createElement("DIV");
        slider.setAttribute("class", "img-comp-slider");
        /* Insert slider */
        img.parentElement.insertBefore(slider, img);

        /* Position the slider in the middle: */
        slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
        slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";

        /* Execute a function when the mouse button is pressed: */
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

        function slideMove(e) {
            var pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }

        function getCursorPos(e) {
            var a, x = 0;
            e = (e.changedTouches) ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }

        function slide(x) {
            /* Resize the image: */
            img.style.width = x + "px";
            /* Position the slider using x directly so it animates smoothly */
            slider.style.left = x - (slider.offsetWidth / 2) + "px";
        }

        // --- NEW: THE INTRO ANIMATION ---
        function runIntroAnimation() {
            // 1. Turn on smooth CSS transitions for the intro
            img.style.transition = "width 0.5s ease-in-out";
            slider.style.transition = "left 0.5s ease-in-out";

            // 2. Wait 1 second after load, then start sequence
            setTimeout(() => {
                slide(w * 0.25); // Go to 25%

                setTimeout(() => {
                    slide(w * 0.75); // Go to 75%

                    setTimeout(() => {
                        slide(w * 0.50); // Back to 50%

                        // 3. Remove transitions so manual dragging is instant again
                        setTimeout(() => {
                            img.style.transition = "none";
                            slider.style.transition = "none";
                        }, 800);

                    }, 800);
                }, 800);
            }, 1000);
        }

        // Trigger the animation
        runIntroAnimation();
    }
}

/* Initialize the slider once all images have fully loaded */
window.addEventListener('load', initComparisons);