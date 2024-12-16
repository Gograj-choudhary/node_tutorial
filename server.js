const express = require('express');
const mongoose = require('./db'); // Ensure this file exists and handles MongoDB connection
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Import and use routers
const personRouter = require('./routes/personRoutes');
app.use('/person', personRouter);

// Catch-all route for undefined endpoints
app.use((req, res) => {
    res.status(404).send('Endpoint not found');
});

// Start server after MongoDB connects
mongoose.connection.on('connected', () => {
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
});
