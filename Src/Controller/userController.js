const userModel = require("../Model/userModel");
const archivedDataModel = require("../Model/archivedDataModel")
const { isValidEmail, isDuplicateEmail, isValidPhoneNumber } = require("./validatorFunctions");

///////////////////////////////////////////////////////////Register New User///////////////////////////////////////////////////////////////////
async function createUsers(req, res) {
    try {
        let data = req.body;
        const { EmailAddress, BusinessName, PhoneNumber, HomeAddress } = data;
        if (!await isValidEmail(EmailAddress)) {
            return res.status(400).send({ status: false, message: "Invalid email address" });//Email Number Validation
        }
        else if (!await isValidPhoneNumber(PhoneNumber)) {
            return res.status(400).send({ status: false, message: "Invalid phone number" });//Phone Number Validation
        }
        else if (await isDuplicateEmail(EmailAddress)) {
            return res.status(400).send({ status: false, message: "Email Already Exist" });//Duplication Check
        }
        const user = new userModel({
            EmailAddress,
            BusinessName,
            PhoneNumber,
            HomeAddress,
            CreationDate: Date.now(),//Creation Date
        });
        await user.save();
        return res.status(200).send({ status: true, message: "User registered successfully" });
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
};

///////////////////////////////////////////////////////////Get all the users present in the db///////////////////////////////////////////////////////////////////
async function getUsers(req, res) {
    try {
        const usersData = await userModel.find();//Get all the users
        if (usersData) {
            return res.status(200).send({ status: true, data: usersData });
        } else {
            return res.status(404).send({ status: false, message: 'No users found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}


///////////////////////////////////////////////////////////Get one user as per ID///////////////////////////////////////////////////////////////////

async function getUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);//Get users for specific ID
        if (user) {
            return res.status(200).send({ status: true, data: user });
        } else {
            return res.status(404).send({ status: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
};

///////////////////////////////////////////////////////////Update User as per ID///////////////////////////////////////////////////////////////////


async function updateUser(req, res) {
    const userId = req.params.id;
    try {
        const dataToUpdate = req.body;
        const user = await userModel.findById(userId);//user Details update 

        if (!user) {
            return res.status(404).send({ status: false, message: 'User not found' });
        }

        user.EmailAddress = dataToUpdate.EmailAddress || user.EmailAddress;//optional Update
        user.BusinessName = dataToUpdate.BusinessName || user.BusinessName;//optional Update
        user.PhoneNumber = dataToUpdate.PhoneNumber || user.PhoneNumber;//optional Update
        user.HomeAddress = dataToUpdate.HomeAddress || user.HomeAddress;//optional Update

        user.modificationDate = Date.now();

        await user.save();

        return res.status(200).send({ status: true, message: 'User updated successfully', data: user });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    }
}

///////////////////////////////////////////////////////////Delete User as per Id and archive the user///////////////////////////////////////////////////////////////////

async function deleteUser(req, res) {
    const userId = req.params.id;
    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).send({ status: false, message: 'User not found' });
        }

        const archivedUser = new archivedDataModel({///////////Archiving the User 
            EmailAddress: user.EmailAddress,
            BusinessName: user.BusinessName,
            PhoneNumber: user.PhoneNumber,
            HomeAddress: user.HomeAddress,
            CreationDate: user.CreationDate,
            modificationDate: user.modificationDate || null,
            archivedDate: Date.now()// Adding archived Date
        });

        await archivedUser.save();//Archiving data to a new collection
        await user.deleteOne();//Deleting the user for specific Id

        return res.status(200).send({ status: true, message: 'User deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ status: false, message: err.message });
    };
}


module.exports = { createUsers, getUsers, getUser, updateUser, deleteUser };