<template>
    <div>
        <div class="flex justify-center">
            <div class="overflow-x-auto">
                <ul class="steps">
                    <li v-for="(question, index) in current_category.questions"
                        :class="`step ${isQuestionPicked(question) ? '' : isQuestionAnswered(question) ? 'step-warning' : 'step-error'} ${isQuestionPicked(question) ? 'step-info' : ''}`"
                        :data-content="`${isQuestionAnswered(question) ? '✓' : 'X'}`"
                        v-on:click="() => { jumpToQuestion(question.id) }"
                    >
                        {{ index + 1 }}
                    </li>
                </ul>
            </div>
        </div>

        <div class="flex w-full my-10">
            <div class="grid flex-grow card">
                <div class="card w-full bg-base-100 shadow-xl">
                    <div class="card-body">
                        <div class="flex items-center justify-between">
                            <h2 class="card-title">
                                {{ current_question.is_statement ? 'Statement' : 'Question'}}
                            </h2>
                            <div class="tooltip tooltip-info" :data-tip="current_question.tooltip">
                                <button class="btn btn-info rounded-full">
                                    <FontAwesomeIcon icon="fa-info" />
                                </button>
                            </div>
                        </div>

                        <p>{{ current_question.text }}</p>

                        <img src="https://placehold.co/600x400" alt=""/>

                        <div class="rating rating-lg">
                            <input type="radio" class="rating-hidden" value="-1" v-model="current_question.answer" />
                            <input type="radio" class="mask mask-star-2 bg-gray-500" value="1" v-model="current_question.answer" />
                            <input type="radio" class="mask mask-star-2 bg-gray-500" value="2" v-model="current_question.answer" />
                            <input type="radio" class="mask mask-star-2 bg-gray-500" value="3" v-model="current_question.answer" />
                            <input type="radio" class="mask mask-star-2 bg-gray-500" value="4" v-model="current_question.answer" />
                            <input type="radio" class="mask mask-star-2 bg-gray-500" value="5" v-model="current_question.answer" />
                        </div>

                        <div class="card-actions justify-end">
                            <button v-on:click="jumpToNextQuestion"
                                class="submit-button mr-4 bg-blue-500 hover:bg-blue-700 disabled:bg-gray-500 text-white text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
                                :disabled="current_question.answer === -1"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="grid h-20 flex-grow card place-items-center">
                <div class="flex">
                    <div class="overflow-x-auto">
                        <ul class="steps steps-vertical">
                            <li v-for="category in categories"
                                :class="`step ${isCategoryPicked(category) ? '' : isCategoryCompleted(category) ? 'step-warning' : 'step-error'} ${isCategoryPicked(category) ? 'step-info' : ''}`"
                                :data-content="`${category.is_completed ? '✓' : '●'}`"
                                v-on:click="() => { jumpToCategory(category.id) }"
                            >
                                {{ category.name }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <SummaryComponent />
    </div>
</template>

<script>
import SummaryComponent from "@/components/SummaryComponent.vue";
import PopupHelper from "@/helpers/PopupHelper.js";

export default {
    components: {SummaryComponent},
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
        }
    },
    methods: {
        isQuestionAnswered(question) {
            return question.answer !== -1;
        },
        isQuestionPicked(question) {
            return question.id === this.current_question.id;
        },
        isCategoryCompleted(category) {
            return category.is_completed;
        },
        isCategoryPicked(category) {
            return category.id === this.current_category.id;
        },
        jumpToQuestion(questionId) {
            this.current_question = this.current_category.questions.find((q) => q.id === questionId);
        },
        jumpToCategory(categoryId) {
            this.current_category = this.categories.find((c) => c.id === categoryId);

            if (this.areAllQuestionsFromCategoryAnswered(this.current_category)) {
                this.current_question = this.current_category.questions[0];
            } else {
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
            }
        },
        jumpToNextQuestion() {
            this.saveAnswersToLocalStorage();

            if (this.areAllQuestionsFromCategoryAnswered(this.current_category)) {
                this.jumpToNextCategory();
            } else {
                this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
            }
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
        jumpToNextCategory() {
            const currentCategoryIndex = this.categories.findIndex((c) => c.id === this.current_category.id);
            this.current_category.is_completed = true;

            if (currentCategoryIndex + 1 >= this.categories.length) {
                this.onScanCompleted();
            } else {
                this.current_category = this.categories.at(currentCategoryIndex + 1);
            }
        },
        saveAnswersToLocalStorage() {
            var answers = this.categories.map((c) => {
                return {
                    category_id: c.id,
                    questions: c.questions.map((q) => {
                        return {
                            question_id: q.id,
                            answer: q.answer
                        }
                    })
                }
            });

            localStorage.setItem('answers', JSON.stringify(answers));
        },
        loadFromLocalStorageIfExists() {
            var answers = localStorage.getItem('answers');

            if (answers) {
                answers = JSON.parse(answers);

                this.categories.forEach((c) => {
                    var categoryAnswers = answers.find((a) => a.category_id === c.id);
                    if (categoryAnswers) {
                        c.questions.forEach((q) => {
                            var questionAnswer = categoryAnswers.questions.find((qa) => qa.question_id === q.id);

                            if (questionAnswer) {
                                q.answer = questionAnswer.answer;
                            }
                        });
                    }
                });
            }
        },
        onScanCompleted() {
            PopupHelper.DisplaySuccessPopup('Scan has been completed successfully!', () => {
                this.$router.push('/results');
            });
        }
    },
    mounted() {
        // for testing purposes - dummy data TODO: connect to actual API
        this.categories = [
            {
                id: 1,
                name: "Category 1",
                is_completed: false,
                questions: [
                    { id: 1, text: "Just test text question 1?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 },
                    { id: 2, text: "Just test text question 2?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 },
                    { id: 3, text: "Just test text question 3?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 },
                    { id: 4, text: "Just test text question 4?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 }
                ]
            },
            {
                id: 2,
                name: "Category 2",
                is_completed: false,
                questions: [
                    { id: 5, text: "Just test text question 5?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 },
                    { id: 6, text: "Just test text question 6?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 }
                ]
            },
            {
                id: 3,
                name: "Category 3",
                is_completed: false,
                questions: [
                    { id: 7, text: "Just test text question 7?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 },
                    { id: 8, text: "Just test text question 8?", tooltip: "This is a test tooltip!", is_statement: false, answer: -1 }
                ]
            }
        ];

        this.loadFromLocalStorageIfExists();

        this.current_category = this.getFirstNonCompletedCategory();
        this.current_question = this.getFirstNonAnsweredQuestion(this.current_category);
    }
}
</script>

<style scoped>

</style>
