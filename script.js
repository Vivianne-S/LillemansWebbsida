// Safe form handler: only attach if a contact form exists.
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const phoneInput = document.getElementById('phone');
        const phoneRegex = /^[0-9\s\-+()]{6,20}$/;

        if (phoneInput && !phoneRegex.test(phoneInput.value)) {
            phoneInput.setCustomValidity('Ange ett giltigt telefonnummer');
            phoneInput.reportValidity();
            return;
        }

        if (phoneInput) {
            phoneInput.setCustomValidity('');
        }

        alert('Tack for ditt meddelande! Vi aterkommer snarast.');
    });
}

// Reveal sections with subtle animation on scroll.
const revealElements = document.querySelectorAll('.reveal-on-scroll');
if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
        (entries, obs) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
}