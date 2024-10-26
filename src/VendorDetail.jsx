import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VendorDetail.css'; // Import the same CSS styles

const VendorDetail = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); // Get user from localStorage
  const { category, id } = useParams(); // Get both category and id from URL params
  console.log(category);
  console.log(id);
  const [vendor, setVendor] = useState(null); // State to hold the vendor data
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Function to fetch data from MongoDB
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product/products'); // Fetch from API
        const data = await response.json();
        
        let vendorData = [];
        if (category === 'wedding-cake') {
          vendorData = Array.isArray(data.WeddingCakeData) ? data.WeddingCakeData : [];
        }if (category === 'photographers') {
          vendorData = Array.isArray(data.PhotographerData) ? data.PhotographerData : [];
        }

        const foundVendor = vendorData.find((v) => v.product_id === id); // Match product ID
        setVendor(foundVendor);
      } catch (error) {
        console.error('Error fetching vendor data:', error);
      } finally {
        setLoading(false); // Stop loading after data is fetched
      }
    };

    fetchData();
  }, [category, id]);

  if (loading) {
    return <h2>Loading...</h2>; // Display loading message while fetching
  }

  if (!vendor) {
    return <h2>Vendor Not Found</h2>; // Display a message if vendor is not found
  }

  const handleBookNow = async () => {
    if (!user) {
      navigate('/login'); // Redirect to login if user is not authenticated
      return;
    }

    const orderDetails = {
      customer_email: user.email,
      vendor_email: vendor.vendor_email || 'vendor@gmail.com', // Fallback email
      item_name: vendor.title,
      item_price: vendor.price,
      item_image_url: vendor.image_url,
      accepted: false,
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        const orderData = await response.json(); // Get the order data including the generated order ID
        const orderId = orderData.order.order_id; // Adjust this based on your response structure

        // Update user's order history
        const userUpdateResponse = await fetch('http://localhost:5000/api/user/updateOrderHistory', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: user.email, orderId }), // Send email and order ID to update
        });

        if (userUpdateResponse.ok) {
          alert("Order Placed Successfully!");
          navigate('/profile'); // Redirect to profile after updating order history
        } else {
          console.error('Error updating order history:', await userUpdateResponse.json());
        }
      } else {
        const errorData = await response.json();
        console.error('Error adding order:', errorData.message || response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="vendor-detail-container">
      <div className="image-price-section">
        <div className="image-section">
          <img src={vendor.image_url} alt={vendor.title} />
        </div>
        <div className="price-card">
          <h3 className="h3Class">Starting Price</h3>
          <p>Total Price: {vendor.price ? `INR ${vendor.price}` : 'Price not available'}</p>
          <p className="special-deal">Special deal!!</p>
        </div>
      </div>
      <div className="details-card">
        <h2>{vendor.title}</h2>
        <p>{vendor.location}</p>
        <div className="rating-section">
          <span>{vendor.ratings} ⭐</span>
        </div>
        <div className="button-group">
          <button className="wishlist-button">❤️ Wishlist</button>
          <button className="book-button" onClick={handleBookNow}>Book Now</button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
