import Vue from 'vue'
import App from './App.vue'
import plugins from './packages/index.js'
Vue.use(plugins)
/**
 * 按需引入element-ui
 */
// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 };
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
