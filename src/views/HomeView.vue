<template>
    <div>
        <div class="hero my-10">
            <div class="hero-content text-center">
                <div>
                    <h1 class="text-5xl font-bold">Check your impact on <a class="text-5xl font-bold text-blue-800">the environment</a></h1>
                    <p class="py-6">
                        Understanding your environmental impact is the first step towards making more sustainable choices.
                    </p>
                    <div>
                        <!-- <RouterLink
                            class="submit-button mr-4 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                            to="/scan"
                        >
                            Get Started
                        </RouterLink> -->
                        <button
                            class="submit-button mr-4 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                            v-on:click="handleGetStarted"
                        >
                            Get Started
                        </button>
                        <RouterLink
                            class="submit-button bg-white hover:bg-gray-300 text-blue-500 text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                            to="/guide"

                        >
                            Show Guide
                        </RouterLink>
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
import PopupHelper from "@/helpers/PopupHelper.js";
import { Result } from "postcss";

const sectors = ['Technology', 'Finance', 'Healthcare'];

export default {
    components: {
        ContactInfoComponent, SummaryComponent,
    },
    methods: {
        handleGetStarted() {
            PopupHelper.DisplaySectorPopup('Enter scan information', sectors, (Result) => {
                console.log('Sector selected: ', Result);
                this.$router.push({
                    name: 'scan',
                    query: { 
                        name: Result[0],
                        email: Result[1],
                        sector: Result[2] }
                });
            });
        }
    }
};
</script>
