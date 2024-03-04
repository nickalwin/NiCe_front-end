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
                        <PrimaryRouterLink
                            :to="'/scan'"
                            :label="'Get Started'"
                        />
                        <TernaryRouterLink
                            :to="'/guide'"
                            :label="'Show Guide'"
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

export default {
    components: {
        ContactInfoComponent, SummaryComponent, PrimaryRouterLink, TernaryRouterLink,
    },
};
</script>
