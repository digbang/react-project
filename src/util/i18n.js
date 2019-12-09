import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import common from 'lang/common.json'

i18n.use(initReactI18next).init({
  fallbackLng: 'en',

  // have a common namespace used around the full app
  ns: [
    'common',
  ],
  defaultNS: 'common',

  debug: true,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    wait: true,
    useSuspense: false,
  },

  resources: {
    en: {
      common,
    },
  },
})

export default i18n
