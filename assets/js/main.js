/*==================== BOTTOM NAVIGATION ====================*/
const bottomNavLinks = document.querySelectorAll('.bottom-nav__link');

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

const scrollActive = () => {
    const scrollDown = window.scrollY;
    const headerHeight = document.querySelector('.header')?.offsetHeight || 80;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - headerHeight - 50;
        const sectionId = current.getAttribute('id');
        const bottomNavLink = document.querySelector(`.bottom-nav__link[href="#${sectionId}"]`);
        
        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            // Remove active from all bottom nav links
            bottomNavLinks.forEach(link => link.classList.remove('active'));
            // Add active to current link
            if (bottomNavLink) {
                bottomNavLink.classList.add('active');
            }
        }
    });
};

// Handle bottom nav link clicks
bottomNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        if (targetSection) {
            // Calculate offset accounting for fixed top bar
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            const offsetTop = targetSection.offsetTop - headerHeight - 20;
            window.scrollTo({
                top: Math.max(0, offsetTop),
                behavior: 'smooth'
            });
            
            // Update active state after scroll
            setTimeout(() => {
                bottomNavLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            }, 100);
        }
    });
});

window.addEventListener('scroll', scrollActive);

// Set active link on page load
scrollActive();

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
});

sr.reveal('.home__intro', {}); 
sr.reveal('.home__image', { delay: 400 }); 
sr.reveal('.experience__item', { interval: 200 }); 
sr.reveal('.work__item', { interval: 200 });
sr.reveal('.service__item', { interval: 200 });
sr.reveal('.skill__item', { interval: 150 });

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.getElementById('contact-form');
const contactEmail = document.getElementById('contact-email');
const contactPhone = document.getElementById('contact-phone');
const contactMessage = document.getElementById('contact-message');
const contactButton = document.querySelector('.contact__button');

if (contactForm && contactButton) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = contactEmail.value.trim();
        const phone = contactPhone.value.trim();
        const message = contactMessage.value.trim();
        const subject = 'Portfolio Contact';

        // Basic client-side validation
        if (!email || !message) {
            alert('Please fill in all required fields (Email, Message).');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    name: email.split('@')[0], 
                    email, 
                    subject, 
                    message: phone ? `Phone: ${phone}\n\nMessage: ${message}` : `Message: ${message}` 
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                // Clear form fields
                contactForm.reset();
            } else {
                alert(`Error: ${data.error || 'Something went wrong.'}`);
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('Could not connect to the server. Please try again later.');
        }
    });
}
