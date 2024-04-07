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
    <SummaryComponent />
    <ContactInfoComponent />
</template>

<script>
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import SummaryComponent from "@/components/SummaryComponent.vue";
import PopupHelper from "@/helpers/PopupHelper.js";
import LocalStorage from "@/helpers/LocalStorage";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import TernaryButton from "@/components/buttons/TernaryButton.vue";

export default {
    components: {
        ContactInfoComponent, SummaryComponent, PrimaryButton, TernaryButton,
    },
    data() {
        return {
            sectors: []
        };
    },
    methods: {
        loadSectorsFromAPI() {
            return axios.get('/api/sectors', {

            }).then((response) => {
                let sectors = response.data;

                sectors.forEach((sector) => {
                    this.sectors.push({
                        id: sector.id,
                        data: JSON.parse(sector.data),
                    });
                });
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            });
        },
        async handleGetStarted() {
            if (LocalStorage.GetContactInfo()) {
                this.$router.push('/scan');
                return;
            }

            const popup = (sectors) => PopupHelper.DisplaySectorPopup(
                'Enter scan information', sectors, this.$i18n.locale, true,
                (Result) =>
            {
                let sector = this.sectors.find((sector) => sector.id === parseInt(Result[2]));

                LocalStorage.SetContactInfo({
                    name: Result[0],
                    email: Result[1],
                    sector: sector,
                });

                this.$router.push('/scan');
            });

            if (!this.sectors.length)
                this.loadSectorsFromAPI().then(() => {
                    popup(this.sectors);
                });
            else
                popup(this.sectors);
        },
        handleShowGuide() {
            this.$router.push('/guide');
        }
    }
};
</script>
