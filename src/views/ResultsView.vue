<template>
    <LoadingTemplate :isLoading="isLoadingResults" :center="true" :size="'4x'">
        <!-- <div v-if="$i18n.locale === 'en'">
            <div class="mt-10 bg-red-500 text-white rounded-lg shadow-lg p-10 leading-normal">
                <h1 class="text-2xl md:text-3xl font-bold mb-4">
                    Attention Finance and Control Students
                </h1>
                <p class="text-base md:text-lg">
                    Once you've finished using the tool, we kindly ask you to fill in our survey. Your feedback is invaluable to us. Thank you!
                </p>
                <a href="https://forms.gle/siGiSVgDgkE4QfJKA" class="mt-4 inline-block bg-white text-red-500 px-5 py-2 rounded font-bold text-lg">Go to Survey</a>
            </div>
        </div>
        <div v-else>
            <div class="mt-10 bg-red-500 text-white rounded-lg shadow-lg p-10 leading-normal">
                <h1 class="text-2xl md:text-3xl font-bold mb-4">
                    Attentie Financiën en Controle Studenten
                </h1>
                <p class="text-base md:text-lg">
                    Zodra je klaar bent met het gebruik van de tool, vragen we je vriendelijk om onze enquête in te vullen. Jouw feedback is van onschatbare waarde voor ons. Dank je wel!
                </p>
                <a href="https://forms.gle/siGiSVgDgkE4QfJKA" class="mt-4 inline-block bg-white text-red-500 px-5 py-2 rounded font-bold text-lg">Ga naar Enquête</a>
            </div>
        </div> -->

        <div class="hero mt-10">
            <h1 class="text-4xl font-bold">
                {{ $t('results_page.main_header') }}
            </h1>
        </div>
        <div class="hero mt-10">
            <PrimaryButton :label="$t('results_page.download_pdf')"
                @onClick="generatePDF"
            />
        </div>
        <div class="hero mt-10">
            <p class="text-lg">
                {{ $t('results_page.main_text') }}
            </p>
        </div>
        <div class="hero mt-10">
            <img src="/info.png" width="700" alt="No image provided" />
        </div>
        <div class="card mt-10 bg-gray-100 shadow-xl">
            <div class="items-center text-center md:p-10">
                <Bar id="plot" v-if="plotData" :data="plotData" :options="options" />
            </div>
        </div>

        <div id="CategoryQuestionTable">
            <CategoryQuestionTableComponent ref="CategoryQuestionTableComponent"
                v-if="scan" :data="scan.data" :categories="categoriesWithMeans" :isEditable="isEditable"
                @answerUpdated="updateScanResults"
            />
        </div>

        <CategoryDetailInfo v-if="plotData"
            ref="CategoryDetailInfo"
            :data="plotData" class="mt-10"
            :allLabelsWithCategoryUuid="allLabelsWithCategoryUuid"
            :categories="scan.data"
        />

        <span v-if="isEditable" v-on:click="removeContactInfo" class="hover:text-gray-400 font-bold py-2 px-4 cursor-pointer hover:bg-gray-200 rounded-lg" style="float: right;">
            <FontAwesomeIcon icon="fa-trash" color="red" />
        </span>

        <div class="mt-10">
            <FooterComponent />
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
import ContactInfoComponent from "@/components/ContactInfoComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import CategoryQuestionTableComponent from "@/components/CategoryQuestionTableComponent.vue";
import CategoryDetailInfo from '@/components/CategoryDetailInfo.vue';
import PDFGenerator from '@/helpers/PDFGenerator';
import i18n from '@/i18n';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default {
    components: {
        Bar, LoadingTemplate, PrimaryButton, ContactInfoComponent, CategoryQuestionTableComponent,
        CategoryDetailInfo, FooterComponent
    },
    data() {
        return {
            colors: {
                'goud': '#ffcb05',
                'appelgroen': '#45b97c',
                'lichtroze': '#f287b7',
                'blauw': '#4594d3',
                'lichtblauw': '#84D0D9',
                'donkerroze': '#f16682'
            },
            categories: [],
            scan: null,
            plotData: null,
            allLabelsWithCategoryUuid: [],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                barThickness: 50,
                scale: {
                    x: {
                        ticks: {
                            autoSkip: true,
                            maxRotation: 0,
                            minRotation: 0
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 5
                    }
                },
            },
            isLoadingResults: false,
            categoriesWithMeans: null,
            isEditable: false,
        }
    },
    methods: {
        getLocalizedCategoryName(data) {
            return data[this.$i18n.locale] ?
                    data[this.$i18n.locale].name :
                    data['nl'].name;
        },
        updateScanResults(groupIndex) {
            this.loadScanWithResults(this.$route.params.uuid, () => {
                this.$nextTick(() => {
                    document.getElementById('CategoryQuestionTable').scrollIntoView({ behavior: 'smooth' });

                    this.$refs.CategoryQuestionTableComponent.selectGroupByIndex(groupIndex);
                });
            });
        },
        loadScanWithResults(uuid, cbck = () => {}) {
            this.isLoadingResults = true;

            this.allLabelsWithCategoryUuid = [];

            axios.get(`/api/scans/${uuid}`, {

            }).then(response => {
                this.scan = response.data;
                let results = JSON.parse(this.scan.results);

                var getColorForCategory = (category) => {
                    return this.scan.data.find((data) => {
                        return data.category_uuid === category.category_uuid;
                    }).color;
                }

                results.forEach((category) => {
                    this.categories.push({
                        uuid: category.category_uuid,
                        data: JSON.parse(category.category_data),
                    });
                });

                let allLabels = [];
                let allData = [];
                let allDataColors = [];

                this.categoriesWithMeans = [];

                results.forEach((category) => {
                    var data = JSON.parse(category.category_data);

                    allLabels.push(
                        this.getLocalizedCategoryName(data)
                    );

                    this.allLabelsWithCategoryUuid.push({
                        label: this.getLocalizedCategoryName(data),
                        uuid: category.category_uuid,
                    });

                    allData.push(category.mean);
                    allDataColors.push(this.colors[getColorForCategory(category)]);

                    this.categoriesWithMeans.push({
                        category: {
                            ...category,
                            color: this.colors[getColorForCategory(category)],
                        },
                    });
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
                    label: i18n.global.t('results_page.your_results'),
                    backgroundColor: allDataColors,
                    data: allData
                });

                if (averageResults.length > 0) {
                    datasets.push({
                        label: i18n.global.t('results_page.average_results'),
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

                cbck();
            });
        },
        reloadBarChartTranslations() {
            let copy = this.plotData;
            this.plotData = [];

            let allLabels = [];

            let results = JSON.parse(this.scan.results);

            results.forEach((category) => {
                var data = JSON.parse(category.category_data);

                allLabels.push(
                    this.getLocalizedCategoryName(data)
                );
            });

            this.plotData = {
                labels: allLabels,
                datasets: copy.datasets
            }
        },
        generatePDF() {
            axios.get('/api/pdf', {

            }).then((response) => {
                var locales = {
                    Title: JSON.parse(response.data.title),
                    Introduction: JSON.parse(response.data.introduction),
                    Image: response.data.imageData,
                    BeforePlot: JSON.parse(response.data.beforePlotText),
                    AfterPlot: JSON.parse(response.data.afterPlotText),
                };

                var answersData = this.$refs.CategoryQuestionTableComponent.getGroupedQuestions();
                var perCategoryData = this.$refs.CategoryDetailInfo.getDisplayData();
                var generator = new PDFGenerator(answersData, perCategoryData, locales);

                generator.generatePDF();

            }).catch((error) => {
                PopupHelper.DisplayErrorPopup("Failed to generate PDF.");
            });
        },
        removeContactInfo() {
            PopupHelper.DisplayDangerousDeleteQuestionPopup(() => {
                axios.delete(`/api/scans/${this.$route.params.uuid}/deleteContactInfo`, {

                }).then(() => {
                    PopupHelper.DisplaySuccessPopup("Contact information removed.", () => {
                        localStorage.removeItem('lastCodes');
                        localStorage.removeItem('contactInfo');

                        this.$router.push(RouteList.Home);
                    });
                }).catch(error => {
                    PopupHelper.DisplayErrorPopup("Failed to remove contact information.");
                });
            });
        },
        validateScanCode() {
            axios.get(`/api/scan-codes/${this.$route.params.code}`, {

            }).then((response) => {
                this.isEditable = response.data.editable;
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            });
        }
    },
    watch: {
        '$i18n.locale': function() {
            this.reloadBarChartTranslations();
        },
    },
    mounted() {
        document.documentElement.setAttribute("data-theme", "goud");

        this.loadScanWithResults(this.$route.params.uuid);
        this.validateScanCode();
    }
}
</script>

<style scoped>
.results-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.result-card {
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.result-label {
  font-size: 1.2em;
  color: #333;
}

.result-score {
  font-size: 1em;
  color: #666;
}
</style>
