const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user'); // New route for user profile updates
const orderRoutes = require('./routes/orders'); // Import order routes
const vendorRoutes = require('./routes/vendorauth');
const vendor = require('./routes/vendor');
const orderVendorRoutes = require('./routes/order-vendor'); // Import the order-vendor routes
const productRoutes = require('./routes/product'); // Import product routes

require('dotenv').config();

const app = express();
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes); // Endpoint for user profile updates
app.use('/api/orders', orderRoutes); // Endpoint for order management
app.use('/api/vendorauth', vendorRoutes);
app.use('/api/vendor', vendor);
app.use('/api/product', productRoutes); // Endpoint for product management

// Initialize order vendor routes with the app instance
orderVendorRoutes(app);

// Starting the server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
