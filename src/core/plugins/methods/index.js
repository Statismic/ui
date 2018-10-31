import { SearchPlugin } from "./search";
import { MathPlugin } from "./math";

export default {
  install(Vue) {
    Vue.use(SearchPlugin);
    Vue.use(MathPlugin);
  }
};
