function initKineticTheory() {
    const canvas = document.getElementById('gasCanvas');
    const ctx = canvas.getContext('2d');
    const tempSlider = document.getElementById('tempSlider');
    const tempDisplay = document.getElementById('tempValue');

    let particles = [];
    const particleCount = 50;
    const radius = 5;

    class Particle {
        constructor() {
            this.x = Math.random() * (canvas.width - radius * 2) + radius;
            this.y = Math.random() * (canvas.height - radius * 2) + radius;
            let angle = Math.random() * Math.PI * 2;
            this.speed = parseFloat(tempSlider.value);
            this.vx = Math.cos(angle) * this.speed;
            this.vy = Math.sin(angle) * this.speed;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x - radius < 0 || this.x + radius > canvas.width) this.vx *= -1;
            if (this.y - radius < 0 || this.y + radius > canvas.height) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, radius, 0, Math.PI * 2);
            let colorVal = Math.min(255, this.speed * 50);
            ctx.fillStyle = `rgb(${colorVal}, 100, ${255 - colorVal})`;
            ctx.fill();
            ctx.closePath();
        }

        setSpeed(newSpeed) {
            let currentAngle = Math.atan2(this.vy, this.vx);
            this.speed = newSpeed;
            this.vx = Math.cos(currentAngle) * this.speed;
            this.vy = Math.sin(currentAngle) * this.speed;
        }
    }

    for (let i = 0; i < particleCount; i++) particles.push(new Particle());

    function animate() {
        // Safety check: stop if the canvas is gone (user switched pages)
        if (!document.getElementById('gasCanvas')) return;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(animate);
    }

    tempSlider.addEventListener('input', (e) => {
        let val = parseFloat(e.target.value);
        tempDisplay.innerText = val;
        particles.forEach(p => p.setSpeed(val));
    });

    animate();
}