// Contact Form Validation and Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('span');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const modalBtns = document.querySelectorAll('.modal-btn');

    // Form validation
    function validateForm() {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        // Validate name (at least 2 characters)
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }

        // Validate email
        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        // Validate subject (at least 3 characters)
        if (subjectInput.value.trim().length < 3) {
            showError(subjectInput, 'Subject must be at least 3 characters');
            isValid = false;
        }

        // Validate message (at least 10 characters)
        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    // Show error message
    function showError(input, message) {
        const errorEl = input.nextElementSibling;
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        input.style.borderColor = '#ff6b6b';
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Handle form inputs focus events
    const formInputs = document.querySelectorAll('.form-control input, .form-control textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--main-color)';
        });

        input.addEventListener('blur', function () {
            if (this.value.trim() === '') {
                this.style.borderColor = 'transparent';
            }
        });

        input.addEventListener('input', function () {
            // Reset error state when user starts typing
            this.style.borderColor = 'var(--main-color)';
            const error = this.nextElementSibling;
            if (error && error.classList.contains('error-message')) {
                error.style.display = 'none';
            }
        });
    });

    // Form submission handler
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Validate form first
        if (!validateForm()) return;

        // Show loading state
        submitBtnText.textContent = 'Sending...';
        loadingSpinner.style.display = 'block';
        submitBtn.disabled = true;

        try {
            // FormSubmit.co already handles the form submission through the action attribute
            // But we'll add a fetch request to handle it programmatically for better UX
            const formData = new FormData(contactForm);

            const response = await fetch('https://formsubmit.co/eminem13981398@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                // Show success modal
                showModal(successModal);
                // Reset form
                contactForm.reset();
                formInputs.forEach(input => {
                    input.style.borderColor = 'transparent';
                });
            } else {
                // Show error modal
                showModal(errorModal);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showModal(errorModal);
        } finally {
            // Reset button state
            submitBtnText.textContent = 'Send Message';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

    // Modal handling functions
    function showModal(modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }

    // Close modal event listeners
    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    modalBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                closeModal(modal);
            });
        }
    });
});