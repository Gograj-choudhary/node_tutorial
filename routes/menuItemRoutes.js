const express = require('express');
const router = express.Router(); // Corrected: Use 'router' consistently
const MenuItem = require('../models/MenuItem'); // Ensure this model exists and is correctly defined

// POST: Add a new menu item
router.post('/', async (req, res) => {
    try {
        const { name, description, price, category, availability } = req.body;

        // Create a new MenuItem
        const newMenuItem = new MenuItem({ name, description, price, category, availability });

        // Save to the database
        const savedMenuItem = await newMenuItem.save();
        res.status(201).json(savedMenuItem);
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Failed to create menu item' });
    }
});

// GET: Retrieve all menu items
router.get('/', async (req, res) => {
    try {
        const menuItems = await MenuItem.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

// GET: Retrieve a single menu item by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const menuItem = await MenuItem.findById(id);

        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(menuItem);
    } catch (error) {
        console.error('Error fetching menu item:', error);
        res.status(500).json({ error: 'Failed to fetch menu item' });
    }
});

// PUT: Update a menu item by ID
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        // Find and update the menu item
        const updatedMenuItem = await MenuItem.findByIdAndUpdate(id, updates, { new: true });

        if (!updatedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json(updatedMenuItem);
    } catch (error) {
        console.error('Error updating menu item:', error);
        res.status(500).json({ error: 'Failed to update menu item' });
    }
});

// DELETE: Remove a menu item by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Find and delete the menu item
        const deletedMenuItem = await MenuItem.findByIdAndDelete(id);

        if (!deletedMenuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        res.status(200).json({ message: 'Menu item deleted successfully' });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ error: 'Failed to delete menu item' });
    }
});


module.exports = router;