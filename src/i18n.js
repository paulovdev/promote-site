import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json';
import ptBR from './locales/pt-BR.json';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        'br': {
            translation: ptBR
        }
    },
    lng: 'en', // idioma padrão
    fallbackLng: 'en', // idioma fallback
    interpolation: {
        escapeValue: false // react já faz o escaping
    }
});

export default i18n;
