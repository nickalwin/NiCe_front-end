<template>
    <div class="hero my-10 md:my-0">
        <div class="hero-content text-center px-4 md:px-0">
            <div>
                <h1 class="text-2xl md:text-5xl font-bold mt-10">
                    {{ $t("home_page.slogan") }}
                    <a class="text-2xl md:text-5xl font-bold text-blue-800">
                        {{ $t("home_page.slogan_begin") }}
                    </a>
                </h1>

                <div class="flex mt-6 flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4 justify-center items-center">
                    <PrimaryButton
                        :label="$t('home_page.get_started')"
                        v-on:click="handleGetStarted"
                    />
                    <!-- <TernaryButton
                        :label="$t('home_page.show_guide')"
                        v-on:click="handleShowGuide"
                    /> -->
                </div>

                <p class="py-6 text-sm md:text-base">
                    {{ $t("home_page.slogan_desc") }}
                </p>

                <div class="hero mt-10">
                    <img src="/info.png" width="700" alt="No image provided" />
                </div>
            </div>
        </div>
    </div>

    <ScanInfoModal ref="ScanInfoModal"
        @onContinue="() => this.$router.push('/scan')"
        @onCancel="() => this.$refs.ScanInfoModal.close()"
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
    },
    mounted() {
        document.documentElement.setAttribute("data-theme", "goud");
    }
};
</script>
