import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PageNotFound from "./views/PageNotFound.vue";
import { routes as simulationsRoutes } from "./views/simulations";
import { routes as examplesRoutes } from "./views/examples";
import App from "./views/App.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/app/simulations",
      component: App,
      children: [{ path: "", component: PageNotFound }, ...simulationsRoutes]
    },
    {
      path: "/examples",
      component: App,
      children: [{ path: "", component: PageNotFound }, ...examplesRoutes]
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
