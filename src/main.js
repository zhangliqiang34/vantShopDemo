import Vue from 'vue';
import App from './App';
import { router } from './router';
import store from './store'
import { Lazyload } from 'vant';

// options 为可选参数，无则不传
Vue.use(Lazyload);
new Vue({
    router,
    store,
    el: '#app',
    render: h => h(App)
});