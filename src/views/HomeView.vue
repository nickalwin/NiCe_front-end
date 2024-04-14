<template>
    <div class="hero my-10 md:my-0">
        <div class="hero-content text-center px-4 md:px-0">
            <div>
                <h1 class="text-2xl md:text-5xl font-bold mt-10">
                    {{ $t("home_page.check_your_impact_1") }}
                    <a class="text-2xl md:text-5xl font-bold text-blue-800">{{ $t("home_page.check_your_impact_2") }}</a>
                </h1>
                <p class="py-6 text-sm md:text-base">
                    {{ $t("home_page.understanding_your_env") }}
                </p>
                <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center items-center">
                    <PrimaryButton
                        :label="$t('home_page.get_started')"
                        v-on:click="handleGetStarted"
                    />
                    <TernaryButton
                        :label="$t('home_page.show_guide')"
                        v-on:click="handleShowGuide"
                    />
                </div>
            </div>
        </div>
    </div>

    <ScanInfoModal ref="ScanInfoModal"
        @onContinue="() => this.$router.push('/scan')"
    />

    <SummaryComponent />

    <ContactInfoComponent />
</template>

<script>
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import SummaryComponent from "@/components/SummaryComponent.vue";
import LocalStorage from "@/helpers/LocalStorage";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import TernaryButton from "@/components/buttons/TernaryButton.vue";
import ScanInfoModal from "@/components/modals/ScanInfoModal.vue";

export default {
    components: {
        ContactInfoComponent, SummaryComponent, PrimaryButton, TernaryButton,
        ScanInfoModal,
    },
    data() {
        return {
            sectors: [],
        };
    },
    methods: {
        handleGetStarted() {
            if (LocalStorage.GetContactInfo()) {
                this.$router.push('/scan');
                return;
            }

            this.$refs.ScanInfoModal.open();
        },
        handleShowGuide() {
            this.$router.push('/guide');
        }
    }
};
</script>
