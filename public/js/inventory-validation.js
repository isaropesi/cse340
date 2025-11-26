// Client-side validation for add inventory form
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('addInventoryForm');
  
  if (form) {
    form.addEventListener('submit', function(event) {
      let isValid = true;
      let errorMessages = [];

      // Get form fields
      const classificationId = document.getElementById('classificationList');
      const make = document.getElementById('inv_make');
      const model = document.getElementById('inv_model');
      const year = document.getElementById('inv_year');
      const description = document.getElementById('inv_description');
      const image = document.getElementById('inv_image');
      const thumbnail = document.getElementById('inv_thumbnail');
      const price = document.getElementById('inv_price');
      const miles = document.getElementById('inv_miles');
      const color = document.getElementById('inv_color');

      // Validate classification
      if (!classificationId.value || classificationId.value === '') {
        isValid = false;
        errorMessages.push('Please select a classification.');
      }

      // Validate make
      if (!make.value.trim() || make.value.trim().length < 3) {
        isValid = false;
        errorMessages.push('Make must be at least 3 characters long.');
      }

      // Validate model
      if (!model.value.trim() || model.value.trim().length < 3) {
        isValid = false;
        errorMessages.push('Model must be at least 3 characters long.');
      }

      // Validate year (must be 4 digits)
      const yearValue = year.value.trim();
      if (!yearValue || yearValue.length !== 4 || isNaN(yearValue)) {
        isValid = false;
        errorMessages.push('Year must be a valid 4-digit number.');
      }

      // Validate description
      if (!description.value.trim()) {
        isValid = false;
        errorMessages.push('Please provide a description.');
      }

      // Validate image path
      if (!image.value.trim()) {
        isValid = false;
        errorMessages.push('Please provide an image path.');
      }

      // Validate thumbnail path
      if (!thumbnail.value.trim()) {
        isValid = false;
        errorMessages.push('Please provide a thumbnail path.');
      }

      // Validate price (must be a positive number)
      const priceValue = parseFloat(price.value);
      if (!price.value.trim() || isNaN(priceValue) || priceValue < 0) {
        isValid = false;
        errorMessages.push('Price must be a valid positive number.');
      }

      // Validate miles (must be a positive integer)
      const milesValue = parseInt(miles.value);
      if (!miles.value.trim() || isNaN(milesValue) || milesValue < 0) {
        isValid = false;
        errorMessages.push('Miles must be a valid positive number.');
      }

      // Validate color
      if (!color.value.trim()) {
        isValid = false;
        errorMessages.push('Please provide a color.');
      }

      // If validation fails, prevent form submission and show errors
      if (!isValid) {
        event.preventDefault();
        
        // Display error messages
        let errorHTML = '<ul class="notice">';
        errorMessages.forEach(function(message) {
          errorHTML += '<li>' + message + '</li>';
        });
        errorHTML += '</ul>';
        
        // Find or create error container
        let errorContainer = document.querySelector('.client-errors');
        if (!errorContainer) {
          errorContainer = document.createElement('div');
          errorContainer.className = 'client-errors';
          form.parentNode.insertBefore(errorContainer, form);
        }
        errorContainer.innerHTML = errorHTML;
        
        // Scroll to top to show errors
        window.scrollTo(0, 0);
      }
    });

    // Add real-time validation feedback
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });
  }
});

// Function to validate individual fields
function validateField(field) {
  const fieldId = field.id;
  const value = field.value.trim();
  
  // Remove any existing error message for this field
  const existingError = field.parentNode.querySelector('.field-error');
  if (existingError) {
    existingError.remove();
  }
  
  let errorMessage = '';
  
  switch(fieldId) {
    case 'classificationList':
      if (!value || value === '') {
        errorMessage = 'Please select a classification.';
      }
      break;
    case 'inv_make':
      if (!value || value.length < 3) {
        errorMessage = 'Make must be at least 3 characters long.';
      }
      break;
    case 'inv_model':
      if (!value || value.length < 3) {
        errorMessage = 'Model must be at least 3 characters long.';
      }
      break;
    case 'inv_year':
      if (!value || value.length !== 4 || isNaN(value)) {
        errorMessage = 'Year must be a valid 4-digit number.';
      }
      break;
    case 'inv_description':
      if (!value) {
        errorMessage = 'Please provide a description.';
      }
      break;
    case 'inv_image':
      if (!value) {
        errorMessage = 'Please provide an image path.';
      }
      break;
    case 'inv_thumbnail':
      if (!value) {
        errorMessage = 'Please provide a thumbnail path.';
      }
      break;
    case 'inv_price':
      const priceValue = parseFloat(value);
      if (!value || isNaN(priceValue) || priceValue < 0) {
        errorMessage = 'Price must be a valid positive number.';
      }
      break;
    case 'inv_miles':
      const milesValue = parseInt(value);
      if (!value || isNaN(milesValue) || milesValue < 0) {
        errorMessage = 'Miles must be a valid positive number.';
      }
      break;
    case 'inv_color':
      if (!value) {
        errorMessage = 'Please provide a color.';
      }
      break;
  }
  
  // Display error message if validation failed
  if (errorMessage) {
    const errorSpan = document.createElement('span');
    errorSpan.className = 'field-error';
    errorSpan.style.color = 'red';
    errorSpan.style.fontSize = '0.9em';
    errorSpan.textContent = errorMessage;
    field.parentNode.insertBefore(errorSpan, field.nextSibling);
  }
}
