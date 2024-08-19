import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CategoryFilters from './CategoryFilters/CategoryFilters';
import CategorySkeleton from './CategorySkeleton/CategorySkeleton';
import SiteCard from './SiteCard/SiteCard';
import { useCategorySites } from '../../hooks/useCategorySites';
import { IoMdSearch } from "react-icons/io"; // Adicionei o ícone de busca

import './Category.scss';

const Category = () => {
    const { category } = useParams();
    const {
        sites, loading, error, filters, handleToolFilterChange, setCategory,
    } = useCategorySites();
    const [activeMenu, setActiveMenu] = useState('category');
    const [searchInput, setSearchInput] = useState('');

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
        <section id="category-head">
            <CategoryFilters
                activeMenu={activeMenu}
                handleMenuToggle={handleMenuToggle}
                toolFilters={toolFilters}
                handleToolFilterChange={handleToolFilterChange}
                setSearchQuery={setSearchInput} // Passa a função para atualizar a busca
            />

            <div id="category-layout">
                <div className="head-text">
                    <span>{category}</span>
                    <h1>Explore and find the best site for you!</h1>
                    <p>Browse, clone, and customize thousands of websites #MadeinQuimplo. Looking for templates?</p>
                    <div className="search">
                        <IoMdSearch />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchInput}
                            onChange={handleSearchChange}
                        />
                    </div>

                </div>
                <section id="category">
                    <div className="site-grid">
                        {loading ? <CategorySkeleton /> : filteredSites.map((site) => <SiteCard key={site.id} site={site} />)}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Category;
