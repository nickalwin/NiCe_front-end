<template>
    <div class="w-full flex justify-center mt-10">
        <div class="max-w-full mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
            <div class="flex overflow-x-auto mb-4 space-x-4">
                <button v-for="(group, index) in groupedQuestions" :key="index" @click="selectedGroup = group" :class="selectedGroup === group ? 'bg-indigo-700' : 'bg-indigo-500'" class="text-white font-bold py-2 px-4 rounded">
                    {{ getLocalizedCategoryName(group.category) }}
                </button>
            </div>
            <div v-if="selectedGroup" class="overflow-x-auto">
                <table class="mt-4 w-full table-auto">
                    <thead>
                        <tr class="bg-indigo-200">
                            <th class="px-4 py-2">
                                {{ $t('fields.questions') }}
                            </th>
                            <th class="px-4 py-2">
                                {{ $t('fields.answers') }}
                            </th>
                            <th class="px-4 py-2">
                                {{ $t('fields.comments') }}
                            </th>
                            <th v-if="isEditable" class="px-4 py-2">
                                {{ $t('fields.actions') }}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(question, qIndex) in selectedGroup.questions.grouped_answers" :key="qIndex" class="transition-colors duration-200 hover:bg-indigo-100">
                            <td class="border px-4 py-2">
                                <ul>
                                    <li>
                                        {{ getLocalizedQuestionName(question) }}
                                    </li>
                                </ul>
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <template v-if="question.answer == -1">
                                    <FontAwesomeIcon icon="fa-question" />
                                </template>
                                <template v-else>
                                    <div :class="`radial-progress ${getColorForAnswer(question.answer)}`"
                                        :style="`--value: ${question.answer * 20}`" role="progressbar"
                                    >
                                        {{ question.answer }} / 5
                                    </div>
                                </template>
                            </td>
                            <td class="border px-4 py-2">
                                <div v-if="question.comment == ''">
                                    <span class="text-gray-400">
                                        {{ $t('utils.no_comment') }}
                                    </span>
                                </div>
                                <div v-else>
                                    <span class="whitespace-normal">
                                        {{ question.comment }}
                                    </span>
                                </div>
                            </td>
                            <td v-if="isEditable" class="border px-4 py-2">
                                <button v-on:click="editScorePopup(question)" class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded">
                                    {{ $t('utils.edit') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <EditQuestionModal ref="EditQuestionModal"
        @onCancel="() => { this.$refs.EditQuestionModal.close(); }"
        @onSave="(question) => { this.$refs.EditQuestionModal.close(); this.updateAnswer(question); }"
    />
</template>

<script>
import ColorHelper from '@/helpers/ColorHelper';
import EditQuestionModal from '@/components/modals/EditQuestionModal.vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import PopupHelper from "@/helpers/PopupHelper.js";

export default {
    components: {
        EditQuestionModal
    },
    emits: ['answerUpdated'],
    props: {
        data: { type: Array, required: true },
        categories: { type: Array, required: true },
        isEditable: { type: Boolean, required: true }
    },
    data() {
        return {
            groupedQuestions: [],
            selectedGroup: null
        }
    },
    methods: {
        getLocalizedQuestionName(question) {
            var data = JSON.parse(question.question_data);

            return data[this.$i18n.locale] ?
                    data[this.$i18n.locale].question :
                    data.en.question;
        },
        getLocalizedCategoryName(category) {
            var data = JSON.parse(category.category_data);

            return data[this.$i18n.locale] ?
                data[this.$i18n.locale].name :
                data.en.name;
        },
        editScorePopup(question) {
            this.$refs.EditQuestionModal.open(
                this.getLocalizedQuestionName(question),
                question
            );
        },
        getColorForAnswer(answer) {
            return ColorHelper.GetTextColorForAnswer(answer);
        },
        updateAnswer(question) {
            let currentGroupIndex = this.groupedQuestions.findIndex((group) => {
                return this.selectedGroup.category.category_uuid === group.category.category_uuid;
            });

            axios.put(`/api/scans/${this.$route.params.uuid}/updateAnswer/${question.question_uuid}`, {
                answer: question.answer,
                comment: question.comment
            }).then(response => {
                PopupHelper.DisplaySuccessPopup('Answer has been updated successfully!');

                this.$emit('answerUpdated', currentGroupIndex);
            }).catch(error => {
                PopupHelper.DisplayErrorPopup(error.response.data.message);
            });
        },
        selectGroupByIndex(index) {
            this.selectedGroup = this.groupedQuestions[index];
        },
        getGroupedQuestions() {
            return this.groupedQuestions;
        }
    },
    mounted() {
        this.data.forEach((question) => {
            let category = this.categories.find((d) => {
                return d.category.category_uuid === question.category_uuid;
            });

            this.groupedQuestions.push({
                ...category,
                questions: question
            });
        });

        this.groupedQuestions = this.groupedQuestions.sort((a, b) => {
            return a.category.mean - b.category.mean;
        });

        this.selectGroupByIndex(0);
    }
}
</script>
