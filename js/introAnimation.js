document.addEventListener('DOMContentLoaded', () => {
    // Only run on initial load
    if (sessionStorage.getItem('introPlayed')) {
        return;
    }
    sessionStorage.setItem('introPlayed', 'true');

    // Create the canvas for the dirt overlay
    const canvas = document.createElement('canvas');
    canvas.id = 'intro-canvas';
    Object.assign(canvas.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        width: '100vw',
        height: '100vh',
        zIndex: '999999',
        pointerEvents: 'none', // Allows clicking through to the site
        transition: 'opacity 1s ease-in-out'
    });
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let radius = 0;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        radius = Math.max(canvas.width, canvas.height) * 1.2;
        
        // Fill with dirt (brown color)
        ctx.globalCompositeOperation = 'source-over';
        ctx.fillStyle = '#4a3020'; // Dark muddy brown
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add some texture/noise for a grimier look
        for (let i = 0; i < 5000; i++) {
            ctx.fillStyle = Math.random() > 0.5 ? '#3d2618' : '#5c4033';
            ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 4, 4);
        }
    }
    
    window.addEventListener('resize', resize);
    resize();

    // Spray animation parameters
    const originX = canvas.width / 2;
    const originY = canvas.height; // Spray from bottom center
    
    // Sweep counter-clockwise (Right to Left)
    // Canvas angles: 0 is right, -PI/2 is top, -PI is left.
    let currentAngle = -20 * Math.PI / 180; // Start at 20 degrees above right horizon
    const endAngle = -160 * Math.PI / 180;  // End at 20 degrees above left horizon
    
    // The fan of the pressure washer spray (e.g., a 30 degree wide nozzle fan)
    const sprayFanWidth = 30 * Math.PI / 180; 
    
    function drawWipe() {
        // Erase the dirt to reveal the clean site below
        ctx.globalCompositeOperation = 'destination-out';
        
        // We use a slight opacity to simulate the suds/water taking a few frames to fully clear the dirt
        ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
        
        ctx.beginPath();
        ctx.moveTo(originX, originY);
        // Draw an arc sector covering the spray fan width
        ctx.arc(originX, originY, radius, currentAngle - sprayFanWidth, currentAngle);
        ctx.fill();

        // Move the spray fan counter-clockwise
        currentAngle -= 0.04; 

        if (currentAngle > endAngle) {
            requestAnimationFrame(drawWipe);
        } else {
            // Animation finished!
            // Wait half a second, then fade out the remaining dirt on the edges
            setTimeout(() => {
                canvas.style.opacity = '0';
                setTimeout(() => {
                    canvas.remove();
                }, 1000);
            }, 500);
        }
    }

    // Start the pressure washer sweep shortly after load
    setTimeout(() => {
        requestAnimationFrame(drawWipe);
    }, 400);
});
