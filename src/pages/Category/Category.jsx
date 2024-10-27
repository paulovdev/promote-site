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
    const { sites, loading, error, setCategory, filters, setFilters } = useCategorySites();
    const [activeMenu, setActiveMenu] = useState('category');
    const [searchInput, setSearchInput] = useState('');

    const { t } = useTranslation();

    useEffect(() => {
        setCategory(category);
    }, [category, setCategory]);

    const handleSearchChange = (e) => {
        setSearchInput(e.target.value);
    };

    // Verifica se os filtros estão sendo atualizados corretamente
    useEffect(() => {
        console.log('Filtros atualizados:', filters);
    }, [filters]);

    const filteredSites = sites.filter(site => {
        const matchesSearch = site.siteName.toLowerCase().includes(searchInput.toLowerCase());

        const matchesTools =
            filters.tools.length === 0 || filters.tools.includes(site.tool);

        return matchesSearch && matchesTools;
    });

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
                    <div className="head-text">
                        <h1>{t('category.header.title')}</h1>
                        <p>
                            {t('category.header.subTitle')} <Link to={"/create"}>
                                {t('category.header.aTitle')}</Link> {t('category.header.threeTitle')}
                        </p>
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
                            setFilters={setFilters}
                        />
                    </div>

                    <section id="category">
                        <div className="site-grid">
                            {loading ? <CategorySkeleton /> : (
                                filteredSites.length > 0 ? (
                                    filteredSites.map((site) => (
                                        <SiteCard key={site.id} site={site} />
                                    ))
                                ) : (
                                    <p>{t('category.notFound')}</p>
                                )
                            )}
                        </div>
                    </section>
                </motion.div>
            </section>
        </>
    );
};

export default Category;
