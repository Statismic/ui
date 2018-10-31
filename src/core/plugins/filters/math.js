export const MathPlugin = {
  install(Vue) {
    Vue.filter(
      "round",
      value => (Number.isInteger(value) ? value : value.toPrecision(2))
    );
  }
};
