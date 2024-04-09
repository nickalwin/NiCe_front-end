<template>
    <button v-on:click="$emit('onClick')"
        class="submit-button bg-gray-500 hover:bg-gray-700 disabled:bg-gray-300 text-white  mr-4 md:mr-0 mb-4 md:mb-0 text-sm md:text-lg font-bold py-1 md:py-2 px-4 md:px-8 rounded focus:outline-none focus:shadow-outline"
        :disabled="disabled"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'SecondaryButton',
    emits: [
        'onClick'
    ],
    props: {
        label: { type: String, required: true },
        disabled: { type: Boolean, default: false }
    }
}
</script>
