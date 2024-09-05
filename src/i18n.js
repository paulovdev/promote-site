import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import en from './locales/en.json';
import br from './locales/br.json';

const savedLanguage = Cookies.get('language') || 'en';

i18n.use(initReactI18next).init({
    resources: {
        en: {
            translation: en
        },
        br: {
            translation: br
        }
    },
    lng: savedLanguage, // Define o idioma inicial com base no cookie ou no padrão
    fallbackLng: 'en', // idioma fallback
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
