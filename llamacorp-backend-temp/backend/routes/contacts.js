const express = require('express');
const Contact = require('../models/Contact');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

const router = express.Router();

// POST a new contact submission (Public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // In the future: handle sending email here based on admin settings

    const newContact = new Contact({
      name,
      email,
      message,
      phone,
      subject,
      serviceInterested: subject, // fallback for older clients
    });

    await newContact.save();

    res.status(201).json({ message: 'Contact submitted successfully', contact: newContact });
  } catch (error) {
    console.error('Error submitting contact:', error);
    res.status(500).json({ message: 'Error submitting contact form' });
  }
});

// GET all contact submissions (Admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

module.exports = router;
