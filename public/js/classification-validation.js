// Client-side validation for add classification form
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addClassificationForm');

    if (form) {
        const classificationInput = document.getElementById('classification_name');

        // Validate on form submission
        form.addEventListener('submit', function (event) {
            const value = classificationInput.value.trim();
            const pattern = /^[a-zA-Z0-9]+$/;

            if (!value) {
                event.preventDefault();
                showError('Classification name is required.');
                return false;
            }

            if (!pattern.test(value)) {
                event.preventDefault();
                showError('Classification name must be alphanumeric with no spaces or special characters.');
                return false;
            }

            // Clear any existing errors
            clearError();
        });

        // Real-time validation on blur
        classificationInput.addEventListener('blur', function () {
            const value = this.value.trim();
            const pattern = /^[a-zA-Z0-9]+$/;

            if (value && !pattern.test(value)) {
                showFieldError(this, 'Classification name must be alphanumeric with no spaces or special characters.');
            } else {
                clearFieldError(this);
            }
        });

        // Real-time validation on input
        classificationInput.addEventListener('input', function () {
            const value = this.value.trim();
            const pattern = /^[a-zA-Z0-9]+$/;

            if (value && !pattern.test(value)) {
                this.setCustomValidity('Classification name must be alphanumeric with no spaces or special characters.');
            } else {
                this.setCustomValidity('');
            }
        });
    }
});

function showError(message) {
    let errorContainer = document.querySelector('.client-errors');
    if (!errorContainer) {
        errorContainer = document.createElement('div');
        errorContainer.className = 'client-errors';
        const form = document.getElementById('addClassificationForm');
        form.parentNode.insertBefore(errorContainer, form);
    }
    errorContainer.innerHTML = '<ul class="notice"><li>' + message + '</li></ul>';
    window.scrollTo(0, 0);
}

function clearError() {
    const errorContainer = document.querySelector('.client-errors');
    if (errorContainer) {
        errorContainer.remove();
    }
}

function showFieldError(field, message) {
    clearFieldError(field);
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.style.color = 'red';
    errorSpan.style.fontSize = '0.9em';
    errorSpan.textContent = message;
    field.parentNode.insertBefore(errorSpan, field.nextSibling);
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}
