import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Cookies from 'js-cookie';
import en from './src/locales/en.json';
import br from './src/locales/br.json';

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
    lng: savedLanguage,
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false
    }
});

// Definir cookie seguro
Cookies.set('language', savedLanguage, {
    secure: true, // Envia apenas via HTTPS
    sameSite: 'Strict' // Proteção contra CSRF
});

export default i18n;
