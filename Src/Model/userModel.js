const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        EmailAddress: {
            type: String,
            require: true,
        },
        BusinessName: {
            type: String,
            required: true,
        },
        PhoneNumber: {
            type: String,
            required: true,
        },
        HomeAddress: {
            type: String,
            required: true
        },
        CreationDate: {
            type: Date,
            default: Date.now()
        },
        modificationDate: {
            type: Date,
            default: null
        }
    },
);

module.exports = mongoose.model("User", userSchema);