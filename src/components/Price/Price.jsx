import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { loadStripe } from '@stripe/stripe-js';
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import './Price.scss';

// Chave pública do Stripe
const stripePromise = loadStripe('pk_live_51Q1x2cRraDIE2N6q15XgLA5G4Z3go22e8ZS9iNgTk6lJDpR6o8ibFAiqAezLo2qlDRrqeBx4f0IB9FTtJhyE0iTt00bd3RwdaQ');

const Price = ({ onClick }) => {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const handlePurchase = async () => {
        setLoading(true);
        const stripe = await stripePromise;
        const { error } = await stripe.redirectToCheckout({
            lineItems: [{ price: 'price_1Q1xGgRraDIE2N6qGDLn8Nwr', quantity: 1 }],
            mode: 'payment',
            successUrl: `${window.location.origin}/success`,
            cancelUrl: `${window.location.origin}/cancel`,
        });

        if (error) {
            console.error('Stripe Error:', error);
            setLoading(false);
        }
    };

    return (
        <section id="price">
            <div className="plans">
                <div className="plan" onClick={onClick}>
                    <h3>Quimplo</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span className="cost">{t('price.free')}</span>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.limitedReviewTime')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.homepageFeature')}</li>
                        <li><IoIosRemoveCircleOutline className="check-icon" />{t('price.featuredSection')}</li>
                    </ul>
                    <button onClick={onClick}>{t('price.publishSite')}</button>
                </div>

                <div className="plan">
                    <h3>Quimplo featured</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                    <span className="cost">{t('price.price')}</span>
                    <ul className="features">
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.unlimitedTemplateUploads')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.reducedReviewTime')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.homepageFeature')}</li>
                        <li><IoCheckmarkCircleSharp className="check-icon" />{t('price.featuredSection')}</li>
                    </ul>
                    <button onClick={handlePurchase} disabled={loading}>
                        {loading ? 'Loading...' : t('price.develop')}
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Price;
