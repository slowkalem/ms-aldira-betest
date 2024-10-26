const User = require('../models/UserModel');

class UserService {
    static async createUser(data) {
        try {
            const newUser = new User(data);
            return await newUser.save();
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            const result = await User.find();

            return result
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(id) {
        try {
            let user = await User.findById(id);

            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByAccountNumber(accountNumber) {
        try {
            let user = await User.findOne({ accountNumber });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async getUserByIdentityNumber(identityNumber) {
        try {
            let user = await User.findOne({ identityNumber });
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, data) {
        try {
            return await User.findByIdAndUpdate(id, data, { new: true });
        } catch (error) {
            throw error;
        }
    }

    static async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService