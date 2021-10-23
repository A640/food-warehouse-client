import en from '@/localization/en/translations.json'
import pl from '@/localization/pl/translations.json'

console.log('pl',pl);
console.log('en',en);

export default {
    lng: 'pl',
    fallbackLng: "en",
    resources: {
        en: { common: en },
        pl: { common: pl },
    }
};