import './bootstrap.js';
import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n/index.js';

import FontAwesomeIcon from './fontawesome.js';

const app = createApp(App);

app.use(router);
app.use(i18n);

app.component('FontAwesomeIcon', FontAwesomeIcon);

app.mount('#app');
