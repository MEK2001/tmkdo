/**
 * Theme & Animation Controller
 * The Minimalist Kraft & DO
 * Handles theme switching with GSAP animations
 */

class ThemeController {
    constructor() {
        this.theme = this.getStoredTheme() || this.getPreferredTheme();
        this.init();
    }

    init() {
        // Set initial theme
        this.setTheme(this.theme, false);
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                this.setTheme(e.matches ? 'dark' : 'light');
            }
        });
    }

    getPreferredTheme() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    getStoredTheme() {
        return localStorage.getItem('theme');
    }

    setTheme(theme, animate = true) {
        const oldTheme = this.theme;
        this.theme = theme;
        
        // Update DOM
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update toggle button if exists
        const themeToggle = document.querySelector('.theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('span');
            if (icon) {
                icon.textContent = theme === 'light' ? '🌙' : '☀️';
            }
            
            // Animate the button
            if (animate && typeof gsap !== 'undefined') {
                gsap.to(themeToggle, {
                    rotation: 360,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    onComplete: () => {
                        gsap.set(themeToggle, { rotation: 0 });
                    }
                });
            }
        }
        
        // Trigger theme change animation if different
        if (animate && oldTheme !== theme && typeof gsap !== 'undefined') {
            this.animateThemeTransition();
        }
        
        // Dispatch custom event
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    toggleTheme() {
        const newTheme = this.theme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
    }

    animateThemeTransition() {
        // Create a ripple effect overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${this.theme === 'light' ? '#f5f0e8' : '#1a1a1a'};
            opacity: 0;
            pointer-events: none;
            z-index: 9999;
        `;
        document.body.appendChild(overlay);
        
        gsap.to(overlay, {
            opacity: 0.7,
            duration: 0.15,
            ease: 'power2.in',
            onComplete: () => {
                gsap.to(overlay, {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                        overlay.remove();
                    }
                });
            }
        });
    }
}

/**
 * Animation Controller using GSAP
 */
class AnimationController {
    constructor() {
        this.initScrollAnimations();
        this.initPageTransitions();
        this.initHoverAnimations();
    }

    initScrollAnimations() {
        // Check if GSAP and ScrollTrigger are available
        if (typeof gsap === 'undefined') {
            console.warn('GSAP not loaded, using fallback animations');
            this.initFallbackScrollAnimations();
            return;
        }

        // Register ScrollTrigger plugin
        if (typeof ScrollTrigger !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);
            
            // Detect if mobile device
            const isMobile = window.innerWidth <= 768;
            
            // Animate elements on scroll
            const animateOnScroll = (selector, animationProps) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((el, index) => {
                    // Reduce animation complexity on mobile
                    const mobileProps = isMobile ? {
                        ...animationProps,
                        duration: animationProps.duration * 0.5, // Faster on mobile
                        delay: index * 0.05 // Less stagger
                    } : {
                        ...animationProps,
                        delay: index * 0.1
                    };
                    
                    gsap.from(el, {
                        ...mobileProps,
                        scrollTrigger: {
                            trigger: el,
                            start: isMobile ? 'top 90%' : 'top 85%', // Earlier trigger on mobile
                            end: 'top 20%',
                            toggleActions: 'play none none reverse',
                        }
                    });
                });
            };

            // Apply animations to different elements
            animateOnScroll('.value-card, .info-card', {
                y: isMobile ? 30 : 50,
                opacity: 0,
                duration: isMobile ? 0.4 : 0.8,
                ease: 'power3.out'
            });

            animateOnScroll('.about-section, .highlight-box', {
                y: isMobile ? 20 : 30,
                opacity: 0,
                duration: isMobile ? 0.3 : 0.6,
                ease: 'power2.out'
            });

            animateOnScroll('.blog-card, .featured-post', {
                scale: isMobile ? 0.98 : 0.95,
                opacity: 0,
                duration: isMobile ? 0.35 : 0.7,
                ease: isMobile ? 'power2.out' : 'back.out(1.2)'
            });

            animateOnScroll('.stat-item', {
                scale: isMobile ? 0.95 : 0.8,
                opacity: 0,
                duration: isMobile ? 0.3 : 0.6,
                ease: isMobile ? 'power2.out' : 'elastic.out(1, 0.5)'
            });
        } else {
            this.initFallbackScrollAnimations();
        }
    }

    initFallbackScrollAnimations() {
        // Detect if mobile device
        const isMobile = window.innerWidth <= 768;
        
        // Fallback using Intersection Observer
        const observerOptions = {
            threshold: isMobile ? 0.05 : 0.1,
            rootMargin: isMobile ? '0px 0px -50px 0px' : '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animationDuration = isMobile ? '0.4s' : '0.6s';
                    entry.target.style.animation = `fadeInUp ${animationDuration} ease forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe elements
        const elementsToAnimate = document.querySelectorAll(
            '.value-card, .info-card, .blog-card, .about-section, .highlight-box, .stat-item'
        );
        
        elementsToAnimate.forEach((el, index) => {
            el.style.opacity = '0';
            // Reduce stagger delay on mobile
            const staggerDelay = isMobile ? index * 0.05 : index * 0.1;
            el.style.animationDelay = `${staggerDelay}s`;
            observer.observe(el);
        });
    }

    initPageTransitions() {
        if (typeof gsap === 'undefined') return;

        // Animate page entry
        gsap.from('body', {
            opacity: 0,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Animate hero section
        const hero = document.querySelector('.page-hero, .hero-section');
        if (hero) {
            const heroTitle = hero.querySelector('h1');
            const heroText = hero.querySelector('p');
            
            const timeline = gsap.timeline();
            
            if (heroTitle) {
                timeline.from(heroTitle, {
                    y: 50,
                    opacity: 0,
                    duration: 0.8,
                    ease: 'power3.out'
                }, 0.2);
            }
            
            if (heroText) {
                timeline.from(heroText, {
                    y: 30,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power2.out'
                }, 0.4);
            }
        }

        // Animate navigation
        const navItems = document.querySelectorAll('nav a');
        if (navItems.length > 0) {
            gsap.from(navItems, {
                y: -20,
                opacity: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: 'power2.out',
                delay: 0.3
            });
        }
    }

    initHoverAnimations() {
        if (typeof gsap === 'undefined') return;

        // Add smooth hover effects to cards
        const cards = document.querySelectorAll('.value-card, .info-card, .blog-card, .highlight-box');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                gsap.to(card, {
                    y: -8,
                    scale: 1.02,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            });
        });

        // Animate buttons
        const buttons = document.querySelectorAll('button, .btn, .cta-button, .submit-btn');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                gsap.to(button, {
                    scale: 1.05,
                    duration: 0.2,
                    ease: 'back.out(2)'
                });
            });

            button.addEventListener('mouseleave', () => {
                gsap.to(button, {
                    scale: 1,
                    duration: 0.2,
                    ease: 'power2.out'
                });
            });
        });
    }

    // Utility method for custom animations
    animateElement(element, props) {
        if (typeof gsap !== 'undefined') {
            return gsap.to(element, props);
        }
    }
}

