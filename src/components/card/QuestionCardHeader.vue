<template>

    <div class="col">
        <div class="row">
            <div class="text-sm breadcrumbs">
                <ul>
                    <li v-for="(c, index) in categories">
                        <a
                            v-on:click="() => { jumpToCategory(c.uuid) }"
                            :class="`
                                ${isCategoryPicked(c) ? 'bg-blue-400' : (isCategoryCompleted(c) ? 'bg-green-200' : '') }
                                rounded-lg px-2
                            `">
                            {{ getLocalizedCategoryName(c) }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row">
            <div class="text-sm breadcrumbs">
                <ul>
                    <li v-for="(q, index) in questions">
                        <a
                            v-on:click="() => { jumpToQuestion(q.uuid) }"
                            :class="`
                                ${isQuestionPicked(q) ? 'bg-blue-400' : (isQuestionAnswered(q) ? 'bg-green-200' : '') }
                                rounded-lg px-2
                            `">
                            {{ index + 1 }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="tooltip tooltip-info tooltip-right rounded-lg px-1 py-1 text-xs mt-2"
            :data-tip="getLocalizedTooltip()">
            <div class="flex justify-between">
                <div v-if="question.data" class="badge badge-info px-5 py-3">
                    <p class="gap-2 rounded-full text-base font-medium">
                        {{
                            question.is_statement ?
                            $t('fields.statement_c') :
                            $t('fields.question_c')
                        }}
                    </p>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
export default {
    name: 'QuestionCardHeader',
    props: {
        question: { required: true },
        questions: { required: true },
        category: { required: true },
        categories: { required: true }
    },
    methods: {
        isQuestionPicked(question) {
            return question.uuid === this.question.uuid;
        },
        isQuestionAnswered(question) {
            return question.answer !== -1;
        },
        jumpToQuestion(uuid) {
            this.$emit('jumpToQuestion', uuid);
        },
        isCategoryCompleted(category) {
            return category.is_completed;
        },
        isCategoryPicked(category) {
            return category.uuid === this.category.uuid;
        },
        jumpToCategory(uuid) {
            this.$emit('jumpToCategory', uuid);
        },
        getLocalizedCategoryName(category) {
            return category.data[this.$i18n.locale] ?
                    category.data[this.$i18n.locale].name :
                    category.data['nl'].name;
        },
        getLocalizedTooltip() {
            return this.question.data[this.$i18n.locale] ?
                    this.question.data[this.$i18n.locale].tooltip :
                    this.question.data['nl'].tooltip
        },
    }
}
</script>
