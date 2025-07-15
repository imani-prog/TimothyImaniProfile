document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Greeting based on time
    const greetingElement = document.getElementById("greeting");
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
        greetingElement.innerHTML = `Good Morning <span class="emoji">😊</span>`;
    } else if (currentHour < 18) {
        greetingElement.innerHTML = `Good Afternoon <span class="emoji">😎</span>`;
    } else {
        greetingElement.innerHTML = `Good Evening <span class="emoji">😎</span>`;
    }

    //typing effect
    new Typed(".input", {
        strings: ["Software Developer", "Database Administrator", "Data Engineer"],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true
    });

    // Theme toggle
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        const isDark = savedTheme === "dark";
        body.classList.toggle("dark-mode", isDark);
        themeToggle.textContent = isDark ? "☀" : "☾";
    }

    themeToggle.addEventListener("click", () => {
        const isDarkMode = body.classList.toggle("dark-mode");
        themeToggle.textContent = isDarkMode ? "☀" : "☾";
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });

    // Back to top
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });

    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Tools filtering functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const toolIcons = document.querySelectorAll('.tools-track img');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            
            // Filter tools based on category
            toolIcons.forEach(icon => {
                const iconCategory = icon.getAttribute('data-category');
                
                if (category === 'all' || iconCategory === category) {
                    icon.style.display = 'block';
                    icon.style.opacity = '1';
                    icon.style.transform = 'scale(1)';
                } else {
                    icon.style.opacity = '0.3';
                    icon.style.transform = 'scale(0.8)';
                    icon.style.filter = 'grayscale(100%)';
                }
            });
            
            // Add a brief animation effect
            setTimeout(() => {
                toolIcons.forEach(icon => {
                    if (category === 'all' || icon.getAttribute('data-category') === category) {
                        icon.style.filter = 'none';
                    }
                });
            }, 300);
        });
    });

    // Add progress bar effect on hover for skill levels
    toolIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            const skillLevel = icon.getAttribute('data-skill');
            console.log(`${icon.alt}: ${skillLevel}% proficiency`);
        });
    });

    // Enhanced Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    const successMessage = document.getElementById('form-success');
    const errorMessage = document.getElementById('form-error');
    const messageTextarea = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // Character count for message textarea
    if (messageTextarea && charCount) {
        messageTextarea.addEventListener('input', () => {
            const currentLength = messageTextarea.value.length;
            charCount.textContent = currentLength;
            
            if (currentLength > 450) {
                charCount.style.color = '#ef4444';
            } else if (currentLength > 400) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = '#64748b';
            }
        });
    }

    // Form validation
    function validateForm() {
        let isValid = true;
        const requiredFields = ['name', 'email', 'message'];
        
        requiredFields.forEach(fieldName => {
            const field = document.getElementById(fieldName);
            const errorElement = document.getElementById(`${fieldName}-error`);
            
            if (!field.value.trim()) {
                errorElement.textContent = `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
                field.style.borderColor = '#ef4444';
                isValid = false;
            } else {
                errorElement.textContent = '';
                field.style.borderColor = '#e5e7eb';
                
                // Email validation
                if (fieldName === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value)) {
                        errorElement.textContent = 'Please enter a valid email address';
                        field.style.borderColor = '#ef4444';
                        isValid = false;
                    }
                }
            }
        });
        
        return isValid;
    }

    // Form submission
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Validate form
            if (!validateForm()) {
                return;
            }
            
            // Show loading state
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline-flex';
            
            try {
                // Submit form to Formspree
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Success
                    successMessage.style.display = 'flex';
                    contactForm.reset();
                    if (charCount) charCount.textContent = '0';
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ 
                        behavior: 'smooth', 
                        block: 'center' 
                    });
                } else {
                    throw new Error('Form submission failed');
                }
                
            } catch (error) {
                // Error
                errorMessage.style.display = 'flex';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
        });
    }

    // Add focus effects to form fields
    const formInputs = document.querySelectorAll('.form-group input, .form-group select, .form-group textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Add animation to contact cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const contactObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe contact cards and stats
    document.querySelectorAll('.contact-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        contactObserver.observe(el);
    });
});

// Project Details Toggle Functionality
function toggleProjectDetails(button) {
    const projectDetails = button.nextElementSibling;
    const icon = button.querySelector('.expand-icon');
    
    if (projectDetails.classList.contains('expanded')) {
        // Collapse
        projectDetails.classList.remove('expanded');
        button.classList.remove('active');
        button.setAttribute('aria-expanded', 'false');
        icon.className = 'fas fa-chevron-down expand-icon';
    } else {
        // Expand
        projectDetails.classList.add('expanded');
        button.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        icon.className = 'fas fa-chevron-up expand-icon';
    }
}

// Initialize project cards animation on load
document.addEventListener('DOMContentLoaded', function() {
    // Animate project cards on scroll
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    // Observe project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        projectObserver.observe(card);
    });
});

// Service Request Modal Functionality
const serviceModal = document.getElementById('serviceModal');
const serviceRequestForm = document.getElementById('serviceRequestForm');
const serviceTypeInput = document.getElementById('serviceType');
const closeModalBtn = document.querySelector('.close');
const cancelBtn = document.querySelector('.cancel-btn');
const requestServiceBtns = document.querySelectorAll('.request-service-btn');

// Open modal when request service button is clicked
requestServiceBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        const serviceName = this.getAttribute('data-service');
        serviceTypeInput.value = serviceName;
        serviceModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    });
});

// Close modal functions
function closeModal() {
    serviceModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
    serviceRequestForm.reset(); // Clear form
}

// Close modal when X is clicked
closeModalBtn.addEventListener('click', closeModal);

// Close modal when cancel button is clicked
cancelBtn.addEventListener('click', closeModal);

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    if (event.target === serviceModal) {
        closeModal();
    }
});

// Handle form submission
serviceRequestForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(serviceRequestForm);
    const serviceData = {
        serviceType: formData.get('serviceType'),
        clientName: formData.get('clientName'),
        clientEmail: formData.get('clientEmail'),
        clientPhone: formData.get('clientPhone'),
        projectBudget: formData.get('projectBudget'),
        projectTimeline: formData.get('projectTimeline'),
        projectDescription: formData.get('projectDescription'),
        additionalInfo: formData.get('additionalInfo')
    };
    
    // Create email body
    const emailBody = `
Service Request Details:
------------------------
Service Type: ${serviceData.serviceType}
Name: ${serviceData.clientName}
Email: ${serviceData.clientEmail}
Phone: ${serviceData.clientPhone || 'Not provided'}
Budget: ${serviceData.projectBudget || 'Not specified'}
Timeline: ${serviceData.projectTimeline || 'Not specified'}

Project Description:
${serviceData.projectDescription}

Additional Information:
${serviceData.additionalInfo || 'None'}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:timothyimani9@gmail.com?subject=Service Request - ${serviceData.serviceType}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    alert('Thank you for your service request! Your email client will open to send the request.');
    
    // Close modal
    closeModal();
});

// Add escape key functionality
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && serviceModal.style.display === 'block') {
        closeModal();
    }
});
