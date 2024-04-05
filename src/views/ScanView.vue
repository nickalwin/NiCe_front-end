<template>
    <LoadingTemplate :isLoading="loadingQuestions" :center="true" :size="'4x'">
        <div v-if="name && email && selectedSector" class="flex justify-between p-5">
            <h1 class="text-5xl font-bold mb-10 first-letter:uppercase text-blue-900">
                {{ name }} {{ $t('fields.somebodys_scan') }}
            </h1>
            <div class="flex m-1">
                <div class="input input-disabled mx-1">
                    <input class="input border-none rounded p-2 text-blue-900" type="email" :value="email" disabled />
                    <span v-on:click="handleEditEmail" class="hover:text-gray-400 font-bold py-2 cursor-pointer hover:bg-blue-200 rounded">
                        <FontAwesomeIcon icon="fa-edit" />
                    </span>
                </div>
                <span class="select select-bordered bg-transparent mx-1 rounded p-2">
                    {{ getLocalizedSectorName(selectedSector) }}
                </span>
                <!-- TODO proper email and sector change! -->
                <!-- <select v-model="selectedSector" class="select select-bordered bg-transparent mx-1 rounded p-2 text-blue-900" disabled>
                    <option v-for="sector in sectors" :key="sector.id" :value="sector.id">
                        {{ getLocalizedSectorName(sector) }}
                    </option>
                </select> -->
            </div>
        </div>
        <div class="flex justify-center">
            <div class="overflow-x-auto">
                <ul class="steps">
                    <li v-for="(question, index) in current_category.questions"
                        :class="`step ${isQuestionPicked(question) ? '' : isQuestionAnswered(question) ? 'step-warning' : 'step-error'} ${isQuestionPicked(question) ? 'step-info' : ''}`"
                        :data-content="`${isQuestionAnswered(question) ? '✓' : 'X'}`"
                        v-on:click="() => { jumpToQuestion(question.uuid) }"
                    >
                        {{ index + 1 }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex w-full mt-10">
            <div class="flex-grow md:flex-shrink md:w-2/3">
                <div class="card flex-grow">
                    <div class="bg-base-100 shadow-xl">
                        <div class="card-body" v-if="current_question.data">
                            <div class="flex items-center justify-between">
                                <h2 class="card-title">
                                    {{
                                        current_question.is_statement ?
                                        $t('fields.statement') :
                                        $t('fields.question')
                                    }}
                                </h2>
                                <div class="tooltip tooltip-info"
                                    :data-tip="getLocalizedTooltip()">
                                    <button class="btn btn-info rounded-full">
                                        <FontAwesomeIcon icon="fa-info" />
                                    </button>
                                </div>
                            </div>

                            <p>
                                {{ getLocalizedQuestion() }}
                            </p>

                            <img :src="current_question.image" alt="No image provided" />

                            <div class="rating rating-lg flex items-center justify-center">
                                <div class="text-lg font-semibold text-gray-600">
                                    {{ $t('scan_page.low_score') }}
                                </div>
                                <div class="flex justify-center mx-4">
                                    <input type="radio" class="rating-hidden text-xl" value="-1"
                                        v-model="current_question.answer" />
                                    <input type="radio" class="mask mask-star-2 bg-gray-500 text-5xl" value="1"
                                        v-model="current_question.answer" />
                                    <input type="radio" class="mask mask-star-2 bg-gray-500 text-xl" value="2"
                                        v-model="current_question.answer" />
                                    <input type="radio" class="mask mask-star-2 bg-gray-500 text-xl" value="3"
                                        v-model="current_question.answer" />
                                    <input type="radio" class="mask mask-star-2 bg-gray-500 text-xl" value="4"
                                        v-model="current_question.answer" />
                                    <input type="radio" class="mask mask-star-2 bg-gray-500 text-xl" value="5"
                                        v-model="current_question.answer" />
                                </div>
                                <div class="text-lg font-semibold text-gray-600">
                                    {{ $t('scan_page.high_score') }}
                                </div>
                            </div>
                            <div class="tooltip-container">
                                <div class="tooltip tooltip-info" :data-tip="$t('scan_page.give_extra_feedback')">
                                    <span v-if="isEyeOpen" class="text-lg font-bold" v-on:click="toggleEye(false)">
                                        <FontAwesomeIcon icon="fa-eye" />
                                    </span>
                                    <span v-else class="text-lg font-bold " v-on:click="toggleEye(true)">
                                        <FontAwesomeIcon icon="fa-eye-slash" />
                                    </span>
                                </div>
                                <div>
                                    <textarea v-model="current_question.comment" v-if="!isEyeOpen"
                                        class="w-full h-24 mt-4 p-4 bg-gray-100 rounded"
                                        :placeholder="$t('scan_page.add_a_comment')"/>
                                </div>
                            </div>
                            <div class="card-actions justify-end">
                                <PrimaryButton :label="$t('utils.next')" :disabled="current_question.answer === -1"
                                    @onClick="jumpToNextQuestion" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ml-5 grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div class="flex-grow md:max-w-1/4 lg:max-w-full">
                    <ul class="steps steps-vertical">
                        <li v-for="category in categories"
                            :class="`step ${isCategoryPicked(category) ? '' : isCategoryCompleted(category) ? 'step-warning' : 'step-error'} ${isCategoryPicked(category) ? 'step-info' : ''}`"
                            :data-content="`${category.is_completed ? '✓' : '●'}`"
                            v-on:click="() => { jumpToCategory(category.uuid) }">
                            <div class="text-xs sm:text-sm md:text-base">
                                {{ getLocalizedCategoryName(category) }}
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="mt-10">
            <SummaryComponent />
        </div>
    </LoadingTemplate>
</template>

<script>
import SummaryComponent from "@/components/SummaryComponent.vue";
import PopupHelper from "@/helpers/PopupHelper.js";
import PrimaryButton from "@/components/buttons/PrimaryButton.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoadingTemplate from "@/components/utils/LoadingTemplate.vue";
import RouteList from "@/helpers/RouteList.js";
import LocalStorage from "@/helpers/LocalStorage";

export default {
    components: { SummaryComponent, PrimaryButton, FontAwesomeIcon, LoadingTemplate },
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
            isEyeOpen: true,
            loadingQuestions: false,
            sectors: [],
            name: null,
            email: null,
            selectedSector: null,
        }
    },
    methods: {
        isQuestionAnswered(question) {
            return question.answer !== -1;
        },
        isQuestionPicked(question) {
            return question.uuid === this.current_question.uuid;
        },
        isCategoryCompleted(category) {
            return category.is_completed;
        },
        isCategoryPicked(category) {
            return category.uuid === this.current_category.uuid;
        },
        jumpToQuestion(questionUuid) {
            this.current_question = this.current_category.questions.find((q) => q.uuid === questionUuid);
        },
        jumpToCategory(categoryUuid) {
            this.current_category = this.categories.find((c) => c.uuid === categoryUuid);

            if (this.areAllQuestionsFromCategoryAnswered(this.current_category)) {
                this.current_question = this.current_category.questions[0];
            } else {
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
            }
        },
        jumpToNextQuestion() {
            if (this.areAllQuestionsFromCategoryAnswered(this.current_category)) {
                this.jumpToNextCategory();
            } else {
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
            }

            this.saveAnswersToLocalStorage();
        },
        areAllQuestionsFromCategoryAnswered(category) {
            return category.questions.every((q) => q.answer !== -1);
        },
        getFirstNonAnsweredQuestion(category) {
            return category.questions.find((q) => q.answer === -1);
        },
        getFirstNonCompletedCategory() {
            return this.categories.find((c) => !c.is_completed);
        },
        areAllCategoriesCompleted() {
            return this.categories.every((c) => c.is_completed);
        },
        jumpToNextCategory() {
            this.current_category.is_completed = true;

            if (this.areAllCategoriesCompleted()) {
                this.onScanCompleted();
            } else {
                this.current_category = this.getFirstNonCompletedCategory();
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
            }

            this.saveAnswersToLocalStorage();
        },
        saveAnswersToLocalStorage() {
            var answers = this.categories.map((c) => {
                return {
                    category_uuid: c.uuid,
                    category_data: c.data,
                    is_completed: c.is_completed,
                    questions: c.questions.map((q) => {
                        return {
                            question_uuid: q.uuid,
                            answer: q.answer,
                            comment: q.comment ?? null,
                            is_statement: q.is_statement,
                            data: q.data,
                            image: q.image,
                        }
                    })
                }
            });

            LocalStorage.SetScanResults(answers);
        },
        loadQuestions() {
            var answers = LocalStorage.GetScanResults();

            if (answers) {
                this.loadQuestionsFromLocalStorage(answers);
            } else {
                this.loadQuestionsFromApi();
            }
        },
        loadQuestionsFromLocalStorage(answers) {
            answers.forEach((c) => {
                var category = {
                    uuid: c.category_uuid,
                    data: c.category_data,
                    is_completed: c.is_completed,
                    questions: c.questions.map((q) => {
                        return {
                            uuid: q.question_uuid,
                            answer: q.answer,
                            comment: q.comment,
                            is_statement: q.is_statement,
                            data: q.data,
                            image: q.image,
                        }
                    })
                }

                this.categories.push(category);
            });

            this.current_category = this.getFirstNonCompletedCategory();
            this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
        },
        loadQuestionsFromApi() {
            this.loadingQuestions = true;

            axios.get('/api/questions', {

            }).then((response) => {
                var questions = response.data;

                questions.forEach((q) => {
                    var questionData = JSON.parse(q.data);

                    var question = {
                        uuid: q.uuid,
                        image: q.image,
                        is_statement: q.statement,
                        data: questionData,
                        answer: -1,
                        comment: null
                    }

                    var category = this.categories.find((c) => c.uuid === q.category_uuid);

                    if (category) {
                        category.questions.push(question);
                    } else {
                        category = {
                            uuid: q.category_uuid,
                            data: JSON.parse(q.category_data),
                            is_completed: false,
                            questions: [question]
                        }

                        this.categories.push(category);
                    }
                });
            }).then(() => {
                this.current_category = this.getFirstNonCompletedCategory();
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);

                this.loadingQuestions = false;
            }).catch(() => {
                PopupHelper.DisplayErrorPopup("Failed to load questions.", () => {
                    this.$router.push(RouteList.Home);
                });
            });
        },
        onScanCompleted() {
            this.sendAnswersToApi();
        },
        sendAnswersToApi() {
            var questionsWithAnswers = [];

            this.categories.forEach((c) => {
                c.questions.forEach((q) => {
                    questionsWithAnswers.push({
                        category_uuid: c.uuid,
                        question_uuid: q.uuid,
                        answer: q.answer,
                        comment: q.comment ?? null
                    });
                });
            });

            axios.post('/api/scans', {
                answers: questionsWithAnswers,
                sector_id: this.selectedSector.id,
                contact_name: this.name,
                contact_email: this.email,
            }).then((response) => {
                PopupHelper.DisplaySuccessPopup('Scan has been completed successfully!', () => {
                    LocalStorage.ClearScanResults();
                    LocalStorage.ClearContactInfo();
                    LocalStorage.SetLastCodes({
                        editable: response.data.edit_code,
                        readonly: response.data.view_code
                    });

                    this.$router.push(RouteList.Result + "/" + response.data.uuid);
                });
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            });
        },
        toggleEye(isOpen) {
            this.isEyeOpen = isOpen;
        },
        handleEditEmail() {
            PopupHelper.DisplayEmailEditPopup('Change your email', this.email, (result) => {
                LocalStorage.SetContactInfo({
                    name: this.name,
                    email: result,
                    sector: this.selectedSector
                });

                this.email = result;
            });
        },
        loadSectorsFromAPI() {
            return axios.get('/api/sectors', {

            }).then((response) => {
                let sectors = response.data;

                sectors.forEach((sector) => {
                    this.sectors.push({
                        id: sector.id,
                        data: JSON.parse(sector.data),
                    });
                });
            }).catch((error) => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            });
        },
        getLocalizedQuestion() {
            return this.current_question.data[this.$i18n.locale] ?
                    this.current_question.data[this.$i18n.locale].question :
                    this.current_question.data['nl'].question
        },
        getLocalizedTooltip() {
            return this.current_question.data[this.$i18n.locale] ?
                    this.current_question.data[this.$i18n.locale].tooltip :
                    this.current_question.data['nl'].tooltip
        },
        getLocalizedCategoryName(category) {
            return category.data[this.$i18n.locale] ?
                    category.data[this.$i18n.locale].name :
                    category.data['nl'].name;
        },
        getLocalizedSectorName(sector) {
            return sector.data[this.$i18n.locale] ?
                    sector.data[this.$i18n.locale].name :
                    sector.data['nl'].name;
        }
    },
    mounted() {
        LocalStorage.ActiveCheck();

        let data = LocalStorage.GetContactInfo();

        if (data) {
            this.name = data.name;
            this.email = data.email;
            this.selectedSector = data.sector;
        } else {
            const popup = (sectors) => PopupHelper.DisplaySectorPopup(
                'Enter scan information', sectors, this.$i18n.locale, false,
                (Result) =>
            {
                let sector = this.sectors.find((sector) => sector.id === parseInt(Result[2]));

                LocalStorage.SetContactInfo({
                    name: Result[0],
                    email: Result[1],
                    sector: sector,
                });

                this.name = Result[0];
                this.email = Result[1];
                this.selectedSector = sector;
            }, () => {
                this.$router.push(RouteList.Home);
            });

            if (!this.sectors.length)
                this.loadSectorsFromAPI().then(() => {
                    popup(this.sectors);
                });
            else
                popup(this.sectors);
        }

        this.loadQuestions();
    }
}
</script>

