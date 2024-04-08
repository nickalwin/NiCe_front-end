<template>
    <div>
        <button v-on:click="$emit('onClick')"
            class="submit-button mr-4 md:mr-0 mb-4 md:mb-0 bg-white hover:bg-gray-300 text-blue-500 text-sm md:text-lg font-bold py-1 md:py-2 px-4 md:px-8 rounded focus:outline-none focus:shadow-outline border"
            :disabled="disabled"
        >
            {{ label }}
        </button>
    </div>
</template>

<script>
export default {
    name: 'TernaryButton',
    emits: [
        'onClick'
    ],
    props: {
        label: { type: String, required: true },
        disabled: { type: Boolean, default: false }
    }
}
</script>
