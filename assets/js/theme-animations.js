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
            
            // Check for reduced motion preference
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            
            // Animate elements on scroll with subtle, smooth animations
            const animateOnScroll = (selector, animationProps) => {
                const elements = document.querySelectorAll(selector);
                elements.forEach((el, index) => {
                    // Skip or simplify animations if user prefers reduced motion
                    if (prefersReducedMotion) {
                        gsap.set(el, { opacity: 1, y: 0, scale: 1 });
                        return;
                    }
                    
                    // Ultra-fast, near-zero stagger for blog cards
                    const mobileProps = isMobile ? {
                        ...animationProps,
                        duration: animationProps.duration * 0.5, // Even faster
                        delay: index * 0.005 // Almost zero delay - cards appear instantly
                    } : {
                        ...animationProps,
                        delay: index * 0.008 // Minimal stagger
                    };
                    
                    gsap.from(el, {
                        ...mobileProps,
                        scrollTrigger: {
                            trigger: el,
                            start: isMobile ? 'top 110%' : 'top 110%', // Load even BEFORE visible - smart preload!
                            end: 'top 10%',
                            toggleActions: 'play none none none', // No reverse
                            once: true, // Animate only once
                        }
                    });
                });
            };

            // Blog cards - INSTANT animation, pre-loads ahead of scroll
            // Use eager loading: cards load BEFORE they come into view
            // Check if we're on blog page - if so, disable animations for performance
            const isBlogPage = window.location.pathname.includes('/blog');
            
            if (isBlogPage) {
                // On blog page: Show cards instantly without animation for performance
                const blogCards = document.querySelectorAll('.blog-card, .featured-post');
                blogCards.forEach(el => {
                    gsap.set(el, { opacity: 1, y: 0 });
                });
            } else {
                // On other pages: Use ultra-fast animations
                animateOnScroll('.blog-card, .featured-post', {
                    y: isMobile ? 5 : 8, // Barely perceptible movement
                    opacity: 0,
                    duration: isMobile ? 0.2 : 0.25, // Lightning fast - almost instant
                    ease: 'power1.inOut' // Snappiest easing
                });
            }

            // Apply very subtle animations to different elements
            animateOnScroll('.value-card, .info-card', {
                y: isMobile ? 20 : 30, // Reduced movement
                opacity: 0,
                duration: isMobile ? 0.6 : 0.9, // Smoother
                ease: 'power2.out' // Smooth easing
            });

            animateOnScroll('.about-section, .highlight-box', {
                y: isMobile ? 15 : 20, // Very subtle
                opacity: 0,
                duration: isMobile ? 0.5 : 0.8,
                ease: 'power2.out'
            });

            animateOnScroll('.blog-card, .featured-post', {
                y: isMobile ? 20 : 30, // Reduced from scale to y-movement
                opacity: 0,
                duration: isMobile ? 0.6 : 0.9,
                ease: 'power2.out' // Consistent smooth easing
            });

            animateOnScroll('.stat-item', {
                y: isMobile ? 15 : 25, // Changed from scale to y-movement
                opacity: 0,
                duration: isMobile ? 0.5 : 0.8,
                ease: 'power2.out'
            });
        } else {
            this.initFallbackScrollAnimations();
        }
    }

    initFallbackScrollAnimations() {
        // Detect if mobile device
        const isMobile = window.innerWidth <= 768;
        const isBlogPage = window.location.pathname.includes('/blog');
        
        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (prefersReducedMotion) {
            // Show all elements immediately if reduced motion is preferred
            const allElements = document.querySelectorAll(
                '.value-card, .info-card, .blog-card, .about-section, .highlight-box, .stat-item'
            );
            allElements.forEach(el => {
                el.style.opacity = '1';
                el.style.transform = 'none';
            });
            return;
        }
        
        // On blog page: show blog cards instantly for performance
        if (isBlogPage) {
            const blogCards = document.querySelectorAll('.blog-card, .featured-post');
            blogCards.forEach(el => {
                el.style.opacity = '1';
            });
        } else {
            // Fallback using Intersection Observer with ultra-fast animations for blog cards
            const blogCardObserverOptions = {
                threshold: isMobile ? 0.1 : 0.2, // Earlier trigger
                rootMargin: isMobile ? '0px 0px -10px 0px' : '0px 0px -20px 0px'
            };

            const blogCardObserver = new IntersectionObserver((entries) => {
                entries.forEach((entry, index) => {
                    if (entry.isIntersecting) {
                        // Ultra-fast animation for blog cards
                        const animationDuration = isMobile ? '0.35s' : '0.45s';
                        const delay = isMobile ? index * 0.01 : index * 0.02;
                        entry.target.style.animation = `fadeInUp ${animationDuration} ease forwards`;
                        entry.target.style.animationDelay = `${delay}s`;
                        blogCardObserver.unobserve(entry.target);
                    }
                });
            }, blogCardObserverOptions);

            // Observe blog cards with faster animation
            const blogCards = document.querySelectorAll('.blog-card, .featured-post');
            blogCards.forEach(el => {
                el.style.opacity = '0';
                blogCardObserver.observe(el);
            });
        }

        // Standard animation speed for other elements
        const standardObserverOptions = {
            threshold: isMobile ? 0.08 : 0.15,
            rootMargin: isMobile ? '0px 0px -30px 0px' : '0px 0px -60px 0px'
        };

        const standardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    const animationDuration = isMobile ? '0.6s' : '0.9s';
                    const delay = isMobile ? index * 0.03 : index * 0.06;
                    entry.target.style.animation = `fadeInUp ${animationDuration} ease forwards`;
                    entry.target.style.animationDelay = `${delay}s`;
                    standardObserver.unobserve(entry.target);
                }
            });
        }, standardObserverOptions);

        // Observe other elements
        const elementsToAnimate = document.querySelectorAll(
            '.value-card, .info-card, .about-section, .highlight-box, .stat-item'
        );
        
        elementsToAnimate.forEach(el => {
            el.style.opacity = '0';
            standardObserver.observe(el);
        });

        // Add fadeInUp keyframes if not already present
        if (!document.querySelector('style[data-theme-animation-css]')) {
            const style = document.createElement('style');
            style.setAttribute('data-theme-animation-css', 'true');
            style.textContent = `
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(12px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
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
