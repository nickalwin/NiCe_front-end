/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

// only for development
// axios.defaults.baseURL = "http://10.75.1.29:5219/";
axios.defaults.baseURL = "http://localhost:5219/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
