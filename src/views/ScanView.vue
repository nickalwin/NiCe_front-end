<template>
    <LoadingTemplate :isLoading="loadingQuestions" :center="true" :size="'4x'">
        <ContactInfoCard />

        <div class="flex w-full mt-10">
            <div class="flex-grow md:flex-shrink">
                <div id="questionCard" class="card flex-grow lg:w-full mx-auto items-center">
                    <div class="w-3/4 bg-base-100 shadow-xl">
                        <div class="card-body" v-if="current_question.data">
                            <div class="flex items-center justify-between">
                                <QuestionCardHeader :question="current_question"
                                    :totalQuestions="totalQuestions"
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
        </div>

        <div class="mt-10">
            <SummaryComponent />
        </div>
        <button v-on:click="debugAnswerAllQuestions" class="btn btn-primary">Answer all questions</button>
    </LoadingTemplate>

    <ScanInfoModal ref="ScanInfoModal"
        @onCancel="() => this.$router.push('/')"
        @onContinue="() => {
            this.$refs.ScanInfoModal.close();
        }"
    />
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
import ScanInfoModal from "@/components/modals/ScanInfoModal.vue";
import ContactInfoCard from "@/components/ContactInfoCard.vue";

export default {
    components: {
        SummaryComponent, FontAwesomeIcon, LoadingTemplate, QuestionCardHeader, QuestionCardBody,
        ScanInfoModal, ContactInfoCard,
    },
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
            loadingQuestions: false,
            totalQuestions: 0,
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

            document.getElementById('questionCard').scrollIntoView({ behavior: 'smooth' });
        },
        areAllQuestionsFromCategoryAnswered(category) {
            return category.questions.every((q) => q.answer !== -2);
        },
        getFirstNonAnsweredQuestion(category) {
            return category.questions.find((q) => q.answer === -2);
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

            document.getElementById('questionCard').scrollIntoView({ behavior: 'smooth' });
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
            this.totalQuestions = 0;

            answers.forEach((c) => {
                var category = {
                    uuid: c.category_uuid,
                    data: c.category_data,
                    is_completed: c.is_completed,
                    questions: c.questions.map((q) => {
                        this.totalQuestions++;

                        return {
                            id: this.totalQuestions,
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

                this.totalQuestions = 0;

                questions.forEach((q) => {
                    var questionData = JSON.parse(q.data);

                    this.totalQuestions++;

                    var question = {
                        id: this.totalQuestions,
                        uuid: q.uuid,
                        image: q.image,
                        is_statement: q.statement,
                        data: questionData,
                        answer: -2,
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

            let data = LocalStorage.GetContactInfo();

            axios.post('/api/scans', {
                answers: questionsWithAnswers,
                sector_id: data.sector.value,
                contact_name: data.name,
                contact_email: data.email,
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
        debugAnswerAllQuestions() {
            this.categories.forEach((category) => {
                category.is_completed = true;
                category.questions.forEach((question) => {
                    question.answer = Math.floor(Math.random() * 6) - 1;
                });
            });
            this.onScanCompleted();
        },
    },
    mounted() {
        LocalStorage.ActiveCheck();

        if (!LocalStorage.GetContactInfo()) {
            this.$refs.ScanInfoModal.open();
        }

        this.loadQuestions();
    }
}
</script>

