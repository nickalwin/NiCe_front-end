<template>
    <div class="w-full flex justify-center mt-10">
        <div class="max-w-full mx-auto bg-white rounded-xl shadow-md overflow-hidden p-8">
            <div class="flex overflow-x-auto mb-4 space-x-4">
                <button v-for="(group, index) in groupedQuestions" :key="index" @click="selectedGroup = group" :class="selectedGroup === group ? 'bg-blue-700' : 'bg-blue-500'" class="text-white font-bold py-2 px-4 rounded">
                    {{ getLocalizedCategoryName(group.category) }}
                </button>
            </div>
            <div v-if="selectedGroup" class="overflow-x-auto">
                <table class="mt-4 w-full table-auto">
                    <thead>
                        <tr>
                            <th class="px-4 py-2">
                                {{ $t('fields.questions') }}
                            </th>
                            <th class="px-4 py-2">
                                {{ $t('fields.answers') }}
                            </th>
                            <th class="px-4 py-2">
                                {{ $t('fields.comments') }}
                            </th>
                            <th class="px-4 py-2">
                                {{ $t('fields.actions') }}
                            </th>
                        </tr>
                    </thead>
                    <div>

                    </div>
                    <tbody>
                        <tr v-for="(question, qIndex) in selectedGroup.questions.grouped_answers" :key="qIndex" class="transition-colors duration-200 hover:bg-blue-100">
                            <td class="border px-4 py-2">
                                <ul>
                                    <li>
                                        {{ getLocalizedQuestionName(question) }}
                                    </li>
                                </ul>
                            </td>
                            <td class="border px-4 py-2 text-center">
                                <!-- <template v-if="question.answer == 0">
                                    X
                                </template>
                                <template v-else> -->
                                    <div :class="`radial-progress ${getColorForAnswer(question.answer)}`"
                                        :style="`--value: ${question.answer * 20}`" role="progressbar"
                                    >
                                        {{ question.answer }} / 5
                                    </div>
                                <!-- </template> -->
                            </td>
                            <td class="border px-4 py-2">
                                <div v-if="question.comment == ''">
                                    <span class="text-gray-400">
                                        {{ $t('utils.no_comment') }}
                                    </span>
                                </div>
                                <div v-else>
                                    {{ question.comment }}
                                </div>
                            </td>
                            <td class="border px-4 py-2">
                                <button v-on:click="editScorePopup(question)" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                    {{ $t('utils.edit') }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import ColorHelper from '@/helpers/ColorHelper';
import Swal from 'sweetalert2';

export default {
    props: {
        data: { type: Array, required: true },
        categories: { type: Array, required: true }
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
            let currentAnswer = question.answer;
            let currentComment = question.comment;
            Swal.fire({
                title: this.$t('utils.edit_score'),
                showCancelButton: true,
                confirmButtonText: this.$t('utils.save'),
                cancelButtonText: this.$t('utils.cancel'),
                html: `
                    <input id="swal-input1" class="swal2-input" type="range" min="1" max="5" step="1" value="${currentAnswer}">
                    <textarea id="swal-input2" class="swal2-textarea">${currentComment}</textarea>
                `,
                preConfirm: () => {
                    const score = document.getElementById('swal-input1').value;
                    const comment = document.getElementById('swal-input2').value;

                    if (!score || !comment) {
                        Swal.showValidationMessage(this.$t('utils.required'));
                    }

                    return { score, comment };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    const { score, comment } = result.value;
                    // TODO: Use `score` and `comment` here
                }
            });
        },
        getColorForAnswer(answer) {
            return ColorHelper.GetTextColorForAnswer(answer);
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

        this.selectedGroup = this.groupedQuestions[0];
    }
}
</script>
