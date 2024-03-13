<template>
    <div>
        <div class="hero my-10">
            <Pie v-if="plotData" :data="plotData" :options="options" />
        </div>
    </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import RouteList from "@/helpers/RouteList.js";
import PopupHelper from "@/helpers/PopupHelper.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default {
    components: {
        Pie
    },
    data() {
        return {
            categories: [],
            scan: null,
            plotData: null,
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        }
    },
    methods: {
        loadScanWithResults(uuid) {
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

                this.plotData = {
                    labels: allLabels,
                    datasets: [
                        {
                            backgroundColor: ['#FFFF00', '#FFEA00', '#FFD700', '#FFC400', '#FFB200', '#FFA000', '#FF8E00', '#FF7C00'],                            data: allData
                        }
                    ]
                }
            })
            .catch(error => {
                PopupHelper.DisplayErrorPopup("Failed to load questions.", () => {
                    this.$router.push(RouteList.Home);
                });
            });
        }
    },
    mounted() {
        this.loadScanWithResults(this.$route.params.uuid);
    }
}
</script>
