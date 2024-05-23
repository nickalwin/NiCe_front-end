/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

import axios from 'axios';
window.axios = axios;

const BACKEND_URL = import.meta.env.VITE_APP_BACKEND_API_URL;

// only for development
axios.defaults.baseURL = BACKEND_URL ?? "http://localhost:5219/";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
