document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu functionality
    initMobileMenu();
    
    // Header scroll functionality
    initHeaderScroll();
    
    // Animation on scroll
    initScrollAnimations();
    
    // Window resize handler
    initResizeHandler();
});

// Mobile menu functionality
function initMobileMenu() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
            this.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            document.body.classList.toggle('menu-open');
        });
    }
    
    // Close menu when clicking overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            if (navToggle) {
                navToggle.setAttribute('aria-expanded', 'false');
            }
            document.body.classList.remove('menu-open');
        });
    }
    
    // Handle dropdown menus on mobile
    if (window.innerWidth <= 991) {
    dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (e.target.closest('a') && this.querySelector('.dropdown-menu')) {
                    e.preventDefault();
                    
                    // Close other open dropdowns
                    const allDropdownMenus = document.querySelectorAll('.dropdown-menu');
                    allDropdownMenus.forEach(menu => {
                        if (menu !== this.querySelector('.dropdown-menu')) {
                            menu.classList.remove('show');
                        }
                    });
                    
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    }
}

// Header scroll functionality
function initHeaderScroll() {
    const header = document.querySelector('header');
    
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Initialize header state on page load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
}

// Animation on scroll
function initScrollAnimations() {
    const animateItems = document.querySelectorAll('.fade-in, .stagger-item');
    
    function checkScroll() {
        animateItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            const itemBottom = item.getBoundingClientRect().bottom;
            
            // Only animate elements in viewport
            if (itemTop < window.innerHeight * 0.85 && itemBottom > 0) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial check for items in view
    checkScroll();
    
    // Check for items on scroll
    window.addEventListener('scroll', checkScroll);
}

// Window resize handler
function initResizeHandler() {
    window.addEventListener('resize', function() {
        const navMenu = document.querySelector('.nav-menu');
        const menuOverlay = document.querySelector('.menu-overlay');
        const navToggle = document.querySelector('.nav-toggle');
        
        // Reset mobile menu when resizing above breakpoint
        if (window.innerWidth > 991) {
            if (navMenu) navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            }
        });
    }

// Add class to handle RTL styles when in Arabic mode
function toggleLanguage() {
    const htmlTag = document.documentElement;
    const isRTL = htmlTag.getAttribute('dir') === 'rtl';
    
    if (isRTL) {
        htmlTag.setAttribute('dir', 'ltr');
        htmlTag.setAttribute('lang', 'en');
    } else {
        htmlTag.setAttribute('dir', 'rtl');
        htmlTag.setAttribute('lang', 'ar');
    }
    
    document.body.classList.toggle('rtl-layout');
}

// Add event listener to language toggle buttons
document.addEventListener('DOMContentLoaded', function() {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleLanguage();
            
            // Toggle button text
            const buttons = document.querySelectorAll('.language-btn');
            buttons.forEach(btn => {
                btn.textContent = btn.textContent === 'العربية' ? 'English' : 'العربية';
            });
        });
    });
}); 