<template>
    <div>
        <div class="hero min-h-screen">
            <div class="hero-content text-center">
                <div>
                    <h1 class="text-5xl font-bold">Check your impact on <a class="text-5xl font-bold text-blue-800">the environment</a></h1>
                    <p class="py-6">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
                        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                        ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                        proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <div>
                    <button id="btn-getStarted" class="btn btn-primary mx-4 px-8" style="background-color: rgba(0, 0, 255, 0.685); color: white;" >Get Started</button>
                    <button id="btn-showGuide" class="btn btn-secondary mx-4 px-8">Show guide</button>
                </div>
                </div>
            </div>
        </div>
        <SummaryComponent />
        <ContactInfoComponent />
    </div>
</template>

<style>
/* homepage */
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
<script>
import { root } from "postcss";
import ContactInfoComponent from "../components/ContactInfoComponent.vue";
import SummaryComponent from "../components/SummaryComponent.vue";
export default {
    components: {
        ContactInfoComponent,
        SummaryComponent,
    },
};
</script>
