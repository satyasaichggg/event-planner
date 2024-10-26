import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Vendors from './Vendors';
import VendorDetail from './VendorDetail';
import Header from './Header';
import Venues from './Venues';
import VenueDetail from './VenueDetail';
import HomePage from './HomePage';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import VendorRegister from './VendorRegister';
import VendorLogin from './VendorLogin';
import VendorDashboard from './VendorDashboard';
import EventHome from './EventHome';

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
         <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<EventHome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/vendors/:category/:id" element={<VendorDetail />} />
        <Route path="/vendors" element={<Vendors />} />
        <Route path="/venues" element={<Venues />} />
        <Route path="/venues/:id" element={<VenueDetail />} />
        <Route path="/vendor-register" element={<VendorRegister />} />
        <Route path="/vendor-login" element={<VendorLogin />} />
        <Route path="/vendor-dashboard" element={<VendorDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
