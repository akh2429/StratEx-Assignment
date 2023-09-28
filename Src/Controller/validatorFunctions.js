const userModel = require("../Model/userModel");

async function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
async function isDuplicateEmail(email) {
    return userModel.findOne({ EmailAddress: email });
}

async function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

module.exports = { isValidEmail, isDuplicateEmail, isValidPhoneNumber };
