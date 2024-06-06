<template>
    <EN_PrivacyPolicy v-if="$i18n.locale === 'en'" />
    <EN_CookiePolicy v-if="$i18n.locale === 'en'" />
    <NL_PrivacyPolicy v-if="$i18n.locale === 'nl'" />
    <NL_CookiePolicy v-if="$i18n.locale === 'nl'" />
</template>

<script>
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import EN_PrivacyPolicy from "@/i18n/locales/en/EN_PrivacyPolicy.vue";
import EN_CookiePolicy from "@/i18n/locales/en/EN_CookiePolicy.vue";
import NL_PrivacyPolicy from "@/i18n/locales/nl/NL_PrivacyPolicy.vue";
import NL_CookiePolicy from "@/i18n/locales/nl/NL_CookiePolicy.vue";

export default {
    components: {
        ContactInfoComponent, EN_PrivacyPolicy, EN_CookiePolicy, NL_PrivacyPolicy, NL_CookiePolicy,
    },
    mounted() {
        document.documentElement.setAttribute("data-theme", "goud");
    }
};
</script>
