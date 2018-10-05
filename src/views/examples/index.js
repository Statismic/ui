export const routes = [
  {
    path: "scatter-plot",
    component: () => import(/* webpackChunkName: "plots" */ "./ScatterPlot.vue")
  }
];
