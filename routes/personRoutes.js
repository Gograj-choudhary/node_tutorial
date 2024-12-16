const express = require('express');
const router = express.Router();
const Person = require('../models/person'); // Ensure correct path to the model

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const newPerson = new Person(req.body); // Create a new person
        const savedPerson = await newPerson.save(); // Save to database
        res.status(201).json(savedPerson);
    } catch (err) {
        console.error('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all persons
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find(); // Fetch all persons
        res.status(200).json(persons);
    } catch (err) {
        console.error('Error fetching persons:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch persons by work type
router.get('/:workType', async (req, res) => {
    const workType = req.params.workType; // Extract work type from URL
    try {
        if (['chef', 'manager', 'waiter'].includes(workType)) {
            const persons = await Person.find({ work: workType });
            res.status(200).json(persons);
        } else {
            res.status(400).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.error('Error fetching persons by work type:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Export the router
module.exports = router;
