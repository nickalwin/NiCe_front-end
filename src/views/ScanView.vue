<template>
    <div>
        <div class="flex justify-center">
            <div class="overflow-x-auto">
                <ul class="steps">
                    <li v-for="question in current_category.questions"
                        :class="`step ${question.answer !== -1 ? 'step-primary' : 'hover:step-neutral'} ${question.id === current_question.id ? 'step-info' : ''}`"
                        v-on:click="() => { jumpToQuestion(question.id) }"
                    />
                </ul>
            </div>
        </div>

        <div class="flex w-full mt-10">
            <div class="grid h-96 flex-grow card">
                <div class="card w-full bg-base-100 shadow-xl">
                    <div class="card-body">
                        <h2 class="card-title">
                            {{ current_question.is_statement ? 'Statement' : 'Question'}}
                        </h2>

                        <p>{{ current_question.text }}</p>

                        <div class="rating rating-lg">
                            <input type="radio" name="rating-9" class="rating-hidden" value="-1" v-model="current_question.answer" />
                            <input type="radio" name="rating-9" class="mask mask-star-2" value="1" v-model="current_question.answer" />
                            <input type="radio" name="rating-9" class="mask mask-star-2" value="2" v-model="current_question.answer" />
                            <input type="radio" name="rating-9" class="mask mask-star-2" value="3" v-model="current_question.answer" />
                            <input type="radio" name="rating-9" class="mask mask-star-2" value="4" v-model="current_question.answer" />
                            <input type="radio" name="rating-9" class="mask mask-star-2" value="5" v-model="current_question.answer" />
                        </div>

                        <div class="card-actions justify-end">
                            <button v-on:click="jumpToNextQuestion" class="btn btn-primary" :disabled="current_question.answer === -1">
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
                                :class="`step ${category.is_completed ? 'step-primary' : 'hover:step-neutral'} ${category.id === current_category.id ? 'step-info' : ''}`"
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
    </div>
</template>


<script>
export default {
    data() {
        return {
            categories: [],
            current_category: {},
            current_question: {},
        }
    },
    methods: {
        jumpToQuestion(questionId) {
            this.current_question = this.current_category.questions.find((q) => q.id === questionId);
        },
        jumpToCategory(categoryId) {
            this.current_category = this.categories.find((c) => c.id === categoryId);
            this.current_question = this.current_category.questions[0];
        },
        jumpToNextQuestion() {
            const currentQuestionIndex = this.current_category.questions.findIndex((q) => q.id === this.current_question.id);

            if (currentQuestionIndex + 1 >= this.current_category.questions.length) {
                this.jumpToNextCategory();
            } else {
                this.current_question = this.current_category.questions.at(currentQuestionIndex + 1);
            }
        },
        jumpToNextCategory() {
            const currentCategoryIndex = this.categories.findIndex((c) => c.id === this.current_category.id);

            if (currentCategoryIndex + 1 >= this.categories.length) {
                this.onScanCompleted();
            } else {
                this.current_category = this.categories.at(currentCategoryIndex + 1);
            }
        },
        onScanCompleted() {
            console.log('Scan completed');
        }
    },
    mounted() {
        // for testing purposes - dummy data TODO: connect to actual API
        this.categories = [
            {
                id: 1,
                name: "Category 1",
                is_completed: true,
                questions: [
                    { id: 1, text: "Just test text question 1?", is_statement: false, answer: -1 },
                    { id: 2, text: "Just test text question 2?", is_statement: false, answer: -1 },
                    { id: 3, text: "Just test text question 3?", is_statement: false, answer: -1 },
                    { id: 4, text: "Just test text question 4?", is_statement: false, answer: -1 }
                ]
            },
            {
                id: 2,
                name: "Category 2",
                is_completed: false,
                questions: [
                    { id: 5, text: "Just test text question 5?", is_statement: false, answer: -1 },
                    { id: 6, text: "Just test text question 6?", is_statement: false, answer: -1 }
                ]
            }
        ];

        this.current_category = this.categories[0];
        this.current_question = this.current_category.questions[0];
    }
}
</script>

<style scoped>

</style>
