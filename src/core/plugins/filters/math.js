export const MathPlugin = {
  install(Vue) {
    Vue.filter("round", value => value.toPrecision(2));
  }
};
