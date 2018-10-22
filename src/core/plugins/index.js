import Methods from "./methods";
import Filters from "./filters";

export default {
  install(Vue) {
    Vue.use(Methods);
    Vue.use(Filters);
  }
};
