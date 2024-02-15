import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// import { library } from '@fortawesome/fontawesome-svg-core'
// import {fas} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// library.add(fas);
// VueElement.component('font-awesome-icon', FontAwesomeIcon)

import { FontAwesomeIcon } from './fontawesome.js';

const app = createApp(App)

app.use(router)

app.component('FontAwesomeIcon', FontAwesomeIcon)

app.mount('#app')
