<template>
    <LoadingTemplate :isLoading="loadingQuestions" :center="true" :size="'4x'">
        <div class="flex justify-between">
            <h1 class="text-5xl font-bold mb-10 first-letter:uppercase">
                {{ $route.query.name }}'s scan
            </h1>
            <div class="flex m-1">
                <div class="input input-disabled mx-1">
                    <input class="input border-none w-4/5" type="email" :value="$route.query.email" disabled />
                    <span v-on:click="handleEditEmail" class="w-1/5 hover:text-gray-400 font-bold py-2 cursor-pointer">
                        <FontAwesomeIcon icon="fa-edit" />
                    </span>
                </div>
                <select v-model="selectedSector" class="select select-bordered bg-transparent mx-1">
                    <option v-for="sector in sectors" :key="sector" :value="sector">{{ sector }}</option>
                </select>
            </div>
        </div>
        <div class="flex justify-center">
            <div class="overflow-x-auto">
                <ul class="steps">
                    <li v-for="(question, index) in current_category.questions"
                        :class="`step ${isQuestionPicked(question) ? '' : isQuestionAnswered(question) ? 'step-warning' : 'step-error'} ${isQuestionPicked(question) ? 'step-info' : ''}`"
                        :data-content="`${isQuestionAnswered(question) ? '✓' : 'X'}`"
                        v-on:click="() => { jumpToQuestion(question.uuid) }">
                        {{ index + 1 }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex w-full mt-10">
            <div class="flex-grow md:flex-shrink md:w-2/3">
                <div class="card flex-grow">
                    <div class="bg-base-100 shadow-xl">
                        <div class="card-body">
                            <div class="flex items-center justify-between">
                                <h2 class="card-title">
                                    {{ current_question.is_statement ? 'Statement' : 'Question' }}
                                </h2>
                                <div v-if="current_question.tooltip" class="tooltip tooltip-info"
                                    :data-tip="current_question.tooltip">
                                    <button class="btn btn-info rounded-full">
                                        <FontAwesomeIcon icon="fa-info" />
                                    </button>
                                </div>
                            </div>

                            <p>{{ current_question.text }}</p>

                            <img :src="current_question.image" alt="No image provided" />

                            <div class="rating rating-lg flex flex-col">
                                <div>
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
                                <div class="flex justify-between w-52  min-w-min">
                                    <div class="text-xs w-1/3">Helemaal niet van toepassing</div>
                                    <div class="text-xs w-1/3">Volledig van toepassing</div>
                                </div>

                                <div class="tooltip-container">
                                    <div class="tooltip tooltip-info" data-tip="Press to be able to give explanation.">
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
                                            placeholder="Add a comment..."></textarea>
                                    </div>
                                </div>
                                <div class="card-actions justify-end">
                                    <PrimaryButton :label="'Next'" :disabled="current_question.answer === -1"
                                        @onClick="jumpToNextQuestion" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ml-5 grid h-20 flex-grow card bg-base-300 rounded-box place-items-center">
                <div class="flex-grow md:max-w-1/4">
                    <ul class="steps steps-vertical">
                        <li v-for="category in categories"
                            :class="`step ${isCategoryPicked(category) ? '' : isCategoryCompleted(category) ? 'step-warning' : 'step-error'} ${isCategoryPicked(category) ? 'step-info' : ''}`"
                            :data-content="`${category.is_completed ? '✓' : '●'}`"
                            v-on:click="() => { jumpToCategory(category.uuid) }">
                            {{ category.name }}
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

export default {
    components: { SummaryComponent, PrimaryButton, FontAwesomeIcon, LoadingTemplate },
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
            isEyeOpen: true,
            loadingQuestions: false,
            sectors: ['Technology', 'Finance', 'Healthcare'],
            selectedSector: this.$route.query.sector
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
                    category_name: c.name,
                    is_completed: c.is_completed,
                    questions: c.questions.map((q) => {
                        return {
                            question_uuid: q.uuid,
                            answer: q.answer,
                            comment: q.comment ?? null,
                            is_statement: q.is_statement,
                            text: q.text,
                            tooltip: q.tooltip,
                            image: q.image,
                        }
                    })
                }
            });

            localStorage.setItem('answers', JSON.stringify(answers));
        },
        loadQuestions() {
            var answers = localStorage.getItem('answers');

            if (answers) {
                this.loadQuestionsFromLocalStorage(answers);
            } else {
                this.loadQuestionsFromApi();
            }
        },
        loadQuestionsFromLocalStorage(answers) {
            answers = JSON.parse(answers);

            answers.forEach((c) => {
                var category = {
                    uuid: c.category_uuid,
                    name: c.category_name,
                    is_completed: c.is_completed,
                    questions: c.questions.map((q) => {
                        return {
                            uuid: q.question_uuid,
                            answer: q.answer,
                            comment: q.comment,
                            is_statement: q.is_statement,
                            text: q.text,
                            tooltip: q.tooltip,
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
                        text: questionData.nl.question,
                        tooltip: questionData.nl.tooltip,
                        answer: -1,
                        comment: null
                    }

                    var category = this.categories.find((c) => c.uuid === q.category_uuid);

                    if (category) {
                        category.questions.push(question);
                    } else {
                        category = {
                            uuid: q.category_uuid,
                            name: q.category_name,
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
        clearAnswersFromLocalStorage() {
            localStorage.removeItem('answers');
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
                sector_id: 1,
                contact_name: 'John Doe',
                contact_email: 'john@doe.gmail.com',
            }).then((response) => {
                PopupHelper.DisplaySuccessPopup('Scan has been completed successfully!', () => {
                    localStorage.removeItem('answers');

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
            PopupHelper.DisplayEmailEditPopup('Change your email', this.$route.query.email, (Result) => {
                this.$router.push({
                    name: 'scan',
                    query: {
                        name: this.$route.query.name,
                        email: Result,
                        sector: this.$route.query.sector
                    }
                });
            });
        }
    },
    mounted() {
        this.loadQuestions();
    }
}
</script>

<style scoped>

</style>
