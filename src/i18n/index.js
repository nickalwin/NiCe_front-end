import { createI18n } from "vue-i18n";

import enUS from './locales/en/en.js';
import nlNL from './locales/nl/nl.js';

/**
 * Naming convention:
 * all snake_case!
 *
 * SITE_NAME.KEY = "Value"
 *
 * OR for component specific keys:
 * COMPONENT_NAME.KEY = "Value"
 *
 * OR for utility keys:
 * utils.KEY = "Value"
 */

const messages = {
    'en': enUS,
    'nl': nlNL,
}

const DEFAULT_LOCALE = import.meta.env.VITE_DEFAULT_LOCALE ?? 'nl';
const FALLBACK_LOCALE = import.meta.env.VITE_FALLBACK_LOCALE ?? 'nl';

const i18n = createI18n({
    locale: DEFAULT_LOCALE,
    fallbackLocale: FALLBACK_LOCALE,
    legacy: false,
    globalInjection: true,
    messages,
})

export default i18n;
