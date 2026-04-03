// Main JavaScript for Saurav's Portfolio

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize GSAP
    gsap.registerPlugin(ScrollTrigger);
    
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Hero section animations
    
// GSAP: ensure GSAP controls hero animation precisely
if (window.gsap) {
  try {
    gsap.set(['.hero-title', '.hero-tagline', '.hero-cta'], { opacity: 0, y: 20, force3D: true });
    const heroTL = gsap.timeline({ defaults: { duration: 0.9, ease: 'power3.out' }});
    heroTL.to('.hero-title', { opacity: 1, y: 0 })
          .to('.hero-tagline', { opacity: 1, y: 0 }, '-=0.6')
          .to('.hero-cta', { opacity: 1, y: 0, force3D: true }, '-=0.55')
          .call(() => {
             const cta = document.querySelector('.hero-cta');
             if (cta) {
               cta.style.transform = 'translateY(0)';
               cta.style.opacity = '1';
             }
          });
  } catch(e) { console.warn('GSAP hero TL failed', e); }
}
// Scroll animations
    // About section
    gsap.from('.about-image', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });
    
    gsap.from('.about-content', {
        scrollTrigger: {
            trigger: '#about',
            start: 'top 80%',
        },
        opacity: 0,
        x: 50,
        duration: 1,
        ease: 'power3.out'
    });
    
    // Project cards
    gsap.utils.toArray('.project-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%',
            },
            opacity: 0,
            y: 50,
            duration: 0.8,
            delay: i * 0.2,
            ease: 'power3.out'
        });
    });
    
    // Skills
    gsap.utils.toArray('.skill-item').forEach((skill, i) => {
        gsap.to(skill, {
            scrollTrigger: {
                trigger: skill,
                start: 'top 90%',
            },
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: 'power3.out'
        });
    });
    
    // Section titles animation
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: 'top 90%',
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
    
    // Project card tilt effect
    const projectCards = document.querySelectorAll('.project-card > div');
    
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left; // x position within the element
            const y = e.clientY - rect.top; // y position within the element
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (x - centerX) / centerX * 5; // Max 5 degrees
            const deltaY = (y - centerY) / centerY * 5; // Max 5 degrees
            
            this.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
        });
    });

    /* SCROLL EXPERIENCE */
    // Align the experience timeline animation with the Gaurav portfolio behavior
    if (window.ScrollReveal) {
        const srtop = ScrollReveal({
            origin: 'top',
            distance: '80px',
            duration: 1000,
            reset: true
        });

        srtop.reveal('.experience .timeline', { delay: 400 });
        srtop.reveal('.experience .timeline .container', { interval: 400 });
    }
    
    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            // Simulate form submission delay
            setTimeout(() => {
                // Reset button state
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Redirect to thank-you page
                window.location.href = 'thank-you.html';
            }, 1500);
        });
    }
    
    // Function to show success message
    function showSuccessMessage() {
        // Create success message element
        const successMessage = document.createElement('div');
        successMessage.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        successMessage.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>Thank you! Please email me directly at workwithsauravshinde@gmail.com</span>
            </div>
        `;
        
        document.body.appendChild(successMessage);
        
        // Animate in
        setTimeout(() => {
            successMessage.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successMessage.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(successMessage);
            }, 300);
        }, 3000);
    }
    
    // Function to show error message
    function showErrorMessage(customMessage = 'Failed to send message. Please try again.') {
        // Create error message element
        const errorMessage = document.createElement('div');
        errorMessage.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        errorMessage.innerHTML = `
            <div class="flex items-center space-x-2">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
                <span>${customMessage}</span>
            </div>
        `;
        
        document.body.appendChild(errorMessage);
        
        // Animate in
        setTimeout(() => {
            errorMessage.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 5 seconds
        setTimeout(() => {
            errorMessage.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(errorMessage);
            }, 300);
        }, 5000);
    }
});
