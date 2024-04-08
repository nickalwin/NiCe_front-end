<template>
    <div class="rating rating-lg flex flex-col sm:flex-row items-center justify-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-md">
        <div class="text-xs sm:text-sm md:text-md font-semibold text-gray-600">
            {{ $t('scan_page.low_score') }}
        </div>

        <div class="flex space-x-2">
            <!-- <button v-for="i in 6" :key="i" v-on:click="onClick(i - 1)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= i - 1 ? 'bg-blue-500' : 'bg-gray-500'}`">
                {{ i - 1 }}
            </button> -->

            <button v-on:click="onClick(0)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer == 0  ? getColorForAnswer(0) : 'bg-gray-500'}`">
                X
            </button>

            <button v-on:click="onClick(1)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= 1  ? getColorForAnswer(1) : 'bg-gray-500'}`">
                1
            </button>

            <button v-on:click="onClick(2)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= 2  ? getColorForAnswer(2) : 'bg-gray-500'}`">
                2
            </button>

            <button v-on:click="onClick(3)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= 3  ? getColorForAnswer(3) : 'bg-gray-500'}`">
                3
            </button>

            <button v-on:click="onClick(4)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= 4  ? getColorForAnswer(4) : 'bg-gray-500'}`">
                4
            </button>

            <button v-on:click="onClick(5)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= 5  ? getColorForAnswer(5) : 'bg-gray-500'}`">
                5
            </button>

        </div>

        <div class="text-xs sm:text-sm md:text-md font-semibold text-gray-600">
            {{ $t('scan_page.high_score') }}
        </div>
    </div>
</template>

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
            this.$emit('onChange', parseInt(value));
        },
        getColorForAnswer(answer) {
            return ColorHelper.GetColorForAnswer(answer);
        }
    },
}
</script>
