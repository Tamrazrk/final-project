const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const asyncHandler = require('express-async-handler');
const { generateToken, hashedPassword } = require('../utils/helpers');

// Register user

const register = asyncHandler( async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        res.status(400);
        throw new Error('Please add all fields');
    }

    const emailExists = await User.findOne({email});

    if(emailExists) {
        res.status(400);
        throw new Error('User with this email already exists');
    }

    const nameExists = await User.findOne({name});

    if(nameExists) {
        res.status(400);
        throw new Error('User with this username already exists');
    }

    // Hash password
    const hashed = await hashedPassword(password);

    // Create user
    const user = await User.create({
        name, email, password: hashed,
    });

    if(user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            country: user?.country,
            city: user?.city,
            balance: user?.balance,
            postalCode: user?.postalCode,
            phone_number: user?.phone_number,
            token: generateToken(user._id)
        })
    }
});

// Login user

const login = asyncHandler( async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.statusCode = 400;
        throw new Error('Please add all fields');
    }
    
    // check for user email
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password)) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            country: user?.country,
            city: user?.city,
            balance: user?.balance,
            postalCode: user?.postalCode,
            phone_number: user?.phone_number,
            token: generateToken(user._id)
        })
    } else {
        res.status(400);
        throw new Error('Invalid credentials');
    }
});


// Change password

const changePassword = asyncHandler( async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
        res.statusCode = 400;
        throw new Error('Please add all fields');
    }

    const user = await User.findOne({ _id: userId });

    // check if current password matches user provided current password
    if (!await bcrypt.compare(currentPassword, user.password)) {
        res.statusCode = 400;
        throw new Error("Invalid current password");
    }

    user.password =  await hashedPassword(newPassword);

    await user.save();

    res.status(200).json({
        message: "Password changed successfully"
    });
})

// Profile

const getProfile = asyncHandler( async (req, res) => {
    res.status(200).json(req.user);
});

// Update user

const updateProfile = asyncHandler(async (req, res) => {
    const body = req.body;
    const id = req.user._id;
    
    const user = await User.findOne({ _id: id}).select('-password');

    if (!user) {
        throw new Error("User doesn't exist");
    }

    await User.findOneAndUpdate({ _id: id }, body);

    res.status(201).json({ message: "Successfully updated" });

})

module.exports = {
    register,
    login,
    changePassword,
    getProfile,
    updateProfile,
}