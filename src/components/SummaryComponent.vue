<template>
    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">All-in-one platform</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto">
            From adaptive questions to detailed performance reports, we've got everything you need to make
            a usefull scan for your company. Enjoy a user-friendly interface, accessible on both mobile and
            desktop, and get the support you need, when you need it.
        </p>
    </div>
    <div class="py-12">
        <div class="container mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div v-for="(infoBox, index) in infoBoxes" :key="index" class="p-4 flex">
                    <span class="mr-2 text-blue-600">&#10003;</span>
                    <div>
                        <h3 class="text-xl font-bold mb-2">{{ infoBox.title }}</h3>
                        <p class="text-gray-500 text-sm">{{ infoBox.description }}</p>
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
            // TODO: translations
            infoBoxes: [
                {
                    title: "Detailed results",
                    description: "Access comprehensive results of your test for a deep analysis"
                },
                {
                    title: "Graphs and Plots",
                    description: "Visualize your performance through interactive graphs and plots"
                },
                {
                    title: "PDF Report",
                    description: "Download a detailed PDF report of your test for offline review"
                },
                {
                    title: "Internationality",
                    description: "Experience a globally accessible platform with multi-language support"
                },
                {
                    title: "Adaptive questions",
                    description: "Engage with adaptive questions that adjust to your skill level"
                },
                {
                    title: "Reporting and Feedback",
                    description: "Receive insightful reporting and constructive feedback on your performance"
                },
                {
                    title: "Disability Features",
                    description: "Enjoy a platform designed with features to support users with disabilities"
                },
                {
                    title: "Mobile Friendly",
                    description: "Use our mobile-friendly interface for learning on the go"
                }
            ],
        };
    }
};
</script>

<style scoped>

</style>
