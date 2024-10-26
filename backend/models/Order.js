// models/Order.js
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  order_id: {
    type: String,
    unique: true, // Ensure order_id is unique
  },
  customer_email: {
    type: String,
    unique: false,
    
  },
  vendor_email: {
    type: String,
    unique: false,
    
  },
  item_name: {
    type: String,
    unique: false,
   
  },
  item_price: {
    type: Number,
    unique: false,
    
  },
  item_image_url: {
    type: String,
    unique: false,
    
  },
  accepted: {
    type: Boolean,
    unique: false,
    default: false,
  },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt fields

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
