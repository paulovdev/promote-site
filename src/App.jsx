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
          <Route path="/category/:category" element={<Category />} />
        </Routes>
      </Router>
    </SkeletonTheme>
  );
};

export default App;
