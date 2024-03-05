<template>
    <RouterLink
        class="submit-button mr-4 bg-blue-500 hover:bg-blue-700 text-white text-lg font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        :to="to"
    >
        {{ label }}
    </RouterLink>
</template>

<script>
export default {
    name: 'PrimaryRouterLink',
    props: {
        label: { type: String, required: true },
        to: {  type: String, required: true }
    }
}
</script>
