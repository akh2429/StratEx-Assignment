const userModel = require("../Model/userModel");
const bcrypt = require("bcrypt");

async function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

async function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

async function createUsers(req, res) {
    try {
        let data = req.body;
        const { EmailAddress, BusinessName, PhoneNumber, HomeAddress } = data;
        if (!await isValidEmail(EmailAddress)) {
            return res.status(400).send({ status: false, message: "Invalid email address" });
        }
        if (!await isValidPhoneNumber(PhoneNumber)) {
            return res.status(400).send({ status: false, message: "Invalid phone number" });
        }
        const hashedPhoneNumber = await bcrypt.hash(PhoneNumber, 5);
        const hashedHomeAddress = await bcrypt.hash(HomeAddress, 5);
        const user = new userModel({
            EmailAddress,
            BusinessName,
            PhoneNumber: hashedPhoneNumber,
            HomeAddress: hashedHomeAddress,
            CreationDate: Date.now(),
        });
        await user.save();
        return res.status(200).send({ status: true, message: "User registered successfully" })
    }
    catch (err) {
        if (err.code === 11000) {
            return res.status(500).send({ status: false, message: "Email Already Exist" });
        }
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createUsers };