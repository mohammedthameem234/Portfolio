/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            if (sectionsClass) {
                sectionsClass.classList.add('active-link')
            }
        }else{
            if (sectionsClass) {
                sectionsClass.classList.remove('active-link')
            }
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .contact__input, .contact__button',{interval: 200}); 

/*==================== CONTACT FORM SUBMISSION ====================*/
const contactForm = document.querySelector('.contact__form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactMessage = document.getElementById('contact-message');
const contactButton = document.querySelector('.contact__button');

if (contactForm && contactButton) {
    contactButton.addEventListener('click', async (e) => {
        e.preventDefault(); // Prevent default form submission

        const name = contactName.value.trim();
        const email = contactEmail.value.trim();
        const message = contactMessage.value.trim();
        const subject = 'Portfolio Contact'; // Default subject, can be made dynamic if needed

        // Basic client-side validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields (Name, Email, Message).');
            return;
        }

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, subject, message }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message); // Show success message
                // Clear form fields
                contactName.value = '';
                contactEmail.value = '';
                contactMessage.value = '';
            } else {
                alert(`Error: ${data.error || 'Something went wrong.'}`); // Show error message
            }
        } catch (error) {
            console.error('Network or server error:', error);
            alert('Could not connect to the server. Please try again later.');
        }
    });
}