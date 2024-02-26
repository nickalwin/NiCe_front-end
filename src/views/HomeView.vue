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
                        <button id="btn-getStarted" class="btn btn-primary mx-4 px-8" style="background-color: rgba(0, 0, 255, 0.685); color: white;" >
                            Get Started
                        </button>
                        <button id="btn-showGuide" class="btn btn-secondary mx-4 px-8">
                            Show guide
                        </button>
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

export default {
    components: {
        ContactInfoComponent, SummaryComponent,
    },
};
</script>

<style scoped>
    #btn-getStarted {
        background-color: var(--button-primary);
        color: var(--button-primary-text);
    }
    #btn-getStarted:hover {
        background-color: var(--button-primary-hover);
    }
    #btn-showGuide {
        background-color: var(--button-secondary);
        color: var(--button-secondary-text);
        border: none;
        box-shadow: 0px 0px 4px 2px rgba(0, 0, 0, 0.2);
    }
    #btn-showGuide:hover {
        background-color: var(--button-secondary-hover);
    }
</style>
