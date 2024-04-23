<template>
    <button v-on:click="$emit('onClick')"
        class="submit-button bg-blue-500 rounded-full hover:bg-blue-700 disabled:bg-gray-300 text-white  mr-4 md:mr-0 mb-4 md:mb-0 text-sm md:text-lg font-bold py-1 md:py-2 px-4 md:px-8 focus:outline-none focus:shadow-outline"
        :class="{ 'disabled-button': disabled }"
        :disabled="disabled"
    >
        {{ label }}
    </button>
</template>

<script>
export default {
    name: 'PrimaryButton',
    emits: [
        'onClick'
    ],
    props: {
        label: { type: String, required: true },
        disabled: { type: Boolean, default: false }
    }
}
</script>

<style scoped>
button {
    transition: all 0.3s ease;
}

button:hover {
    transform: scale(1.1);
}

.disabled-button {
    cursor: not-allowed;
}
</style>
