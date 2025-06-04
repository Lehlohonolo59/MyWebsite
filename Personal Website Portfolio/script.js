/**
 * Smooth scrolling function to navigate to specific sections of the page
 * @param {string} elementSelector - CSS selector for the target element (e.g., '#home', '#skills-education')
 */
function scrollToElement(elementSelector) {
    const element = document.querySelector(elementSelector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' }); // block: 'start' aligns the top of the element to the top of the viewport
    }
}

/**
 * Wait for the DOM to be fully loaded before setting up event listeners
 */
document.addEventListener('DOMContentLoaded', function() {
    // Get references to navigation link elements by their new IDs
    const navHome = document.getElementById("navHome");
    const navSkillsEducation = document.getElementById("navSkillsEducation");
    const navExperience = document.getElementById("navExperience");
    const navCertificates = document.getElementById("navCertificates");
    const navProjects = document.getElementById("navProjects");
    const navContact = document.getElementById("navContact");

    // NEW: Get references for mobile menu toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');

    // NEW: Toggle mobile navigation on hamburger icon click
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Add event listeners for each navigation link
    if (navHome) {
        navHome.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior
            scrollToElement('#home'); // Scroll to the home section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    if (navSkillsEducation) {
        navSkillsEducation.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('#skills-education'); // Scroll to the skills and education section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    if (navExperience) {
        navExperience.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('#experience-section'); // Scroll to the experience section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    if (navCertificates) {
        navCertificates.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('#certifications-section'); // Scroll to the certifications section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    if (navProjects) {
        navProjects.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('#projects-section'); // Scroll to the key projects section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    if (navContact) {
        navContact.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToElement('#contact-section'); // Scroll to the contact section
            // NEW: Close menu if open after clicking a link
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        });
    }

    // Add smooth scrolling for all internal hash links (e.g., href="#top") - kept for robustness
    const allLinks = document.querySelectorAll('a[href^="#"]');
    allLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // If it's just a hash, scroll to top
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer options for animation
    const observerOptions = {
        threshold: 0.1, // Trigger when 10% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Reduce viewport bottom margin to trigger earlier
    };

    // Create an Intersection Observer to animate elements on scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Apply animation when element enters viewport
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            } else {
                // Optional: reset animation when element leaves viewport
                // entry.target.style.opacity = '0';
                // entry.target.style.transform = 'translateY(20px)';
            }
        });
    }, observerOptions);

    // Observe sections for animation
    // Ensure these selectors correctly target the sections you want to animate
    const sectionsToAnimate = document.querySelectorAll('.Skill, .Education, .experience, .certifications, .training');
    sectionsToAnimate.forEach(section => {
        // Set initial state for animation (hidden and slightly offset)
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Start observing the section
        observer.observe(section);
    });

    // Add click tracking for CV download button
    const cvButton = document.querySelector('.btn');
    if (cvButton) {
        cvButton.addEventListener('click', function() {
            console.log('CV download initiated');
            // TODO: Add actual analytics tracking here if needed (e.g., Google Analytics event)
        });
    }

    // Add hover effects for certification cards
    const certItems = document.querySelectorAll('.cert-item');
    certItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)'; // Lift element on hover
            this.style.transition = 'transform 0.3s ease'; // Smooth transition
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)'; // Return to original position
        });
    });

    // Create and manage scroll-to-top button
    let scrollToTopButton = document.createElement('button');
    scrollToTopButton.innerHTML = '↑'; // Up arrow character
    // Inline styles for the scroll-to-top button
    scrollToTopButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #037dbe;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        opacity: 0; /* Initially hidden */
        visibility: hidden; /* Prevent interaction when hidden */
        transition: all 0.3s ease; /* Smooth transition for visibility */
        z-index: 1000; /* Ensure it's above other content */
    `;
    
    document.body.appendChild(scrollToTopButton); // Add button to the body

    // Show/hide scroll-to-top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { // Show button after scrolling down 300px
            scrollToTopButton.style.opacity = '1';
            scrollToTopButton.style.visibility = 'visible';
        } else {
            scrollToTopButton.style.opacity = '0';
            scrollToTopButton.style.visibility = 'hidden';
        }
    });

    // Scroll to top when button is clicked
    scrollToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });
});

/**
 * Handle mobile navigation toggle (if needed in future).
 * This function is not currently called in the HTML, but kept for future expansion.
 */
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active'); // Toggle 'active' class for mobile menu
}

/**
 * Copy email to clipboard functionality.
 * This function is not currently called in the HTML, consider adding an email icon/link to call it.
 */
function copyEmail() {
    const email = 'hlonisethibe59@gmail.com';
    navigator.clipboard.writeText(email).then(function() {
        // Show a temporary notification
        const notification = document.createElement('div');
        notification.textContent = 'Email copied to clipboard!';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Fade in notification
        setTimeout(() => {
            notification.style.opacity = '1';
        }, 10);
        
        // Fade out and remove notification after 2 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300); // Allow fade-out transition before removal
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy email: ', err);
        // Optionally, show an error notification to the user
    });
}
