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
    path: "trendline",
    component: () => import(/* webpackChunkName: "plots" */ "./Trendline.vue")
  },
  {
    path: "button",
    component: () => import(/* webpackChunkName: "components" */ "./Button.vue")
  },
  {
    path: "form",
    component: () => import(/* webpackChunkName: "components" */ "./Form.vue")
  }
];
