<template>
    <div>
        <NavbarComponent />
        <RouterView />
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import { RouterView } from 'vue-router';

export default {
    components: {
        NavbarComponent, RouterView,
    },
}
</script>
