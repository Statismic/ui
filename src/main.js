import Vue from "vue";
import VueParticles from "vue-particles";
import plugins from "./core/plugins";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import StatismicPlots from "@statismic/plots";
import StatismicComponents from "@statismic/components";
import "./registerServiceWorker";

library.add(faSearch);
library.add(faPlay);
Vue.component("fa", FontAwesomeIcon);

Vue.use(VueParticles);
Vue.use(plugins);
Vue.use(StatismicPlots);
Vue.use(StatismicComponents);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
