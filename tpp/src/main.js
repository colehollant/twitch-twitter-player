import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// font awesome stuff
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee, faHome, faBars, faForward, faBackward } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faCoffee, faHome, faBars, faForward, faBackward)

import { Tweet, Moment, Timeline } from 'vue-tweet-embed'
Vue.component('Tweet', Tweet)
Vue.component('Moment', Moment)
Vue.component('Timeline', Timeline)



Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
