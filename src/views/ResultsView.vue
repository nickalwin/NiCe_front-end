<template>
    <LoadingTemplate :isLoading="isLoadingResults" :center="true" :size="'4x'">
        <div class="hero mt-10">
            <h1 class="text-4xl font-bold">Rapport Circulaire scan</h1>
        </div>
        <div class="hero mt-10">
            <PrimaryButton :label="'Download PDF'" />
        </div>
        <div class="hero mt-10">
            <p class="text-lg">
                Bedankt voor het invullen van de circulaire scan. In dit document kun u uw resultaten vinden. Het rapport is ingedeeld in de 6 hoofd categorieën van de test innovatie, productie, ketensamenwerking, arbeid, facilitair en ambitie. Het model kunt u hieronder vinden. Hoe hoger u op een categorie scoort, hoe beter u al bezig bent met de circulaire economie op dat gebied.
            </p>
        </div>
        <div class="hero mt-10">
            <img src="/info.png" width="700" alt="No image provided" />
        </div>
        <div class="card mt-10 bg-base-100 shadow-xl">
            <div class="card-body items-center text-center">
                <Bar v-if="plotData" :data="plotData" :options="options" />
            </div>
        </div>
    </LoadingTemplate>
</template>

<script>
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { Bar } from 'vue-chartjs'
import RouteList from "@/helpers/RouteList.js";
import PopupHelper from "@/helpers/PopupHelper.js";
import LoadingTemplate from '@/components/utils/LoadingTemplate.vue';
import PrimaryButton from '@/components/buttons/PrimaryButton.vue';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    components: {
        Bar, LoadingTemplate, PrimaryButton,
    },
    data() {
        return {
            categories: [],
            scan: null,
            plotData: null,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 50,
                scale: {
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                }
            },
            isLoadingResults: false
        }
    },
    methods: {
        loadScanWithResults(uuid) {
            this.isLoadingResults = true;

            axios.get(`/api/scans/${uuid}`, {

            }).then(response => {
                this.scan = response.data;
                let results = JSON.parse(this.scan.results);

                results.forEach((category) => {
                    this.categories.push({
                        uuid: category.category_uuid,
                        name: category.category_name,
                    });
                });

                let allLabels = [];
                let allData = [];

                results.forEach((category) => {
                    allLabels.push(category.category_name);
                    allData.push(category.mean);
                });

                var averageResults = JSON.parse(this.scan.average_results);

                let averageData = [];

                this.categories.forEach((category) => {
                    averageResults.forEach((average) => {
                        if (category.uuid === average.Category_uuid) {
                            averageData.push(average.Mean);
                        }
                    });
                });

                var datasets = [];

                datasets.push({
                    label: "Your results",
                    backgroundColor: ['#FFFF00', '#FFEA00', '#FFD700', '#FFC400', '#FFB200', '#FFA000', '#FF8E00', '#FF7C00'],
                    data: allData
                });

                if (averageResults.length > 0) {
                    datasets.push({
                        label: "Average results",
                        backgroundColor: ['#FF0000', '#EA0000', '#D70000', '#C40000', '#B20000', '#A00000', '#8E0000', '#7C0000'],
                        data: averageData
                    });
                }

                this.plotData = {
                    labels: allLabels,
                    datasets: datasets
                }
            }).catch(error => {
                PopupHelper.DisplayErrorPopup("Failed to load questions.", () => {
                    this.$router.push(RouteList.Home);
                });
            }).finally(() => {
                this.isLoadingResults = false;
            });
        }
    },
    mounted() {
        this.loadScanWithResults(this.$route.params.uuid);
    }
}
</script>
