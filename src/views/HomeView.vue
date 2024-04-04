<template>
    <div>
        <div class="hero my-10">
            <div class="hero-content text-center">
                <div>
                    <h1 class="text-5xl font-bold">
                        {{ $t("home_page.check_your_impact_1") }}
                        <a class="text-5xl font-bold text-blue-800">{{ $t("home_page.check_your_impact_2") }}</a>
                    </h1>
                    <p class="py-6">
                        {{ $t("home_page.understanding_your_env") }}
                    </p>
                    <div class="flex justify-center">
                        <PrimaryButton class="mr-4"
                            :label="$t('home_page.get_started')"
                            v-on:click="handleGetStarted"
                        />
                        <TernaryRouterLink
                            :label="$t('home_page.show_guide')"
                            :to="'/guide'"
                        />
                    </div>
                </div>
            </div>
        </div>
        <SummaryComponent />
        <ContactInfoComponent />
    </div>
</template>

<script>
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import SummaryComponent from "@/components/SummaryComponent.vue";
import PrimaryRouterLink from "@/components/router-links/PrimaryRouterLink.vue";
import TernaryRouterLink from "@/components/router-links/TernaryRouterLink.vue";
import PopupHelper from "@/helpers/PopupHelper.js";
import LocalStorage from "@/helpers/LocalStorage";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";

export default {
    components: {
        ContactInfoComponent, SummaryComponent, PrimaryRouterLink, TernaryRouterLink, PrimaryButton,
        TernaryRouterLink,
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
        }
    }
};
</script>
