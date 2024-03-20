<template>
    <div class="text-center">
        <h3 class="text-2xl font-bold mb-2">
            {{ $t("summary_component.all_in_one") }}
        </h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto">
            {{ $t("summary_component.all_in_one_desc") }}
        </p>
    </div>
    <div class="py-12">
        <div class="container mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
                <div v-for="(infoBox, index) in infoBoxes" :key="index" class="p-4 flex">
                    <span class="mr-2 text-blue-600">&#10003;</span>
                    <div>
                        <h3 class="text-xl font-bold mb-2">{{ $t("summary_component." + infoBox.title) }}</h3>
                        <p class="text-gray-500 text-sm">{{ $t("summary_component." + infoBox.description) }}</p>
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
            infoBoxes: [
                {
                    title: "detailed_results",
                    description: "detailed_results_desc"
                },
                {
                    title: "graphs_and_plots",
                    description: "graphs_and_plots_desc"
                },
                {
                    title: "pdf_reports",
                    description: "pdf_reports_desc"
                },
                {
                    title: "internationality",
                    description: "internationality_desc"
                },
                {
                    title: "adaptive_questions",
                    description: "adaptive_questions_desc"
                },
                {
                    title: "reporting_and_feedback",
                    description: "reporting_and_feedback_desc"
                },
                {
                    title: "disability_features",
                    description: "disability_features_desc"
                },
                {
                    title: "mobile_friendly",
                    description: "mobile_friendly_desc"
                }
            ],
        };
    }
};
</script>

<style scoped>

</style>
