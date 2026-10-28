document.addEventListener('DOMContentLoaded', () => {
    // 0. Animated background dots + cursor trail / click ripple (cursor part on mouse devices only)
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        initGridGlow(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
    }

    // 1. Smooth Scrolling for navbar links
    document.querySelectorAll('.pixel-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                e.preventDefault();
                const targetEl = document.querySelector(targetId);
                if (targetEl) {
                    targetEl.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 2. Typing Effect for Dialog Box
    const dialogText = document.getElementById('dialog-typing');
    if (dialogText) {
        const originalText = dialogText.innerHTML;
        dialogText.innerHTML = '';
        let i = 0;

        // Trigger typing when section is in view
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                typeWriter();
                observer.disconnect();
            }
        }, { threshold: 0.5 });

        // Observe the dialog box parent
        const dialogParent = document.querySelector('.dialog-box');
        if (dialogParent) observer.observe(dialogParent);

        function typeWriter() {
            if (i < originalText.length) {
                dialogText.innerHTML += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 30); // Speed of typing
            }
        }
    }

    // 3. Advanced Animations using Motion (Framer Motion API for Vanilla JS)
    if (typeof Motion !== 'undefined') {
        const { animate, inView, stagger } = Motion;

        // Section Entry animations (Pop Up)
        inView('.pop-anim', (info) => {
            animate(info.target,
                { opacity: [0, 1], y: [30, 0] },
                { duration: 0.5, easing: "ease-out" }
            );
        });

        // Health Bar Loading Effect
        inView('.health-bar', (info) => {
            const el = info.target;
            const targetWidth = el.style.width;
            el.style.width = '0%';
            animate(el,
                { width: targetWidth },
                { duration: 1.2, delay: 0.3, easing: "ease-out" }
            );
        });

        // Staggered Inventory Items Entry
        inView('.inventory-grid', (info) => {
            const items = info.target.querySelectorAll('.item-slot');
            if (items.length > 0) {
                animate(
                    items,
                    { opacity: [0, 1], scale: [0.5, 1] },
                    { delay: stagger(0.1), duration: 0.4 }
                );
            }
        });

    } else {
        console.warn("Motion library not loaded, animations fallbacked to CSS.");

        // CSS Fallback: Use IntersectionObserver + CSS transitions
        // Set initial hidden state for pop-anim elements
        document.querySelectorAll('.pop-anim').forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        });

        const popObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    popObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.pop-anim').forEach(el => popObserver.observe(el));

        // CSS Fallback: Health bar animation
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const targetWidth = el.style.width;
                    el.style.width = '0%';
                    el.style.transition = 'width 1.2s ease-out 0.3s';
                    requestAnimationFrame(() => {
                        el.style.width = targetWidth;
                    });
                    barObserver.unobserve(el);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.health-bar').forEach(el => barObserver.observe(el));

        // CSS Fallback: Staggered inventory items
        const gridObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const items = entry.target.querySelectorAll('.item-slot');
                    items.forEach((item, idx) => {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.5)';
                        item.style.transition = `opacity 0.4s ease-out ${idx * 0.1}s, transform 0.4s ease-out ${idx * 0.1}s`;
                        requestAnimationFrame(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        });
                    });
                    gridObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        document.querySelectorAll('.inventory-grid').forEach(el => gridObserver.observe(el));
    }
});

// Image Protection
document.addEventListener('contextmenu', function (e) {
    if (e.target.matches('img')) {
        e.preventDefault();
    }
});

document.addEventListener('dragstart', function (e) {
    if (e.target.matches('img')) {
        e.preventDefault();
    }
});

// Carousel Logic
window.moveSlide = function (carouselId, step) {
    const container = document.getElementById(carouselId);
    if (!container) return;

    const slides = container.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    let activeIndex = 0;
    slides.forEach((slide, idx) => {
        if (slide.classList.contains('active')) {
            activeIndex = idx;
            slide.classList.remove('active');
        }
    });

    let newIndex = activeIndex + step;
    if (newIndex >= slides.length) newIndex = 0;
    if (newIndex < 0) newIndex = slides.length - 1;

    // Pause any video in the slide we're leaving
    slides[activeIndex].querySelectorAll('video').forEach(v => v.pause());

    slides[newIndex].classList.add('active');
};

