<template>
    <div class="rating rating-lg flex flex-col md:flex-row justify-between items-center px-10">
        <div class="flex space-x-2 mb-4 md:mb-0">
            <div v-for="i in 5" class="tooltip-container mt-2">
                <div class="tooltip tooltip-info" :data-tip="$t(`scan_page.score_text_${i}`)">
                    <button :key="i" v-on:click="onClick(i)" type="button"
                        :class="`text-white text-xs sm:text-sm md:text-xl px-3 py-1 rounded-full ${question.answer >= i  ? getColorForAnswer(i) : 'bg-gray-500'}`">
                        {{ i }}
                    </button>
                </div>
            </div>
        </div>

        <div class="ml-1 flex space-x-2">
            <button v-on:click="onClick(0)" type="button"
                :class="`text-white text-xs sm:text-sm px-2 py-1 rounded-full ${question.answer == 0  ? 'bg-blue-600' : 'bg-gray-500'}`">
                {{ $t('scan_page.not_applicable') }}
            </button>

            <button v-on:click="onClick(-1)" type="button"
                :class="`text-white text-xs sm:text-sm px-2 py-1 rounded-full ${question.answer == -1  ? 'bg-blue-600' : 'bg-gray-500'}`">
                {{ $t('scan_page.i_dont_know') }}
            </button>
        </div>
    </div>
</template>

<!--
    1 - 5 -> rating
    0 -> Not Applicable
    -1 -> I Don't Know
    -2 -> No answer
 -->

<script>
import ColorHelper from '@/helpers/ColorHelper.js';

export default {
    name: 'QuestionRating',
    emits: ['onChange'],
    props: {
        question: {
            required: true
        }
    },
    methods: {
        onClick(value) {
            this.$emit('onChange', value);
        },
        getColorForAnswer(answer) {
            return ColorHelper.GetColorForAnswer(answer);
        }
    },
}
</script>

<style scoped>
button {
    transition: all 0.3s ease;
}

button:hover {
    transform: scale(1.1);
}
</style>
