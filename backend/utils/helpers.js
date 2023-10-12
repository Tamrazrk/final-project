const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

// Generate JWT

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
}

// hash password
const hashedPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);    
    return await bcrypt.hash(password, salt);
}

module.exports = {
    generateToken,
    hashedPassword,
}