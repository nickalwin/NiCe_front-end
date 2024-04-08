<template>

    <div class="col">
        <div class="row overflow-x-auto">
            <div class="text-sm breadcrumbs w-full">
                <ul class="flex flex-wrap">
                    <li v-for="(c, index) in categories" class="inline">
                        <a
                            v-on:click="() => { jumpToCategory(c.uuid) }"
                            :class="`
                                ${isCategoryPicked(c) ? 'bg-blue-400' : (isCategoryCompleted(c) ? 'bg-gray-400' : '') }
                                rounded-lg px-2
                            `">
                            {{ getLocalizedCategoryName(c) }}
                        </a>
                    </li>
                </ul>
            </div>
        </div>

        <div class="row overflow-x-auto">
            <div class="text-sm breadcrumbs w-full">
                <ul class="flex flex-wrap">
                    <li v-for="(q, index) in questions">
                        <a
                            v-on:click="() => { jumpToQuestion(q.uuid) }"
                            :class="`
                                ${isQuestionPicked(q) ? 'bg-blue-400' : (isQuestionAnswered(q) ? getColorForAnswer(q.answer) : '') }
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
                <div v-if="question.data" class="px-5 py-2 bg-blue-400 rounded-badge">
                    <p class="gap-2 rounded-full text-base font-medium">
                        {{
                            question.is_statement ?
                            $t('fields.statement_c') :
                            $t('fields.question_c')
                        }}

                        <strong>{{ question.id }} / {{ totalQuestions }}</strong>
                    </p>
                </div>

            </div>
        </div>
    </div>

</template>

<script>
import ColorHelper from '@/helpers/ColorHelper';

export default {
    name: 'QuestionCardHeader',
    props: {
        totalQuestions: { required: true },
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
        getColorForAnswer(answer) {
            return ColorHelper.GetColorForAnswer(answer);
        }
    }
}
</script>
