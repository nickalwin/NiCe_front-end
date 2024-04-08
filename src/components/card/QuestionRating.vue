<template>
    <div class="rating rating-lg flex flex-col sm:flex-row items-center justify-center space-x-2 bg-gray-100 p-4 rounded-lg shadow-md">
        <div class="text-xs sm:text-sm md:text-md font-semibold text-gray-600">
            {{ $t('scan_page.low_score') }}
        </div>

        <div class="flex space-x-2">
            <button v-for="i in 6" :key="i" v-on:click="onClick(i - 1)" type="button"
                :class="`text-white text-xs sm:text-sm md:text-xl px-2 py-1 rounded ${question.answer >= i - 1 ? 'bg-blue-500' : 'bg-gray-500'}`">
                {{ i - 1 }}
            </button>
        </div>

        <div class="text-xs sm:text-sm md:text-md font-semibold text-gray-600">
            {{ $t('scan_page.high_score') }}
        </div>
    </div>

</template>

<script>
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
        }
    }
}
</script>
