export const routes = [
  {
    path: "scatter-plot",
    component: () => import(/* webpackChunkName: "plots" */ "./ScatterPlot.vue")
  },
  {
    path: "histogram",
    component: () => import(/* webpackChunkName: "plots" */ "./Histogram.vue")
  }
];
