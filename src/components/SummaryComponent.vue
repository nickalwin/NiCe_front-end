<template>
    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">All-in-one platform</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
            ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    </div>
    <div class="py-12">
        <div class="container mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div v-for="(title, index) in platformInfo.titles" :key="index" class="p-4 flex">

                    <span class="text-green-500 mr-2">&#10003;</span>
                    <div>
                        <h3 class="text-xl font-bold mb-2">{{ title }}</h3>
                        <p class="text-gray-500 text-sm">{{ platformInfo.descriptions[index] }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            platformInfo: {
                titles: ["Detailed results", "Graphs and Plots", "PDF Report", "Internationality", "Asaptive questions", "Reporting and Feedback", "disability Friendly", "mobile Friendly"],
                descriptions: ["Get detailed results of your test", "View graphs and plots of your performance", "Download a PDF report of your test", "Internationality", "Adaptive questions", "Reporting and Feedback", "Disability Friendly", "Mobile Friendly"],
            }
        };
    }
};
</script>

<style scoped></style>
