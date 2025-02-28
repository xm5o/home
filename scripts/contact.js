document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const submitBtnText = submitBtn.querySelector('span');
    const loadingSpinner = submitBtn.querySelector('.loading-spinner');
    const successModal = document.getElementById('successModal');
    const errorModal = document.getElementById('errorModal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const modalBtns = document.querySelectorAll('.modal-btn');

    function validateForm() {
        let isValid = true;
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');

        document.querySelectorAll('.error-message').forEach(error => {
            error.style.display = 'none';
        });

        if (nameInput.value.trim().length < 2) {
            showError(nameInput, 'Name must be at least 2 characters');
            isValid = false;
        }

        if (!isValidEmail(emailInput.value)) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }

        if (subjectInput.value.trim().length < 3) {
            showError(subjectInput, 'Subject must be at least 3 characters');
            isValid = false;
        }

        if (messageInput.value.trim().length < 10) {
            showError(messageInput, 'Message must be at least 10 characters');
            isValid = false;
        }

        return isValid;
    }

    function showError(input, message) {
        const errorEl = input.nextElementSibling;
        errorEl.textContent = message;
        errorEl.style.display = 'block';
        input.style.borderColor = '#ff6b6b';
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

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
            this.style.borderColor = 'var(--main-color)';
            const error = this.nextElementSibling;
            if (error && error.classList.contains('error-message')) {
                error.style.display = 'none';
            }
        });
    });

    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        if (!validateForm()) return;

        submitBtnText.textContent = 'Sending...';
        loadingSpinner.style.display = 'block';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(contactForm);

            const response = await fetch('https://formsubmit.co/immortal.web.dev.contact@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showModal(successModal);
                contactForm.reset();
                formInputs.forEach(input => {
                    input.style.borderColor = 'transparent';
                });
            } else {
                showModal(errorModal);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            showModal(errorModal);
        } finally {
            submitBtnText.textContent = 'Send Message';
            loadingSpinner.style.display = 'none';
            submitBtn.disabled = false;
        }
    });

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

    window.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            document.querySelectorAll('.modal.show').forEach(modal => {
                closeModal(modal);
            });
        }
    });
});