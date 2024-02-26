<template>
    <div>
        <NavbarComponent />
        <RouterView />
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import { RouterView } from 'vue-router';
import { themeChange } from 'theme-change'

export default {
    components: {
        NavbarComponent, RouterView,
    },
    mounted() {
        themeChange();
    }
}
</script>
