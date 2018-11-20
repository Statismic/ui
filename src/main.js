import Vue from "vue";
import VueParticles from "vue-particles";
import plugins from "./core/plugins";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@statismic/plots";
import "./registerServiceWorker";

library.add(faSearch);
library.add(faPlay);

Vue.component("fa", FontAwesomeIcon);
Vue.use(VueParticles);
Vue.use(plugins);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
