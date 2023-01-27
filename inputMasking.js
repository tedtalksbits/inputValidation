export function maskPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3');
}

export function maskCreditCard(creditCard) {
    return creditCard.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1-$2-$3-$4');
}

export function maskSSN(ssn) {
    return ssn.replace(/(\d{3})(\d{2})(\d{4})/, '$1-$2-$3');
}

export function maskDate(value, max, min) {
    if (Number(value) > max && value.length > 2) {
        return `0${value.slice(-1)}`;
    }
    // if the input is 1 digit, add a 0 to the front
    if (value.length === 1) {
        return `0${value}`;
    }
    // if the input is 2 digits, return the input
    if (value.length === 2) {
        return value;
    }

    // if the input is more than 2 digits, return the last 2 digits
    if (value.length > 2) {
        return value.slice(-2);
    }

    // if the input is less than 1 digit, return an empty string
    if (value.length < 1) {
        return min;
    }
}

export function maskTime(time) {
    time = time.trim();
    // check for am or pm
    const hasAmPm = time.includes('am') || time.includes('pm');
    const hasColon = time.includes(':');

    if (time.length > 6) {
        // return in the format 12:34 56

        time = time.replace(/(\d{2})(\d{2})(\d{2})/, '$1:$2 $3');

        return time.slice(0, 8);
    }

    // acceptable values of time are 12:34, 12:34am, 12am, 12, 1234, 1234am

    // case: 12:34 || 1:34 || 12:24[am|pm] || 1:24[am|pm]

    if (hasColon) {
        let [hours, rest] = time.split(':');
        let minute = rest.slice(0, 2);

        hours = validateHours(hours);

        if (hasAmPm) {
            let amPm = rest.slice(2, 4);

            minute = validateMinutes(minute);

            return `${hours}:${minute} ${amPm}`;
        }

        minute = validateMinutes(minute);

        return `${hours}:${minute} pm`;
    }

    //  1234[am|pm] || 1[am|pm] || 12[am|pm]

    if (hasAmPm) {
        let [rest, amPm] = time.split(/(am|pm)/);

        // rest cannot be more than 4 characters - 2 hours, 2 minutes

        if (rest.length > 4) {
            rest = rest.slice(-4);
        }

        if (rest.length === 3) {
            rest = `0${rest}`;
        }

        let hours = rest.slice(0, 2);
        let minute = rest.slice(2, 4);

        hours = validateHours(hours);
        minute = validateMinutes(minute);

        return `${hours}:${minute} ${amPm}`;
    }

    //case: 12 || 1 || 1234 || 123

    if (!hasAmPm && !hasColon) {
        if (time.length > 4) {
            time = time.slice(-4);
        }

        if (time.length === 3) {
            time = `0${time}`;
        }

        let hours = time.slice(0, 2);
        let minute = time.slice(2, 4);

        hours = validateHours(hours);
        minute = validateMinutes(minute);

        if (hours === '0' || hours === '00' || !hours) {
            return '';
        }

        return `${hours}:${minute} pm`;
    }

    // case: 00:00 || 00:00am || 00:00pm

    if (time === '0' || !time) {
        return '12:00 pm';
    }
}

function validateMinutes(minutes) {
    if (isNaN(minutes)) {
        return '00';
    }
    if (minutes.length === 1) {
        return '00';
    }

    if (Number(minutes) > 59) {
        return '00';
    }
    if (!minutes) {
        return '00';
    }

    return minutes;
}

function validateHours(hours) {
    if (hours.length === 1) {
        return hours;
    }

    if (Number(hours) > 12) {
        return Number(hours) - 12;
    }
    if (hours.length === 1 || isNaN(hours)) {
        // if the hours is 1 digit, add a 0 to the front
        hours = `${hours[0]}`;
    }

    return hours;
}
