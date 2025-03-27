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
            
            // Toggle aria-expanded attribute for accessibility
            const expanded = navMenu.classList.contains('active');
            navToggle.setAttribute('aria-expanded', expanded);
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
        if (window.scrollY > 30) {
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
        
        // Reset mobile menu when resizing above breakpoint
        if (window.innerWidth > 991) {
            if (navMenu) navMenu.classList.remove('active');
            if (menuOverlay) menuOverlay.classList.remove('active');
            
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
        }
    });
}

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
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Dropdown Menu on Mobile
    const dropdowns = document.querySelectorAll('.dropdown');
    
    if (window.innerWidth <= 991) {
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(e) {
                if (e.target.closest('a') && this.querySelector('.dropdown-menu')) {
                    e.preventDefault();
                    const dropdownMenu = this.querySelector('.dropdown-menu');
                    dropdownMenu.classList.toggle('show');
                }
            });
        });
    }
    
    // Header scroll effect
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Animation on scroll
    const animateItems = document.querySelectorAll('.fade-in, .stagger-item');
    
    function checkScroll() {
        animateItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            if (itemTop < window.innerHeight * 0.8) {
                item.classList.add('active');
            }
        });
    }
    
    // Initial check for items in view
    checkScroll();
    
    // Check for items on scroll
    window.addEventListener('scroll', checkScroll);
}); 