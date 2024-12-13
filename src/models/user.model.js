// define user schema 
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true },
        // email verification
        isVerified: { type: Boolean, default: false }
    }, { timestamps: true }
);

// hash the user password
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// check for password comparison
userSchema.methods.comparePasswrd = async function(password) {
    return bcrypt.compare(password, this.password);
};


module.exports = mongoose.model('User', userSchema);