/**
 * Form Animation Controller
 */
class FormAnimationController {
    constructor() {
        this.initFormAnimations();
    }

    initFormAnimations() {
        const formInputs = document.querySelectorAll('input, textarea, select');
        
        formInputs.forEach(input => {
            // Focus animations
            input.addEventListener('focus', () => {
                const parent = input.closest('.form-group');
                if (parent && typeof gsap !== 'undefined') {
                    gsap.to(parent, {
                        scale: 1.02,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });

            input.addEventListener('blur', () => {
                const parent = input.closest('.form-group');
                if (parent && typeof gsap !== 'undefined') {
                    gsap.to(parent, {
                        scale: 1,
                        duration: 0.2,
                        ease: 'power2.out'
                    });
                }
            });
        });
    }
}

/**
 * Initialize everything when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme controller
    window.themeController = new ThemeController();
    
    // Initialize animation controller
    window.animationController = new AnimationController();
    
    // Initialize form animations
    window.formAnimationController = new FormAnimationController();
    
    // Setup theme toggle buttons
    const themeToggles = document.querySelectorAll('.theme-toggle');
    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            window.themeController.toggleTheme();
        });
    });

    // Add smooth scroll behavior to anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Log initialization
    console.log('🎨 Theme & Animation System Initialized');
    console.log(`Current Theme: ${window.themeController.theme}`);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ThemeController, AnimationController, FormAnimationController };
}
