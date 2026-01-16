// ============================================
// INITIALIZE LUCIDE ICONS
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    lucide.createIcons();
});

// ============================================
// PRELOADER
// ============================================
window.addEventListener('load', function() {
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('hidden');
        
        // Start hero animations after preloader
        setTimeout(function() {
            document.querySelectorAll('.hero .fade-in').forEach(function(el, index) {
                setTimeout(function() {
                    el.classList.add('visible');
                }, index * 150);
            });
            
            // Animate counters
            animateCounters();
        }, 300);
    }, 2500);
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// ============================================
// SCROLL PROGRESS BAR
// ============================================
const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', function() {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// ============================================
// MOBILE MENU
// ============================================
const menuToggle = document.getElementById('menuToggle');
const menuClose = document.getElementById('menuClose');
const mobileMenu = document.getElementById('mobileMenu');
const mobileOverlay = document.getElementById('mobileOverlay');

function openMenu() {
    mobileMenu.classList.add('active');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

menuToggle.addEventListener('click', openMenu);
menuClose.addEventListener('click', closeMenu);
mobileOverlay.addEventListener('click', closeMenu);

// Close menu on link click
document.querySelectorAll('.mobile-menu-link, .mobile-menu .btn-gold').forEach(function(link) {
    link.addEventListener('click', closeMenu);
});

// ============================================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// ============================================
const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in');

const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

animatedElements.forEach(function(el) {
    // Don't observe hero elements - they're animated after preloader
    if (!el.closest('.hero')) {
        observer.observe(el);
    }
});

// ============================================
// COUNTER ANIMATION
// ============================================
function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(function(counter) {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        function updateCounter() {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current) + (target === 100 ? '%' : '+');
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + (target === 100 ? '%' : '+');
            }
        }
        
        updateCounter();
    });
}

// ============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// ACTIVE NAV LINK HIGHLIGHTING
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(function(section) {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(function(link) {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// LIGHTBOX
// ============================================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.gallery-item img').forEach(function(img) {
    img.addEventListener('click', function() {
        lightboxImg.src = this.src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', function(e) {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ============================================
// PARALLAX EFFECT (HERO BACKGROUND)
// ============================================
const heroBg = document.querySelector('.hero-bg');

window.addEventListener('scroll', function() {
    if (heroBg && window.pageYOffset < window.innerHeight) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = 'translateY(' + (scrolled * 0.4) + 'px)';
    }
});

// ============================================
// FLOATING PARTICLES (Only on desktop)
// ============================================
function initParticles() {
    // Skip on mobile for performance
    if (window.innerWidth < 768) return;
    
    const container = document.getElementById('particlesContainer');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        const size = Math.random() * 4 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(particle);
        
        setTimeout(function() {
            particle.remove();
        }, 25000);
    }

    // Create initial particles
    for (let i = 0; i < 15; i++) {
        setTimeout(createParticle, i * 300);
    }

    // Continuously create particles
    setInterval(createParticle, 2000);
}

// Initialize particles after page load
window.addEventListener('load', function() {
    setTimeout(initParticles, 3000);
});

// ============================================
// MAGNETIC BUTTONS (Only on desktop)
// ============================================
if (!('ontouchstart' in window)) {
    document.querySelectorAll('.btn-gold, .btn-outline, .social-icon').forEach(function(el) {
        el.addEventListener('mousemove', function(e) {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = 'translate(' + (x * 0.2) + 'px, ' + (y * 0.2) + 'px)';
        });

        el.addEventListener('mouseleave', function() {
            el.style.transform = 'translate(0, 0)';
        });
    });
}

// ============================================
// 3D TILT EFFECT ON CARDS (Only on desktop)
// ============================================
if (!('ontouchstart' in window) && window.innerWidth >= 1024) {
    document.querySelectorAll('.service-card, .testimonial-card').forEach(function(card) {
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = 'perspective(1000px) rotateX(' + rotateX + 'deg) rotateY(' + rotateY + 'deg) translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ============================================
// HANDLE IMAGE LOADING ERRORS
// ============================================
document.querySelectorAll('img').forEach(function(img) {
    img.addEventListener('error', function() {
        // Get dimensions from CSS if possible
        const computedStyle = window.getComputedStyle(img);
        const width = parseInt(computedStyle.width) || 400;
        const height = parseInt(computedStyle.height) || 300;
        
        // Set a placeholder
        this.src = 'https://placehold.co/' + width + 'x' + height + '/1a1a1a/c9a14a?text=Image';
        this.alt = 'Placeholder image';
    });
});

// ============================================
// PREVENT FLASH OF UNSTYLED CONTENT
// ============================================
document.documentElement.style.visibility = 'visible';