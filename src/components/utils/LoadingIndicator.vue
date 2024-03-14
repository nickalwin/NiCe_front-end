<template>
    <div class="loading-container">
        <FontAwesomeIcon :icon="['fas', icon]" spin :size="size" />
    </div>
</template>

<script>
export default {
    props: {
        icon: { type: String, default: 'recycle' },       // What font awesome icon should be used?
        // Available font awesome sizes:
        // - literal sizing: 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x
        // - relative sizing: 2xs, xs, sm, lg, xl, 2xl
        size: { type: String, default: '2x' },        // What size should the loading icon be?
    },
}
</script>

<style scoped>
.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
</style>
