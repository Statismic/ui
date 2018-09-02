export const routes = [
  {
    path: "coin",
    component: () => import(/* webpackChunkName: "simulations" */ "./Coin.vue")
  }
];
