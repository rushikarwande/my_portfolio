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
            reset: false
        });

        srtop.reveal('.experience .timeline', { delay: 400 });
        srtop.reveal('.experience .timeline .container', { interval: 400 });
    }
    
});
