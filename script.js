// Navigation smooth scroll
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
        
        // Update active link
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});

// Update active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Toggle Show More Options
function toggleMoreOptions() {
    const moreOptions = document.getElementById('moreOptions');
    const button = document.querySelector('.btn-show-more');
    
    moreOptions.style.display = moreOptions.style.display === 'none' ? 'block' : 'none';
    button.classList.toggle('active');
}

// Form Validation
const appointmentForm = document.getElementById('appointmentForm');

function validateForm() {
    let isValid = true;
    
    // Clear previous errors
    document.querySelectorAll('.error-message').forEach(msg => {
        msg.classList.remove('show');
    });
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    // Validate name
    const nameInput = document.getElementById('name');
    const nameValue = nameInput.value.trim();
    if (!nameValue) {
        showError('nameError', 'Please enter your full name');
        isValid = false;
    } else if (nameValue.length < 3) {
        showError('nameError', 'Name must be at least 3 characters');
        isValid = false;
    }
    
    // Validate phone
    const phoneInput = document.getElementById('phone');
    const phoneValue = phoneInput.value.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
    if (!phoneValue) {
        showError('phoneError', 'Please enter your phone number');
        isValid = false;
    } else if (!phoneRegex.test(phoneValue.replace(/\s/g, ''))) {
        showError('phoneError', 'Please enter a valid phone number');
        isValid = false;
    }
    
    // Validate appointment time
    const timeInput = document.getElementById('appointmentTime');
    const timeValue = timeInput.value;
    if (!timeValue) {
        showError('timeError', 'Please select an appointment time');
        isValid = false;
    } else {
        const selectedTime = new Date(timeValue);
        const now = new Date();
        if (selectedTime <= now) {
            showError('timeError', 'Please select a future appointment time');
            isValid = false;
        }
    }
    
    return isValid;
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const formGroup = errorElement.closest('.form-group');
    errorElement.textContent = message;
    errorElement.classList.add('show');
    formGroup.classList.add('error');
}

// Format appointment data for WhatsApp
function formatAppointmentData() {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const appointmentTime = document.getElementById('appointmentTime').value;
    const age = document.getElementById('age').value || 'Not specified';
    const problem = document.getElementById('problem').value || 'Not specified';
    const address = document.getElementById('address').value || 'Not specified';
    
    // Format date and time
    const dateObj = new Date(appointmentTime);
    const formattedDate = dateObj.toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const formattedTime = dateObj.toLocaleTimeString('en-IN', {
        hour: '2-digit',
        minute: '2-digit'
    });
    
    // Create appointment details message
    const message = `*Dr. Niyaz Ahmed Skin Care Clinic - Appointment Request*\n\n*Patient Details:*\nName: ${name}\nPhone: ${phone}\nAge: ${age}\n\n*Appointment Details:*\nDate: ${formattedDate}\nTime: ${formattedTime}\nProblem/Concern: ${problem}\nAddress: ${address}\n\n*This is an automated appointment request. The clinic will confirm your booking shortly.*`;
    
    return message;
}

// Send to WhatsApp
function sendToWhatsApp(message) {
    const whatsappNumber = '919303214285'; // Dr. Niyaz Ahmed's WhatsApp number
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new window
    window.open(whatsappUrl, '_blank');
}

// Form submission
appointmentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    if (validateForm()) {
        // Format the message
        const message = formatAppointmentData();
        
        // Send to WhatsApp
        sendToWhatsApp(message);
        
        // Show success modal
        showSuccessModal();
        
        // Reset form
        appointmentForm.reset();
        document.getElementById('moreOptions').style.display = 'none';
        document.querySelector('.btn-show-more').classList.remove('active');
    }
});

// Success Modal Functions
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.add('show');
}

function closeSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        closeSuccessModal();
    }
});

// Set minimum date to today for appointment time input
const appointmentTimeInput = document.getElementById('appointmentTime');
const now = new Date();
now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
const minDateTime = now.toISOString().slice(0, 16);
appointmentTimeInput.min = minDateTime;

// Restrict age input
document.getElementById('age').addEventListener('input', function() {
    if (this.value < 0) this.value = '';
    if (this.value > 120) this.value = 120;
});

// Add animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    
    // Animate elements on load
    const elementsToAnimate = document.querySelectorAll('.about-card, .service-card, .testimonial-card, .contact-card');
    elementsToAnimate.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.animation = `fadeInUp 0.8s ease-out ${index * 0.1}s forwards`;
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .service-card, .testimonial-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Prevent form submission on Enter for optional fields
document.querySelectorAll('.more-options input, .more-options select, .more-options textarea').forEach(el => {
    el.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && el.tagName !== 'TEXTAREA') {
            e.preventDefault();
        }
    });
});