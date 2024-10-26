import React from 'react';
import './OrderCard.css'; // Ensure you create this CSS file for styling
import axios from 'axios'; // Import axios for API requests

const OrderCard = ({ order }) => {
  const acceptOrder = async () => {
    try {
      // Call API to update the order status to 'accepted'
      const response = await axios.put(`http://localhost:5000/api/order-vendor/accept/${order.order_id}`);
      if (response.status === 200) {
        alert('Order Accepted Successfully!');
      }else if( response.status === 400) {
        alert('Order Already Accepted!');
      }
      else {
        alert('Failed to accept the order.');
      }
    } catch (error) {
      console.error('Error accepting order:', error);
      alert('An error occurred while accepting the order.');
    }
  };

  const rejectOrder = async () => {
    try {
      // Call API to update the order status to 'rejected'
      const response = await axios.put(`http://localhost:5000/api/order-vendor/reject/${order.order_id}`, {
        status: 'rejected',
      });

      if (response.status === 200) {
        alert(`Order ${order.order_id} rejected successfully!`);
      } else if( response.status === 400) {
        alert('Order Already Rejected!');
      }else {
        alert('Failed to reject the order.');
      }
    } catch (error) {
      console.error('Error rejecting order:', error);
      alert('An error occurred while rejecting the order.');
    }
  };

  return (
    <div className="orderCard">
      <div className="orderCardSection">
        <span className="orderCardLabel">Order ID:</span>
        <span className="orderCardValue">{order.order_id}</span>
        <span className="orderCardLabel">Price:</span>
        <span className="orderCardValue">{order.item_price}</span>
      </div>
      <div className="orderCardSection">
        <span className="orderCardLabel">Item Name:</span>
        <span className="orderCardValue">{order.item_name}</span>
        <span className="orderCardLabel">Customer Email:</span>
        <span className="orderCardValue">{order.customer_email}</span>
      </div>
      <div className="orderCardSection">
        <button className="rejectButton" onClick={rejectOrder}>Reject</button>
        <button className="acceptButton" onClick={acceptOrder}>Accept</button>
      </div>
    </div>
  );
};

export default OrderCard;
