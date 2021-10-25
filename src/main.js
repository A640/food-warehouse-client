import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from 'store-path';
import vuetify from './plugins/vuetify';
import i18next from 'i18next';
import VueI18Next from '@panter/vue-i18next';

import en from '@/localization/en/translations.json'
import pl from '@/localization/pl/translations.json'

Vue.use(VueI18Next);

i18next.init({
  supportedLngs: ['en', 'pl'],
  lng: 'en',
  fallbackLng: "en",
  detection: {
    order: [ 'path', 'cookie', 'htmlTag'],
    caches: ['cookie'],
  },
  
  resources: {
      en: { translation: en },
      pl: { translation: pl },
  }
});

const i18n = new VueI18Next(i18next);

Vue.config.productionTip = false


new Vue({
  router,
  store,
  vuetify,
  i18n: i18n,
  render: h => h(App),
}).$mount('#app')
