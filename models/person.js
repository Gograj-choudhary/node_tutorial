const mongoose = require('mongoose');

// Define person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        default: null, // Optional field with a default value
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'], // Allowed values
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure the email is unique
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validate email format
    },
    address: {
        type: String,
        default: 'Not provided', // Optional field with a default value
    },
    salary: {
        type: Number,
        required: true,
    },
});

// Export Person model
module.exports = mongoose.model('Person', personSchema);
