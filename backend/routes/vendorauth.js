const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Vendor = require('../models/Vendor'); // Assuming the Vendor model is similar to what we discussed

const router = express.Router();

// Register Vendor
router.post('/register', async (req, res) => {
    const { vendor_email, password, name, phone } = req.body;
    try {
        const vendorExists = await Vendor.findOne({ vendor_email });
        if (vendorExists) return res.status(400).json({ msg: 'Vendor already exists' });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const vendor = new Vendor({
            vendor_email,
            name,
            phone,
            password: hashedPassword // Save the hashed password
        });

        await vendor.save();
        res.status(201).json({ msg: 'Vendor registered successfully' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// Login Vendor
router.post('/login', async (req, res) => {
    const { vendor_email, password } = req.body;
    try {
        const vendor = await Vendor.findOne({ vendor_email });
        if (!vendor) return res.status(400).json({ msg: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, vendor.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: vendor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, vendor: { id: vendor._id, vendor_email: vendor.vendor_email, name: vendor.name } });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
