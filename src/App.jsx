import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SignUpPage from './components/SignUpPage';
import LoginPage from './components/LoginPage';
import BlendPage from './components/BlendPage';
import ImportMedia from './components/ImportMedia';
import ExploreCommunityPage from './components/ExploreCommunityPage';
import MyProfile from './components/MyProfile';
import Settings from './components/Settings';
import DemoBlend from './components/DemoBlend';
import ContactPage from './components/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/blend" element={<BlendPage />} />
        <Route path="/importmedia" element={<ImportMedia />} />  
        <Route path="/explore" element={<ExploreCommunityPage />} />
        <Route path="/profile" element={<MyProfile />} />              
        <Route path="/settings" element={<Settings />} />
        <Route path="/demo-blend" element={<DemoBlend />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </Router>
  );
}

export default App;