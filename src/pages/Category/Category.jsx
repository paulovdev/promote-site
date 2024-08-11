import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CategoryFilters from './CategoryFilters/CategoryFilters';
import CategorySkeleton from './CategorySkeleton/CategorySkeleton';
import SiteCard from './SiteCard/SiteCard';
import { useCategory } from '../../context/CategoryContext';

import Transition from "../../utils/Transition/Transition"
import './Category.scss';

const Category = () => {
    const { category } = useParams();
    const { sites, loading, filters, handleToolFilterChange, setCategory } = useCategory();
    const [isCategoryOpen, setIsCategoryOpen] = React.useState(true);
    const [isToolsOpen, setIsToolsOpen] = React.useState(true);
    const [arrowAnim, setArrowAnim] = React.useState(false);
    const [arrowAnim2, setArrowAnim2] = React.useState(false);

    useEffect(() => {
        setCategory(category);
    }, [category, setCategory]);

    const categoriesAnim = () => {
        setArrowAnim(!arrowAnim);
        setIsCategoryOpen(!isCategoryOpen);
    }

    const toolAnim = () => {
        setArrowAnim2(!arrowAnim2);
        setIsToolsOpen(!isToolsOpen);
    }

    const toolFilters = [
        { id: 'react', label: 'React', checked: filters.tools?.includes('react') },
        { id: 'wordpress', label: 'WordPress', checked: filters.tools?.includes('wordpress') },
        { id: 'elementor', label: 'Elementor', checked: filters.tools?.includes('elementor') },
        { id: 'framer', label: 'Framer', checked: filters.tools?.includes('framer') },
        { id: 'ghost', label: 'Ghost', checked: filters.tools?.includes('ghost') },
        { id: 'html-css-js', label: 'HTML + CSS + JS', checked: filters.tools?.includes('html-css-js') },
        { id: 'next', label: 'Next', checked: filters.tools?.includes('next') },
        { id: 'webflow', label: 'Webflow', checked: filters.tools?.includes('webflow') },
        { id: 'wix', label: 'Wix', checked: filters.tools?.includes('wix') }
    ];

    return (
        <section id="category-head">
            <div className="head-text">
                <h1>Explore {category} and find the best site for you!</h1>
            </div>
            <div id='category-layout'>
                <CategoryFilters
                    categoriesAnim={categoriesAnim}
                    isCategoryOpen={isCategoryOpen}
                    isToolsOpen={isToolsOpen}
                    arrowAnim={arrowAnim}
                    arrowAnim2={arrowAnim2}
                    toolAnim={toolAnim}
                    toolFilters={toolFilters}
                    handleToolFilterChange={handleToolFilterChange}
                />
                <section id='category'>
                    <div className='site-grid'>
                        {loading ? <CategorySkeleton /> : sites.map(site => <SiteCard key={site.id} site={site} />)}
                    </div>
                </section>
            </div>
        </section>
    );
};

export default Transition(Category, { text: 'Explore websites' });