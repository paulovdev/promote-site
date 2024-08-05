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
import { CategoryProvider } from './context/CategoryContext';
import { SitesProvider } from './context/SitesHomeContext';
import { SiteDetailProvider } from './context/SiteDetailContext';
import Cookies from './components/Cookies/Cookies';
const App = () => {


  return (
    <SkeletonTheme>
      <Router>
        <ScrollTop />
        <Navbar />
        <Cookies />
        <CategoryProvider>
          <SitesProvider>
            <SiteDetailProvider>
              <Routes>
                <Route path="/" exact element={<Home />} />
                <Route path="/create" element={<Create />} />
                <Route path="/site/:id" element={<SiteDetail />} />
                <Route path="/sites/:category" element={<Category />} />
                <Route path="/sites/:tool" element={<Category />} />
                <Route path="/CNOYMulmOdU0bwORZLxS1sDQs14heCNOYMulmOdU0bwORZLxS" element={<SecureForm />} />
              </Routes>
            </SiteDetailProvider>
          </SitesProvider>
        </CategoryProvider>
        <Footer />
      </Router>
    </SkeletonTheme>
  );
};

export default App;
