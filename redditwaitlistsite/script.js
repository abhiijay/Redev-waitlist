// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const waitlistForm = document.getElementById('waitlistForm');
    const successMessage = document.getElementById('successMessage');
    const submitButton = document.querySelector('.submit-button');
    
    // Form submission handler
    waitlistForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        
        // Basic validation
        if (!fullName || !email) {
            showError('Please fill in all fields.');
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Please enter a valid email address.');
            return;
        }
        
        // Show loading state
        submitButton.disabled = true;
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Joining...';
        
        // Simulate API call (replace with actual backend integration)
        setTimeout(() => {
            // Store in localStorage for demo purposes
            const waitlistEntry = {
                name: fullName,
                email: email,
                timestamp: new Date().toISOString()
            };
            
            // Get existing entries or create new array
            const existingEntries = JSON.parse(localStorage.getItem('redevWaitlist') || '[]');
            existingEntries.push(waitlistEntry);
            localStorage.setItem('redevWaitlist', JSON.stringify(existingEntries));
            
            // Show success message
            showSuccess();
            
            // Reset form
            waitlistForm.reset();
            
            // Reset button
            submitButton.disabled = false;
            submitButton.innerHTML = '<span>Join the Waitlist</span><i class="fas fa-arrow-right"></i>';
            
        }, 1500);
    });
    
    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Show error message
    function showError(message) {
        // Remove existing error message
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Create error message element
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-circle"></i>
            <span>${message}</span>
        `;
        
        // Insert after form
        waitlistForm.parentNode.insertBefore(errorDiv, waitlistForm.nextSibling);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 5000);
    }
    
    // Show success message
    function showSuccess() {
        successMessage.style.display = 'flex';
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // Add hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.submit-button, .feature-card');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (this.classList.contains('submit-button')) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        element.addEventListener('mouseleave', function() {
            if (this.classList.contains('submit-button')) {
                this.style.transform = 'translateY(0)';
            }
        });
    });
    
    // Add parallax effect to background elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const backgroundElements = document.querySelectorAll('.bg-element');
        
        backgroundElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            element.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
    
    // Add input focus effects
    const inputs = document.querySelectorAll('input[type="text"], input[type="email"]');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.style.transform = 'scale(1.02)';
        });
        
        input.addEventListener('blur', function() {
            this.parentElement.style.transform = 'scale(1)';
        });
    });
    
    // Add CSS for error message styling
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            background: linear-gradient(135deg, #ff5252, #ff1744);
            color: white;
            padding: 1rem;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-weight: 500;
            margin-top: 1rem;
            box-shadow: 0 4px 12px rgba(255, 23, 68, 0.3);
            animation: slideIn 0.5s ease;
        }
        
        .error-message i {
            font-size: 1.1rem;
        }
        
        .input-wrapper {
            transition: transform 0.3s ease;
        }
        
        .submit-button {
            transition: transform 0.3s ease;
        }
    `;
    document.head.appendChild(style);
    
    // Add analytics tracking (demo purposes)
    function trackEvent(eventName, properties = {}) {
        console.log('Analytics Event:', eventName, properties);
        // Replace with actual analytics service (Google Analytics, Mixpanel, etc.)
    }
    
    // Track page view
    trackEvent('page_view', {
        page: 'redev_waitlist_landing',
        timestamp: new Date().toISOString()
    });
    
    // Track form interactions
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            trackEvent('form_field_focus', {
                field: input.id,
                page: 'redev_waitlist_landing'
            });
        });
    });
    
    // Track feature card interactions
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            const featureName = card.querySelector('h3').textContent;
            trackEvent('feature_card_click', {
                feature: featureName,
                position: index + 1,
                page: 'redev_waitlist_landing'
            });
        });
    });
    
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Submit form with Enter key
        if (e.key === 'Enter' && (e.target.type === 'text' || e.target.type === 'email')) {
            const form = e.target.closest('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
    
    // Add loading animation for better UX
    window.addEventListener('load', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease';
        
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    });
    
    // Add smooth scroll to features section when form is submitted
    function scrollToFeatures() {
        const featuresSection = document.querySelector('.features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
    
    // Scroll to features after successful form submission
    const originalShowSuccess = showSuccess;
    showSuccess = function() {
        originalShowSuccess();
        setTimeout(scrollToFeatures, 1000);
    };
}); 