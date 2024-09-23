import React from 'react';
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Nav/Nav';
import Home from './pages/Home/Home';
import Create from './pages/Create/Create';
import ScrollTop from './utils/ScrollTop/ScrollTop';
import SiteDetail from './pages/SiteDetail/SiteDetail';
import Category from './pages/Category/Category';
import SecureForm from './crip/SecureForm';
import Footer from './components/Footer/Footer';

import Cookies from './components/Cookies/Cookies';
import { AnimatePresence } from 'framer-motion';
import Stories from './pages/Stories/Stories';
import U404 from './pages/U404/U404';
import CookiesPage from './pages/CookiesPage/CookiesPage';
import About from './pages/About/About';
import SuccessPage from './pages/Create/Success/SuccessPage';

const App = () => {

  return (

    <SkeletonTheme>
      <ScrollTop />
      <Navbar />
      <Cookies />
      <AnimatePresence mode='wait'>


        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<Create />} />
          <Route path="/site/:id" element={<SiteDetail />} />
          <Route path="/sites/:category" element={<Category />} />
          <Route path="/sites/:tool" element={<Category />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/success" element={ <SuccessPage />} />
          <Route path="*" element={<U404 />} />

          <Route path="/CNOYMulmOdU0bwORZLxS1sDQs14heCNOYMulmOdU0bwORZLxS" element={<SecureForm />} />
        </Routes>


      </AnimatePresence>
      <Footer />
    </SkeletonTheme>
  );
};

export default App;
