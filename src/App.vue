<template>
    <div>
        <NavbarComponent />
        <RouterView />
        <FooterComponent />
    </div>
</template>

<script>
import NavbarComponent from '@/components/NavbarComponent.vue';
import { RouterView } from 'vue-router';
import FooterComponent from '@/components/FooterComponent.vue'; 
import { themeChange } from 'theme-change'

export default {
    components: {
        NavbarComponent, RouterView,FooterComponent
    },
    mounted() {
        themeChange();
    }
}
</script>
