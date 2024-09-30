import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ReactQuill from 'react-quill';

import { FaExclamationCircle } from 'react-icons/fa';

import 'react-quill/dist/quill.snow.css';
import "./DescriptionDetail.scss"

const DescriptionDetail = ({
    descriptionDetail: initialDescriptionDetail,
    setDescriptionDetail,
    setStep
}) => {
    const { t } = useTranslation();
    const [descriptionDetail, setDescriptionDetailState] = useState(initialDescriptionDetail || sessionStorage.getItem('descriptionDetail') || '');
    const [submitted, setSubmitted] = useState(false);
    const [errors, setErrors] = useState({ descriptionDetail: '' });

    useEffect(() => {
        sessionStorage.setItem('descriptionDetail', descriptionDetail);
    }, [descriptionDetail]);

    const validate = () => {
        const newErrors = {};
        if (descriptionDetail.length < 30) {
            newErrors.descriptionDetail = t('yourInfoStep.descriptionLength'); // Mensagem de erro personalizada
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (value) => {
        setDescriptionDetailState(value);
        setDescriptionDetail(value);
    };

    const handleContinue = () => {
        setSubmitted(true);
        if (validate()) {
            setStep((prev) => prev + 1);
        }
    };

    // Configuração do editor
    const modules = {
        toolbar: [
            [{ 'header': [1, false] }],
            ['bold', 'italic', 'underline'],
        ],
    };

    const formats = [
        'header',
        'bold', 'italic', 'underline',
        'clean',
    ];

    return (
        <>
            <section id='detail-description'>
                <div className="error-message" style={{ marginBottom: "2rem" }}>
                    {submitted && errors.descriptionDetail && <p><FaExclamationCircle />{errors.descriptionDetail}</p>}
                </div>

                <ReactQuill
                    value={descriptionDetail}
                    onChange={handleChange}
                    placeholder={t('yourInfoStep.detailDescription')}
                    modules={modules}
                    formats={formats}
                />

            </section>
            <div className="step-buttons">
                <button type="button" className="secondary-button" onClick={() => setStep((prev) => prev - 1)}>
                    {t('yourInfoStep.back')}
                </button>
                <button type="button" className="primary-button" onClick={handleContinue}>
                    {t('yourInfoStep.continue')}
                </button>
            </div>
        </>
    );
};

export default DescriptionDetail;
