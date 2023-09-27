const userModel = require("../Model/userModel")
const regEmail = /^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/
const regName = /^[A-Za-z]+(?: [A-Za-z]+)*$/
const regPswd = /^(?=.[A-Z])(?=.[a-z])(?=.\d)(?=.[!@#$%^&()-_=+\[\]{}|;:'",.<>?/])[A-Za-z\d!@#$%^&()-_=+\[\]{}|;:'",.<>?/]{8,50}$/

const createUsers = async function (req, res) {
    try {
        let data = req.body;
        const { fullName, emailId, password, confirmPassword } = data
        let savedata = await userModel.create(data)
        return res.status(200).send({ status: true, message: "user registered successfully", data: savedata })
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message })
    }
}

module.exports = { createUsers };