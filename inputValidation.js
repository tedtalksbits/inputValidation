/*
    ========================================
    SHOW TOGGLE AND PASSWORD CONFIRM VALIDATION
    ========================================
*/

import {
    maskDate,
    maskPhoneNumber,
    maskSSN,
    maskTime,
} from './inputMasking.js';

const showIcons = document.querySelectorAll("[data-icon='password']");

showIcons.forEach((showIcon) => {
    showIcon.addEventListener('click', (e) => {
        const input = e.target.previousElementSibling;
        const type = input.getAttribute('type');
        if (type === 'password') {
            input.setAttribute('type', 'text');
            e.target.textContent = 'hide';
        } else {
            input.setAttribute('type', 'password');
            e.target.textContent = 'show';
        }
    });
});

const confirmPassword = document.querySelectorAll(
    '[data-type="confirm password"]'
);

confirmPassword.forEach((confirmPassword) => {
    confirmPassword.addEventListener('input', (e) => {
        const target = e.target.getAttribute('data-target');
        const targetInput = document.getElementById(target);
        const targetValue = targetInput.value;
        const inputValue = e.target.value;
        if (targetValue !== inputValue) {
            e.target.setCustomValidity('Passwords do not match.');
        } else {
            e.target.setCustomValidity('');
        }

        e.target.reportValidity();
    });
});

/*
    ========================================
    PHONE NUMBER VALIDATION
    ========================================
*/

const phoneNumber = document.querySelectorAll('[data-type="tel"]');

phoneNumber.forEach((phoneNumber) => {
    phoneNumber.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const maskedPhoneNumber = maskPhoneNumber(inputValue);

        e.target.value = maskedPhoneNumber;
    });
});

/*
    ========================================
    DATE VALIDATION
    ========================================
*/
// add masking to each input (month and day)

const month = document.querySelectorAll('[data-type="date-month"]');
const day = document.querySelectorAll('[data-type="date-day"]');

month.forEach((month) => {
    month.addEventListener('input', (e) => {
        e.target.select();
        const inputValue = e.target.value;
        const maskedMonth = maskDate(inputValue, 12, 1);

        e.target.value = maskedMonth;

        if (maskedMonth > 12) {
            e.target.setCustomValidity('Month must be between 1 and 12.');
        } else if (maskedMonth < 1) {
            e.target.setCustomValidity('Month must be between 1 and 12.');
        } else {
            e.target.setCustomValidity('');
        }
        e.target.reportValidity();
    });

    month.addEventListener('blur', (e) => {
        const inputValue = e.target.value;

        if (inputValue < 1) {
            // correct the input value
            e.target.value = '01';
            e.target.setCustomValidity('');
        }

        e.target.reportValidity();
    });
});

day.forEach((day) => {
    day.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const maskedDay = maskDate(inputValue, 31, 1);

        e.target.value = maskedDay;

        if (maskedDay > 31) {
            e.target.setCustomValidity('Day must be between 1 and 31.');
        } else if (maskedDay < 1) {
            e.target.setCustomValidity('Day must be between 1 and 31.');
        } else {
            e.target.setCustomValidity('');
        }
        e.target.reportValidity();
    });

    day.addEventListener('blur', (e) => {
        const inputValue = e.target.value;

        if (inputValue < 1) {
            // correct the input value
            e.target.value = '01';
            e.target.setCustomValidity('');
        }

        e.target.reportValidity();
    });
});

/*
    ========================================
    SSN VALIDATION
    ========================================
*/

const ssn = document.querySelectorAll('[data-type="ssn"]');

ssn.forEach((ssn) => {
    ssn.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const maskedSSN = maskSSN(inputValue);

        console.log(maskedSSN);

        e.target.value = maskedSSN;
    });
});

/*
    ========================================
    TIME VALIDATION
    ========================================
*/

const time = document.querySelectorAll('[data-type="time"]');

time.forEach((time) => {
    time.addEventListener('input', (e) => {
        const inputValue = e.target.value;
        const maskedTime = maskTime(inputValue);

        console.log(maskedTime);

        // e.target.value = maskedTime;

        // if (maskedTime > 24) {
        //     e.target.setCustomValidity('Time must be between 0 and 24.');
        // } else if (maskedTime < 0) {
        //     e.target.setCustomValidity('Time must be between 0 and 24.');
        // } else {
        //     e.target.setCustomValidity('');
        // }
        // e.target.reportValidity();
    });

    time.addEventListener('blur', (e) => {
        const inputValue = e.target.value;
        const maskedTime = maskTime(inputValue);

        e.target.value = maskedTime;
    });
});
