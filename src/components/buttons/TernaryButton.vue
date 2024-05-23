<template>
    <div>
        <button v-on:click="$emit('onClick')"
            class="submit-button mr-4 md:mr-0 mb-4 md:mb-0 rounded-full bg-white hover:bg-gray-300 text-blue-500 text-sm md:text-lg font-bold py-1 md:py-2 px-4 md:px-8 focus:outline-none focus:shadow-outline border"
            :class="{ 'disabled-button': disabled }"
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
