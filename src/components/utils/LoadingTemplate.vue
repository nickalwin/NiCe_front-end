<template>
    <template v-if="isLoading">
        <slot name="whenLoading">
            <div :class="{ 'tw-flex tw-justify-center tw-items-center tw-h-screen': center }">
                <LoadingIndicator
                    :icon="icon"
                    :size="size"
                />
            </div>
        </slot>
    </template>
    <template v-else>
        <slot />
    </template>
</template>

<script>
import LoadingIndicator from "@/components/utils/LoadingIndicator.vue";

export default {
    components: {LoadingIndicator},
    props: {
        isLoading: { type: Boolean, default: false }, // Should it show the loading icon?
        icon: { type: String, default: 'recycle' },       // What font awesome icon should be used?
        // Available font awesome sizes:
        // - literal sizing: 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, 10x
        // - relative sizing: 2xs, xs, sm, lg, xl, 2xl
        size: { type: String, default: '2x' },        // What size should the loading icon be?
        center: { type: Boolean, default: false },    // Should the loading icon be centered?
    },
}
</script>

<style scoped>
.tw-h-screen {
    height: 80vh !important;
}
</style>
