document.addEventListener('DOMContentLoaded', () => {
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

    slides[newIndex].classList.add('active');
};
