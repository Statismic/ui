export const routes = [
  {
    path: "button",
    component: () => import(/* webpackChunkName: "components" */ "./Button.vue")
  },
  {
    path: "form",
    component: () => import(/* webpackChunkName: "components" */ "./Form.vue")
  }
];
