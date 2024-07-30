import React from 'react';
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import ScrollTop from './utils/ScrollTop/ScrollTop';
import SiteDetail from './pages/SiteDetail/SiteDetail';
import Category from './pages/Category/Category';
import SecureForm from './crip/SecureForm';
import Footer from './components/Footer/Footer';

const App = () => {
  return (
    <SkeletonTheme>
      <Router>
        <ScrollTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/site/:id" element={<SiteDetail />} />
          <Route path="/sites/:category" element={<Category />} />
          <Route path="/sites/:tool" element={<Category />} />
          <Route path="/CNOYMulmOdU0bwORZLxS1sDQs14heCNOYMulmOdU0bwORZLxS" element={<SecureForm />} />
        </Routes>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
};

export default App;
