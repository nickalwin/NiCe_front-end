<template>
    <RouterLink
        class="submit-button mr-4 bg-white hover:bg-gray-300 text-blue-500 text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        :to="to"
    >
        {{ label }}
    </RouterLink>
</template>

<script>
export default {
    name: 'TernaryRouterLink',
    props: {
        label: { type: String, required: true },
        to: {  type: String, required: true }
    }
}
</script>
