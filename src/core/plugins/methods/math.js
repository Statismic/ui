export const MathPlugin = {
  install(Vue) {
    Vue.prototype.$math = {
      safe(val) {
        if (
          val === undefined ||
          isNaN(val) ||
          val === Infinity ||
          val === -Infinity
        )
          return 0;
        return val;
      }
    };
  }
};
