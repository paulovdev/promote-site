import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

import { useCategorySites } from '../../hooks/useCategorySites';
import CategoryFilters from './CategoryFilters/CategoryFilters';
import CategorySkeleton from './CategorySkeleton/CategorySkeleton';
import SiteCard from './SiteCard/SiteCard';

import { IoSearchOutline } from "react-icons/io5";

import './Category.scss';
import { motion } from 'framer-motion';

const Category = () => {
    const { category } = useParams();
    const {
        sites, loading, error, filters, handleToolFilterChange, setCategory,
    } = useCategorySites();
    const [activeMenu, setActiveMenu] = useState('category');
    const [searchInput, setSearchInput] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        setCategory(category);
    }, [category, setCategory]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    const filteredSites = sites.filter(site =>
        site.siteName.toLowerCase().includes(searchInput.toLowerCase())
    );

    const toolFilters = [
        { id: 'react', label: 'React', checked: filters.tools?.includes('react') },
        { id: 'wordpress', label: 'WordPress', checked: filters.tools?.includes('wordpress') },
        { id: 'elementor', label: 'Elementor', checked: filters.tools?.includes('elementor') },
        { id: 'framer', label: 'Framer', checked: filters.tools?.includes('framer') },
        { id: 'ghost', label: 'Ghost', checked: filters.tools?.includes('ghost') },
        { id: 'html-css-js', label: 'HTML + CSS + JS', checked: filters.tools?.includes('html-css-js') },
        { id: 'next', label: 'Next', checked: filters.tools?.includes('next') },
        { id: 'webflow', label: 'Webflow', checked: filters.tools?.includes('webflow') },
        { id: 'wix', label: 'Wix', checked: filters.tools?.includes('wix') },
    ];

    const handleMenuToggle = (menu) => {
        setActiveMenu(activeMenu === menu ? '' : menu);
    };

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{t('helmet.explore')}</title>
            </Helmet>

            <section id="category-head">
                <motion.div id="category-layout"
                    initial={{ opacity: 0, y: -25 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeIn' }}
                >

                    <div className="head-text"  >
                        <h1>{t('category.header.title')}</h1>
                        <p>{t('category.header.subTitle')} <Link to={"/create"}>{t('category.header.aTitle')}</Link> {t('category.header.threeTitle')}  </p>
                        <div className="search">
                            <IoSearchOutline />
                            <input
                                type="text"
                                placeholder={t('category.search.placeholder')}
                                value={searchInput}
                                onChange={handleSearchChange}
                            />
                        </div>
                        <CategoryFilters
                            activeMenu={activeMenu}
                            handleMenuToggle={handleMenuToggle}
                            toolFilters={toolFilters}
                            handleToolFilterChange={handleToolFilterChange}
                            setSearchQuery={setSearchInput}
                        />
                    </div>

                    <section id="category">
                        <div className="site-grid">
                            {loading ? <CategorySkeleton /> : filteredSites.map((site) => (
                                <SiteCard key={site.id} site={site} />
                            ))}
                        </div>
                    </section>
                </motion.div>
            </section>
        </>
    );
};

export default Category;
