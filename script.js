// DOM Elements
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const showRegisterBtn = document.getElementById('showRegister');
const showLoginBtn = document.getElementById('showLogin');
const togglePasswordBtns = document.querySelectorAll('.toggle-password');
const authForms = document.querySelectorAll('.auth-form');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeEventListeners();
    initializePasswordToggle();
    initializeFormValidation();
});

// Event Listeners
function initializeEventListeners() {
    // Form switching
    showRegisterBtn.addEventListener('click', function(e) {
        e.preventDefault();
        switchToRegister();
    });

    showLoginBtn.addEventListener('click', function(e) {
        e.preventDefault();
        switchToLogin();
    });

    // Social login buttons
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            handleSocialLogin(this.classList.contains('google') ? 'google' : 'microsoft');
        });
    });

    // Form submissions
    authForms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });
}

// Form Switching Functions
function switchToRegister() {
    loginForm.classList.add('hidden');
    registerForm.classList.remove('hidden');
    registerForm.classList.add('fade-in');
    
    // Update page title
    document.title = 'Student Portal - Register';
}

function switchToLogin() {
    registerForm.classList.add('hidden');
    loginForm.classList.remove('hidden');
    loginForm.classList.add('fade-in');
    
    // Update page title
    document.title = 'Student Portal - Login';
}

// Password Toggle Functionality
function initializePasswordToggle() {
    togglePasswordBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            
            input.setAttribute('type', type);
            
            // Toggle icon
            if (type === 'text') {
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            clearFieldError(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const placeholder = field.placeholder.toLowerCase();
    
    // Remove existing error styling
    clearFieldError(field);
    
    // Required field validation
    if (!value) {
        showFieldError(field, `${field.placeholder} is required`);
        return false;
    }
    
    // Email validation
    if (type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Password validation
    if (type === 'password' && placeholder.includes('password') && !placeholder.includes('confirm')) {
        if (value.length < 8) {
            showFieldError(field, 'Password must be at least 8 characters long');
            return false;
        }
        
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
            showFieldError(field, 'Password must contain uppercase, lowercase, and number');
            return false;
        }
    }
    
    // Confirm password validation
    if (placeholder.includes('confirm password')) {
        const passwordField = field.closest('form').querySelector('input[placeholder="Password"]');
        if (value !== passwordField.value) {
            showFieldError(field, 'Passwords do not match');
            return false;
        }
    }
    
    // Student ID validation
    if (placeholder.includes('student id')) {
        if (!/^[A-Za-z0-9]{6,12}$/.test(value)) {
            showFieldError(field, 'Student ID must be 6-12 alphanumeric characters');
            return false;
        }
    }
    
    return true;
}

function showFieldError(field, message) {
    field.style.borderColor = '#dc3545';
    field.style.background = '#fff5f5';
    
    // Remove existing error message
    const existingError = field.parentElement.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#dc3545';
    errorDiv.style.fontSize = '0.8rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;
    
    field.parentElement.appendChild(errorDiv);
}

function clearFieldError(field) {
    field.style.borderColor = '#e1e5e9';
    field.style.background = '#f8f9fa';
    
    const errorMessage = field.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Form Submission Handler
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const isLogin = form.closest('#loginForm') !== null;
    
    // Validate all fields
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    // Check terms agreement for registration
    if (!isLogin) {
        const termsCheckbox = form.querySelector('input[type="checkbox"][required]');
        if (!termsCheckbox.checked) {
            showMessage('Please agree to the Terms & Conditions', 'error');
            isValid = false;
        }
    }
    
    if (!isValid) {
        return;
    }
    
    // Show loading state
    const submitBtn = form.querySelector('.auth-btn');
    const originalText = submitBtn.textContent;
    submitBtn.classList.add('loading');
    submitBtn.textContent = '';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        if (isLogin) {
            handleLogin(formData);
        } else {
            handleRegister(formData);
        }
    }, 2000);
}

