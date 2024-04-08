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

        <div class="flex w-full mt-10">
            <div class="flex-grow md:flex-shrink">
                <div class="card flex-grow">
                    <div class="bg-base-100 shadow-xl">
                        <div class="card-body" v-if="current_question.data">
                            <div class="flex items-center justify-between">
                                <QuestionCardHeader :question="current_question"
                                    :questions="current_category.questions"
                                    :category="current_category"
                                    :categories="categories"
                                    @jumpToQuestion="jumpToQuestion"
                                    @jumpToCategory="jumpToCategory"
                                />
                            </div>

                            <QuestionCardBody :question="current_question"
                                @jumpToNextQuestion="jumpToNextQuestion"
                                @jumpToPreviousQuestion="jumpToPreviousQuestion" />
                        </div>
                    </div>
                </div>
            </div>
            <!-- <div class="ml-5 grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
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
            </div> -->
            <!-- <button v-on:click="debugAnswerAllQuestions" class="btn btn-primary">Answer all questions</button> -->
        </div>
        <div class="mt-10">
            <SummaryComponent />
        </div>
    </LoadingTemplate>
</template>

<script>
import SummaryComponent from "@/components/SummaryComponent.vue";
import PopupHelper from "@/helpers/PopupHelper.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import LoadingTemplate from "@/components/utils/LoadingTemplate.vue";
import RouteList from "@/helpers/RouteList.js";
import LocalStorage from "@/helpers/LocalStorage";
import QuestionCardHeader from "@/components/card/QuestionCardHeader.vue";
import QuestionCardBody from "@/components/card/QuestionCardBody.vue";

export default {
    components: {
        SummaryComponent, FontAwesomeIcon, LoadingTemplate, QuestionCardHeader, QuestionCardBody,
    },
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
            loadingQuestions: false,
            sectors: [],
            name: null,
            email: null,
            selectedSector: null,
        }
    },
    methods: {
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
        jumpToPreviousQuestion() {
            var currentIndex = this.current_category.questions.findIndex((q) => q.uuid === this.current_question.uuid);

            if (currentIndex > 0) {
                this.current_question = this.current_category.questions[currentIndex - 1];
            } else {
                var previousCategoryIndex = this.categories.findIndex((c) => c.uuid === this.current_category.uuid) - 1;

                if (previousCategoryIndex >= 0) {
                    this.current_category = this.categories[previousCategoryIndex];
                    this.current_question = this.current_category.questions[this.current_category.questions.length - 1];
                }
            }
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
        getLocalizedSectorName(sector) {
            return sector.data[this.$i18n.locale] ?
                    sector.data[this.$i18n.locale].name :
                    sector.data['nl'].name;
        },
        // debugAnswerAllQuestions() {
        //     this.categories.forEach((category) => {
        //         category.questions.forEach((question) => {
        //             question.answer = 5;
        //         });
        //     });
        // }
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

