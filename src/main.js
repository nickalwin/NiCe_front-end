import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import FontAwesomeIcon from './fontawesome.js';

const app = createApp(App)

app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
