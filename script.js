// DOM 
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const countrySelect = document.getElementById('country');
const phoneInput = document.getElementById('phone');
const ageInput = document.getElementById('age');
const passwordInput = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

// Error message 
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const ageError = document.getElementById('ageError');
const passwordError = document.getElementById('passwordError');

// Event Listeners
nameInput.addEventListener('input', validateForm);
emailInput.addEventListener('input', validateForm);
countrySelect.addEventListener('change', validateForm); 
phoneInput.addEventListener('input', validateForm);
ageInput.addEventListener('input', validateForm);
passwordInput.addEventListener('input', validateForm);

// Validation Logic
function validateForm() {
    let isNameValid = false;
    let isEmailValid = false;
    let isPhoneValid = false;
    let isAgeValid = false;
    let isPasswordValid = false;

    // Name
    if (nameInput.value.trim() !== "") {
        isNameValid = true;
        showSuccess(nameInput, nameError);
    } else {
        showError(nameInput, nameError);
    }

    // Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailPattern.test(emailInput.value.trim())) {
        isEmailValid = true;
        showSuccess(emailInput, emailError);
    } else {
        showError(emailInput, emailError);
    }

    // Phone
    const selectedOption = countrySelect.options[countrySelect.selectedIndex];
    const requiredLength = parseInt(selectedOption.getAttribute('data-len'));
    const phonePattern = new RegExp(`^[0-9]{${requiredLength}}$`);

    if (phonePattern.test(phoneInput.value.trim())) {
        isPhoneValid = true;
        showSuccess(phoneInput, phoneError);
        countrySelect.classList.remove('invalid');
    } else {
        phoneError.innerText = `Must be ${requiredLength} digits for ${selectedOption.text.split(' ')[0]}.`;
        showError(phoneInput, phoneError);
    }

    // Age
    const ageValue = parseInt(ageInput.value);
    if (ageValue >= 18 && ageValue < 120) {
        isAgeValid = true;
        showSuccess(ageInput, ageError);
    } else {
        showError(ageInput, ageError);
    }

    // Password
    if (passwordInput.value.length >= 6) {
        isPasswordValid = true;
        showSuccess(passwordInput, passwordError);
    } else {
        showError(passwordInput, passwordError);
    }

    // Button State
    if (isNameValid && isEmailValid && isPhoneValid && isAgeValid && isPasswordValid) {
        submitBtn.disabled = false;
    } else {
        submitBtn.disabled = true;
    }
}

// Helpers
function showError(input, errorMsgElement) {
    input.classList.add('invalid');
    input.classList.remove('valid');
    errorMsgElement.style.display = 'block';
}

function showSuccess(input, errorMsgElement) {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorMsgElement.style.display = 'none';
}

document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    alert("Registration Successful!");
});