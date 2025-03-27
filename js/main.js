document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('mobile-menu-active');
            // Transform hamburger to X
            const spans = this.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
    
    // Mobile Dropdown Toggles
    const dropdowns = document.querySelectorAll('.main-nav .dropdown');
    
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        if (window.innerWidth <= 991 && link) {
            link.addEventListener('click', function(e) {
                if (!this.parentNode.classList.contains('dropdown-active')) {
                    e.preventDefault();
                    
                    // Close other open dropdowns
                    dropdowns.forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('dropdown-active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('dropdown-active');
                }
            });
        }
    });
    
    // Language Toggle
    const languageToggle = document.getElementById('language-toggle');
    const footerLanguageToggle = document.getElementById('footer-language-toggle');
    
    function toggleLanguage() {
        // This would normally switch the language by redirecting to an Arabic version
        // or by loading different content through AJAX
        // For now, we'll just toggle the text
        if (this.textContent === 'العربية') {
            this.textContent = 'English';
            document.dir = 'rtl'; // Right-to-left for Arabic
            document.documentElement.lang = 'ar';
        } else {
            this.textContent = 'العربية';
            document.dir = 'ltr'; // Left-to-right for English
            document.documentElement.lang = 'en';
        }
        
        // Sync the other language toggle
        if (this.id === 'language-toggle' && footerLanguageToggle) {
            footerLanguageToggle.textContent = this.textContent;
        } else if (this.id === 'footer-language-toggle' && languageToggle) {
            languageToggle.textContent = this.textContent;
        }
    }
    
    if (languageToggle) {
        languageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage.call(this);
        });
    }
    
    if (footerLanguageToggle) {
        footerLanguageToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleLanguage.call(this);
        });
    }
    
    // Fixed Header Animation
    const header = document.querySelector('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down & past the threshold
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up or at the top
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip language toggle and other non-anchor links
            if (targetId === '#' || this.classList.contains('language-selector')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Form Validation
    const contactForms = document.querySelectorAll('form.contact-form');
    
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value)) {
                    isValid = false;
                    emailField.classList.add('error');
                }
            }
            
            if (!isValid) {
                e.preventDefault();
                
                // Display error message
                const errorMessage = form.querySelector('.error-message') || document.createElement('div');
                errorMessage.className = 'error-message';
                errorMessage.textContent = 'Please fill in all required fields correctly.';
                
                if (!form.querySelector('.error-message')) {
                    form.prepend(errorMessage);
                }
            }
        });
    });
    
    // Animate elements when they enter the viewport
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Is element in viewport?
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('animated');
            }
        });
    }
    
    // Run on initial load
    checkIfInView();
    
    // Run on scroll
    window.addEventListener('scroll', checkIfInView);
});

// Add class to handle RTL styles when in Arabic mode
function applyRTLStyles() {
    if (document.dir === 'rtl') {
        document.body.classList.add('rtl-layout');
    } else {
        document.body.classList.remove('rtl-layout');
    }
}

// Call this function whenever the language changes
window.addEventListener('languagechange', applyRTLStyles);

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navbar functionality
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const header = document.querySelector('header');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.classList.toggle('active');
        });
    }
    
    // Handle dropdowns on mobile
    if (window.innerWidth < 992) {
        dropdowns.forEach(dropdown => {
            const link = dropdown.querySelector('a');
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const menu = this.nextElementSibling;
                menu.classList.toggle('show');
            });
        });
    }
    
    // Shrink header on scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== '#') {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - headerHeight;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Language toggle functionality
    const languageBtn = document.querySelector('.language-btn');
    if (languageBtn) {
        languageBtn.addEventListener('click', function() {
            // Add language switching logic here
            const isEnglish = this.textContent === 'العربية';
            
            if (isEnglish) {
                // Switch to Arabic
                this.textContent = 'English';
                document.documentElement.classList.add('rtl-layout');
            } else {
                // Switch to English
                this.textContent = 'العربية';
                document.documentElement.classList.remove('rtl-layout');
            }
        });
    }
    
    // Scroll animations
    const fadeElements = document.querySelectorAll('.fade-in');
    const staggerItems = document.querySelectorAll('.stagger-item');
    
    // Initial check for elements in viewport on page load
    checkElements(fadeElements);
    checkElements(staggerItems);
    
    // Check elements on scroll
    window.addEventListener('scroll', function() {
        checkElements(fadeElements);
        checkElements(staggerItems);
    });
    
    function checkElements(elements) {
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            const windowHeight = window.innerHeight;
            
            // Element is in viewport
            if (elementTop < windowHeight * 0.85 && elementBottom > 0) {
                element.classList.add('active');
            }
        });
    }
    
    // Add scroll down arrow functionality
    const scrollDown = document.querySelector('.scroll-down');
    if (scrollDown) {
        scrollDown.addEventListener('click', function() {
            const targetSection = document.querySelector('.intro');
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = targetPosition - headerHeight;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Form validation
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const formGroups = this.querySelectorAll('.form-group');
            
            formGroups.forEach(group => {
                const input = group.querySelector('input, textarea');
                const required = input.hasAttribute('required');
                
                if (required && !input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else if (input.type === 'email' && input.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(input.value.trim())) {
                        isValid = false;
                        input.classList.add('error');
                    } else {
                        input.classList.remove('error');
                    }
                } else {
                    input.classList.remove('error');
                }
            });
            
            if (isValid) {
                // Form is valid, you can submit it or show success message
                alert('Form submitted successfully!');
                contactForm.reset();
            } else {
                // Show error message
                const errorMessage = document.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'block';
                } else {
                    const message = document.createElement('div');
                    message.className = 'error-message';
                    message.textContent = 'Please fill all required fields correctly.';
                    contactForm.prepend(message);
                }
            }
        });
        
        // Remove error class on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.classList.remove('error');
                const errorMessage = document.querySelector('.error-message');
                if (errorMessage) {
                    errorMessage.style.display = 'none';
                }
            });
        });
    }
}); 