// ===== GRID GLOW =====
// Animates the background dot matrix: slow light waves sweeping across and
// random twinkling dots. On mouse devices it also lights up a connected mesh
// around the cursor, leaving a fading trail (green → purple → orange) and a ripple on click.
function initGridGlow(withPointer) {
    const AMBIENT_FPS = 30;    // frame cap while only the ambient animation runs
    const WAVE_SPEED = 0.00045; // how fast the light waves travel
    const WAVE_LENGTH = 320;   // px between waves
    const WAVE_SHARPNESS = 0.82; // higher = thinner wave bands (0..1)
    const TWINKLE_COUNT = 28;  // dots twinkling at the same time
    const GAP = 26;            // must match body background-size (dot matrix)
    const OFFSET = GAP / 2;    // dots sit in the centre of each tile
    const TRAIL_LIFE = 900;    // ms a trail point stays visible
    const TRAIL_RADIUS = 120;  // px glow radius at the cursor
    const TRAIL_STEP = 12;     // px between interpolated trail points
    const RIPPLE_LIFE = 1100;  // ms
    const RIPPLE_SPEED = 0.45; // px per ms
    const RIPPLE_WIDTH = 34;   // px

    // Same palette as the content: --text-primary, --text-secondary, --text-highlight
    const GREEN = [0, 255, 157];
    const PURPLE = [168, 85, 247];
    const ORANGE = [249, 115, 22];

    const canvas = document.createElement('canvas');
    canvas.id = 'grid-glow';
    document.body.prepend(canvas);
    const ctx = canvas.getContext('2d');

    let cols = 0, rows = 0, intensity, red, green, blue;
    const trail = [];
    const ripples = [];
    const twinkles = [];
    let last = null;
    let lastDraw = 0;

    function resize() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        cols = Math.ceil(window.innerWidth / GAP) + 1;
        rows = Math.ceil(window.innerHeight / GAP) + 1;
        intensity = new Float32Array(cols * rows);
        red = new Float32Array(cols * rows);
        green = new Float32Array(cols * rows);
        blue = new Float32Array(cols * rows);
    }

    function mix(a, b, t) {
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }

    // Fresh trail is green, then fades through purple into orange
    function trailColor(age) {
        return age < 0.5 ? mix(GREEN, PURPLE, age * 2) : mix(PURPLE, ORANGE, (age - 0.5) * 2);
    }

    function addGlow(cx, cy, radius, color, falloff) {
        const minC = Math.max(0, Math.floor((cx - radius - OFFSET) / GAP));
        const maxC = Math.min(cols - 1, Math.ceil((cx + radius - OFFSET) / GAP));
        const minR = Math.max(0, Math.floor((cy - radius - OFFSET) / GAP));
        const maxR = Math.min(rows - 1, Math.ceil((cy + radius - OFFSET) / GAP));
        for (let r = minR; r <= maxR; r++) {
            for (let c = minC; c <= maxC; c++) {
                const f = falloff(Math.hypot(c * GAP + OFFSET - cx, r * GAP + OFFSET - cy));
                if (f <= 0) continue;
                const i = r * cols + c;
                intensity[i] += f;
                red[i] += f * color[0];
                green[i] += f * color[1];
                blue[i] += f * color[2];
            }
        }
    }

    function spawnTwinkle(now) {
        const palette = [GREEN, PURPLE, ORANGE];
        return {
            c: Math.floor(Math.random() * cols),
            r: Math.floor(Math.random() * rows),
            t: now + Math.random() * 2000,
            dur: 1200 + Math.random() * 1800,
            color: palette[Math.floor(Math.random() * palette.length)]
        };
    }

    // Background-only layer: dots (no mesh lines) so it stays subtle and cheap
    function drawAmbient(now) {
        const w = window.innerWidth;
        const phase = now * WAVE_SPEED;
        const k = (Math.PI * 2) / WAVE_LENGTH;

        for (let r = 0; r < rows; r++) {
            const y = r * GAP + OFFSET;
            for (let c = 0; c < cols; c++) {
                const x = c * GAP + OFFSET;
                // Diagonal waves, with a second slower wave crossing them
                const s = Math.sin((x * 0.7 + y) * k - phase * 6) * 0.7 +
                    Math.sin((x - y * 0.5) * k * 0.6 + phase * 4) * 0.3;
                if (s < WAVE_SHARPNESS) continue;
                const a = ((s - WAVE_SHARPNESS) / (1 - WAVE_SHARPNESS)) * 0.45;
                const col = mix(GREEN, PURPLE, x / w);
                ctx.fillStyle = `rgba(${col[0] | 0},${col[1] | 0},${col[2] | 0},${a})`;
                ctx.fillRect(x - 1, y - 1, 2, 2);
            }
        }

        while (twinkles.length < TWINKLE_COUNT) twinkles.push(spawnTwinkle(now));
        for (let n = 0; n < twinkles.length; n++) {
            const tw = twinkles[n];
            const p = (now - tw.t) / tw.dur;
            if (p < 0) continue;
            if (p >= 1) { twinkles[n] = spawnTwinkle(now); continue; }
            const a = Math.sin(p * Math.PI);
            const x = tw.c * GAP + OFFSET, y = tw.r * GAP + OFFSET;
            ctx.fillStyle = `rgba(${tw.color[0]},${tw.color[1]},${tw.color[2]},${a * 0.85})`;
            ctx.fillRect(x - 1.5, y - 1.5, 3, 3);
            // Small cross flare at the peak
            if (a > 0.6) {
                ctx.fillStyle = `rgba(${tw.color[0]},${tw.color[1]},${tw.color[2]},${(a - 0.6) * 0.6})`;
                ctx.fillRect(x - 5, y - 0.5, 10, 1);
                ctx.fillRect(x - 0.5, y - 5, 1, 10);
            }
        }
    }

    function frame(now) {
        requestAnimationFrame(frame);

        while (trail.length && now - trail[0].t > TRAIL_LIFE) trail.shift();
        while (ripples.length && now - ripples[0].t > RIPPLE_LIFE) ripples.shift();
        const pointerActive = trail.length || ripples.length;

        // Full frame rate only while the cursor effect is active
        if (!pointerActive && now - lastDraw < 1000 / AMBIENT_FPS) return;
        lastDraw = now;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.globalCompositeOperation = 'lighter';
        drawAmbient(now);
        if (!pointerActive) return;

        intensity.fill(0); red.fill(0); green.fill(0); blue.fill(0);

        for (const p of trail) {
            const age = (now - p.t) / TRAIL_LIFE;
            const life = 1 - age;
            const radius = TRAIL_RADIUS * (0.35 + 0.65 * life);
            addGlow(p.x, p.y, radius, trailColor(age), d => {
                const k = 1 - d / radius;
                return k > 0 ? k * k * life * 0.35 : 0;
            });
        }

        for (const rp of ripples) {
            const age = (now - rp.t) / RIPPLE_LIFE;
            const ringR = (now - rp.t) * RIPPLE_SPEED;
            addGlow(rp.x, rp.y, ringR + RIPPLE_WIDTH, mix(PURPLE, GREEN, age), d => {
                const k = 1 - Math.abs(d - ringR) / RIPPLE_WIDTH;
                return k > 0 ? k * (1 - age) * 0.9 : 0;
            });
        }

        ctx.lineWidth = 1;

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) {
                const i = r * cols + c;
                const a = intensity[i];
                if (a < 0.01) continue;
                const x = c * GAP + OFFSET;
                const y = r * GAP + OFFSET;
                const cr = red[i] / a, cg = green[i] / a, cb = blue[i] / a;
                const alpha = Math.min(1, a);

                // Lines to the right and bottom neighbours form the mesh
                const neighbours = [c + 1 < cols ? i + 1 : -1, r + 1 < rows ? i + cols : -1];
                for (const j of neighbours) {
                    if (j < 0 || intensity[j] < 0.01) continue;
                    const b = intensity[j];
                    const la = Math.min(1, (a + b) / 2) * 0.55;
                    const nr = (cr + red[j] / b) / 2, ng = (cg + green[j] / b) / 2, nb = (cb + blue[j] / b) / 2;
                    ctx.strokeStyle = `rgba(${nr | 0},${ng | 0},${nb | 0},${la})`;
                    ctx.beginPath();
                    ctx.moveTo(x, y);
                    ctx.lineTo(j === i + 1 ? x + GAP : x, j === i + 1 ? y : y + GAP);
                    ctx.stroke();
                }

                ctx.fillStyle = `rgba(${cr | 0},${cg | 0},${cb | 0},${alpha})`;
                ctx.beginPath();
                ctx.arc(x, y, 1 + alpha * 1.6, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    window.addEventListener('resize', () => {
        resize();
        twinkles.length = 0;
    });
    resize();
    requestAnimationFrame(frame);

    if (!withPointer) return;

    document.addEventListener('mousemove', (e) => {
        const now = performance.now();
        const x = e.clientX, y = e.clientY;
        // Fill gaps on fast movement so the trail stays continuous
        if (last) {
            const dist = Math.hypot(x - last.x, y - last.y);
            const steps = Math.min(20, Math.floor(dist / TRAIL_STEP));
            for (let s = 1; s < steps; s++) {
                trail.push({ x: last.x + (x - last.x) * s / steps, y: last.y + (y - last.y) * s / steps, t: now });
            }
        }
        trail.push({ x, y, t: now });
        if (trail.length > 250) trail.splice(0, trail.length - 250);
        last = { x, y };
    });

    document.addEventListener('mousedown', (e) => {
        ripples.push({ x: e.clientX, y: e.clientY, t: performance.now() });
    });

    document.documentElement.addEventListener('mouseleave', () => { last = null; });
}
