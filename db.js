const mongoose = require('mongoose');

// MongoDB connection URL
const mongoURL = 'mongodb://127.0.0.1:27017/customers';

// Connect to MongoDB
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Get the default connection
const db = mongoose.connection;

// Event listeners for the database connection
db.on('connected', () => {
    console.log('Connected to MongoDB successfully');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
    console.warn('Disconnected from MongoDB');
});

// Export the mongoose instance for use in other files
module.exports = mongoose;