// Authentication Handlers
function handleLogin(formData) {
    const email = formData.get('email');
    
    // Simulate successful login
    showMessage('Login successful! Redirecting to dashboard...', 'success');
    
    setTimeout(() => {
        // In a real application, you would redirect to the dashboard
        console.log('Redirecting to student dashboard...');
        // window.location.href = '/dashboard';
    }, 1500);
}

function handleRegister(formData) {
    // Simulate successful registration
    showMessage('Account created successfully! Please check your email for verification.', 'success');
    
    setTimeout(() => {
        switchToLogin();
        showMessage('Please sign in with your new account', 'success');
    }, 2000);
}

function handleSocialLogin(provider) {
    showMessage(`Redirecting to ${provider} authentication...`, 'success');
    
    // In a real application, you would redirect to the OAuth provider
    setTimeout(() => {
        console.log(`Authenticating with ${provider}...`);
        // window.location.href = `/auth/${provider}`;
    }, 1000);
}

// Utility Functions
function showMessage(text, type = 'success') {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = text;
    
    // Insert message at the top of the active form
    const activeForm = document.querySelector('.form-wrapper:not(.hidden)');
    const form = activeForm.querySelector('.auth-form');
    form.parentNode.insertBefore(messageDiv, form);
    
    // Auto-remove success messages after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Keyboard Navigation Enhancement
document.addEventListener('keydown', function(e) {
    // Enter key on social buttons
    if (e.key === 'Enter' && e.target.classList.contains('social-btn')) {
        e.target.click();
    }
    
    // Escape key to close messages
    if (e.key === 'Escape') {
        const messages = document.querySelectorAll('.message');
        messages.forEach(msg => msg.remove());
    }
});

// Auto-focus first input when switching forms
function focusFirstInput() {
    const activeForm = document.querySelector('.form-wrapper:not(.hidden)');
    const firstInput = activeForm.querySelector('input');
    if (firstInput) {
        firstInput.focus();
    }
}

// Enhanced form switching with focus management
const originalSwitchToRegister = switchToRegister;
const originalSwitchToLogin = switchToLogin;

switchToRegister = function() {
    originalSwitchToRegister();
    setTimeout(focusFirstInput, 100);
};

switchToLogin = function() {
    originalSwitchToLogin();
    setTimeout(focusFirstInput, 100);
};

// Local Storage for Remember Me functionality
function handleRememberMe() {
    const rememberCheckbox = document.querySelector('#loginForm input[type="checkbox"]');
    const emailInput = document.querySelector('#loginForm input[type="email"]');
    
    // Load saved email on page load
    if (localStorage.getItem('rememberedEmail')) {
        emailInput.value = localStorage.getItem('rememberedEmail');
        rememberCheckbox.checked = true;
    }
    
    // Save email when form is submitted
    document.querySelector('#loginForm').addEventListener('submit', function() {
        if (rememberCheckbox.checked) {
            localStorage.setItem('rememberedEmail', emailInput.value);
        } else {
            localStorage.removeItem('rememberedEmail');
        }
    });
}

// Initialize remember me functionality
document.addEventListener('DOMContentLoaded', handleRememberMe);

// Accessibility improvements
function enhanceAccessibility() {
    // Add ARIA labels
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        if (!input.getAttribute('aria-label')) {
            input.setAttribute('aria-label', input.placeholder);
        }
    });
    
    // Add role attributes
    const forms = document.querySelectorAll('.auth-form');
    forms.forEach(form => {
        form.setAttribute('role', 'form');
    });
    
    // Add live region for messages
    const messageContainer = document.createElement('div');
    messageContainer.setAttribute('aria-live', 'polite');
    messageContainer.setAttribute('aria-atomic', 'true');
    messageContainer.className = 'sr-only';
    document.body.appendChild(messageContainer);
}

// Initialize accessibility enhancements
document.addEventListener('DOMContentLoaded', enhanceAccessibility);

// Performance optimization - Debounce input validation
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounced validation to inputs
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('input');
    const debouncedValidation = debounce(validateField, 300);
    
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            debouncedValidation(this);
        });
    });
});