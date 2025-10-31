document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contact");
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const phoneInput = document.getElementById("phoneNumber");
    const nameError = document.getElementById("nameError");
    const emailError = document.getElementById("emailError");
    const phoneError = document.getElementById("phoneNumberError");

    // Disable browser validation
    form.setAttribute("novalidate", "");

    // Hide errors initially
    hideAllErrors();

    form.addEventListener("submit", function (event) {
        let valid = true;

        // Name validation
        if (nameInput.value.trim() === "") {
            nameError.textContent = "Field required";
            nameError.style.display = "inline";
            valid = false;
        } else {
            nameError.style.display = "none";
        }

        // Email validation
        if (emailInput.value.trim() === "") {
            emailError.textContent = "Field required";
            emailError.style.display = "inline";
            valid = false;
        } else if (!validateEmail(emailInput.value)) {
            emailError.textContent = "Invalid email format";
            emailError.style.display = "inline";
            valid = false;
        } else {
            emailError.style.display = "none";
        }

        // Phone validation
        if (phoneInput.value.trim() === "") {
            phoneError.textContent = "Field required";
            phoneError.style.display = "inline";
            valid = false;
        } else if (!validatePhone(phoneInput.value)) {
            phoneError.textContent = "Invalid format";
            phoneError.style.display = "inline";
            valid = false;
        } else {
            phoneError.style.display = "none";
        }

        if (!valid) {
            event.preventDefault(); // Stop form submission if validation fails
        }
    });

    // Validate on user input (so errors disappear when corrected)
    nameInput.addEventListener("input", () => validateField(nameInput, nameError));
    emailInput.addEventListener("input", () => validateField(emailInput, emailError, validateEmail, "Invalid email format"));
    phoneInput.addEventListener("input", () => validateField(phoneInput, phoneError, validatePhone, "Invalid phone format (e.g., 555-555-5555)"));

    function validateField(input, errorElement, validator = null, errorMessage = "Field required") {
        if (input.value.trim() === "") {
            errorElement.textContent = "Field required";
            errorElement.style.display = "inline";
        } else if (validator && !validator(input.value)) {
            errorElement.textContent = errorMessage;
            errorElement.style.display = "inline";
        } else {
            errorElement.style.display = "none";
        }
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        const re = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/; // Basic US phone format
        return re.test(phone);
    }

    function hideAllErrors() {
        nameError.style.display = "none";
        emailError.style.display = "none";
        phoneError.style.display = "none";
    }
});