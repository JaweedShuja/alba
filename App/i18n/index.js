import i18n from 'i18n-js';
import {I18nManager} from 'react-native';
import * as RNLocalize from 'react-native-localize';
import memoize from 'lodash.memoize';
import LocalizedStrings from 'react-native-localization';
import {useSelector} from 'react-redux';
import en from './en';
import ar from './ar';
i18n.translations = {
  en,
  ar,
};
export const string = new LocalizedStrings({
  en,
  ar,
});
// const state = useSelector(state => state.appData.region);
// console.log({state});
export const translate = memoize(
  (key, config) => i18n.t(key, config),
  (key, config) => (config ? key + JSON.stringify(config) : key),
);
i18n.fallbacks = true;

//const defaultLanguage = {languageTag: 'en', isRTL: false};
const arabicLang = {languageTag: 'ar', isRTL: true};
const availableLanguages = Object.keys(i18n.translations);
console.log({availableLanguages});
//const {languageTag, isRTL} =
//RNLocalize.findBestAvailableLanguage(availableLanguages) || arabicLang;
//RNLocalize.findBestAvailableLanguage(arabicLang);
I18nManager.forceRTL(true);
//console.log({languageTag, isRTL});

i18n.locale = 'ar';

translate.cache.clear();

export default i18n;
