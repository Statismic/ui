export const routes = [
  {
    path: "scatter-plot",
    component: () => import(/* webpackChunkName: "plots" */ "./ScatterPlot.vue")
  },
  {
    path: "histogram",
    component: () => import(/* webpackChunkName: "plots" */ "./Histogram.vue")
  },
  {
    path: "button",
    component: () => import(/* webpackChunkName: "components" */ "./Button.vue")
  }
];
