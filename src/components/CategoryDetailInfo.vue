<template>
    <div v-if="data" class="results-container mt-10">
        <div v-for="(element, index) in displayData"
            class="collapse bg-white shadow-md rounded-lg p-4 mb-4 bg-white-200"
        >
            <input type="checkbox" class="peer" />

            <div class="collapse-title">
                <div class="collapse-title text-xl font-medium">
                    <h3 class="result-label text-lg font-semibold mb-2">
                        <FontAwesomeIcon icon="fa-caret-down" />
                        {{ element.label }}
                        [<strong :class="`${getColorTextForAnswer(parseFloat(element.mean).toFixed(2))}`">
                            {{ parseFloat(element.mean).toFixed(2) }}
                        </strong> / 5.00]
                    </h3>
                </div>
            </div>
            <div class="collapse-content">
                <p class="result-score text-gray-600">
                    {{ $t('results_page.you_scored') }}
                    <strong :class="`${getColorTextForAnswer(parseFloat(element.mean).toFixed(2))}`">
                        {{ parseFloat(element.mean).toFixed(2) }}
                    </strong>
                    {{ $t('results_page.out_of') }} 5.00
                </p>
                <div>
                    <h1 class="mt-4 text-2xl font-bold text-blue-600">
                        <strong>{{ $t('results_page.dont_know_answers') }}</strong>
                    </h1>
                    <ul class="list-disc pl-5">
                        <li v-for="(answer, index) in element.dontKnownAnswers" :key="index"
                            class="result-answer text-gray-600 mb-2">
                            <span class="font-medium">
                                {{ getLocalizedQuestion(answer.question_data) }}
                            </span>
                            <td class="border px-4 py-2 text-center rounded-lg">

                            </td>
                        </li>
                    </ul>

                    <h1 class="mt-4 text-2xl font-bold text-blue-600">
                        <strong>{{ $t('results_page.top_answers') }}</strong>
                    </h1>
                    <ul class="list-disc pl-5">
                        <li v-for="(answer, index) in element.topAnswers" :key="index"
                            class="result-answer text-gray-600 mb-2">
                            <span class="font-medium">
                                {{ getLocalizedQuestion(answer.question_data) }}
                            </span>
                            <td class="border px-4 py-2 text-center rounded-lg">
                                <div :class="`radial-progress ${getColorTextForAnswer(answer.answer)}`"
                                    :style="`--value: ${answer.answer * 20}`" role="progressbar"
                                >
                                    {{ answer.answer }} / 5
                                </div>
                            </td>
                        </li>
                    </ul>

                    <h1 class="mt-4 text-2xl font-bold text-blue-600">
                        <strong>{{ $t('results_page.lowest_answers') }}</strong>
                    </h1>
                    <ul class="list-disc pl-5">
                        <li v-for="(answer, index) in element.lowestAnswers" :key="index"
                            class="result-answer text-gray-600 mb-2">
                            <span class="font-medium">
                                {{ getLocalizedQuestion(answer.question_data) }}
                            </span>
                            <td class="border px-4 py-2 text-center rounded-lg">
                                <div :class="`radial-progress ${getColorTextForAnswer(answer.answer)}`"
                                    :style="`--value: ${answer.answer * 20}`" role="progressbar"
                                >
                                    {{ answer.answer }} / 5
                                </div>
                            </td>
                        </li>
                    </ul>
                </div>
                <div>
                    <h1 class="mt-4 text-2xl font-bold text-blue-600">
                        <strong>{{ $t('results_page.tips_to_improve') }}</strong>
                    </h1>
                    <ul class="list-disc pl-5">
                        <li>Tip 1</li>
                        <li>Tip 2</li>
                        <li>Tip 3</li>
                    </ul>
                </div>
                <div>
                    <h1 class="mt-4 text-2xl font-bold text-blue-600">
                        <strong>{{ $t('results_page.additional_tools') }}</strong>
                    </h1>
                    <ul class="list-disc pl-5">
                        <li>
                            <a href="" target="_blank" class="text-blue-600">
                                https://www.google.com
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank" class="text-blue-600">
                                https://www.google.com
                            </a>
                        </li>
                        <li>
                            <a href="" target="_blank" class="text-blue-600">
                                https://www.google.com
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ColorHelper from '@/helpers/ColorHelper';

export default {
    props: {
        data: { type: Object, required: true },
        allLabelsWithCategoryUuid: { type: Array, required: true },
        categories: { type: Array, required: true }
    },
    data() {
        return {
            displayData: [],
        }
    },
    methods: {
        sortQuestions() {
            let i = 0;

            this.allLabelsWithCategoryUuid.forEach((label) => {
                const category = this.categories.find((category) => category.uuid === label.category_uuid);

                if (!category)
                    return;

                var answers = category.grouped_answers;
                var count = answers.length;

                let qa = 0;

                if (count >= 3)
                    qa = 1;
                if (count >= 6)
                    qa = 2;
                if (count >= 9)
                    qa = 3;

                let dontKnownAnswers = answers.filter((answer) => answer.answer === -1);
                let topAnswers = [];
                let lowestAnswers = [];

                answers = answers.filter((answer) => answer.answer !== -1)
                                 .sort((a, b) => b.answer - a.answer);

                for (let i = 0; i < qa; i++)
                    topAnswers.push(answers[i]);

                for (let i = answers.length - 1; i >= answers.length - qa; i--)
                    lowestAnswers.push(answers[i]);

                this.displayData.push({
                    mean: this.data.datasets[0].data[i++],
                    label: label.label,
                    topAnswers: topAnswers,
                    lowestAnswers: lowestAnswers,
                    dontKnownAnswers: dontKnownAnswers
                });
            });
        },
        getColorTextForAnswer(answer) {
            return ColorHelper.GetTextColorForAnswer(answer);
        },
        getLocalizedQuestion(questionData) {
            questionData = JSON.parse(questionData);

            return questionData[this.$i18n.locale] ?
                    questionData[this.$i18n.locale].question :
                    questionData['nl'].question
        },
    },
    mounted() {
        this.sortQuestions();
    }
}
</script>
