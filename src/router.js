import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import PageNotFound from "./views/PageNotFound.vue";
import { routes as simulationsRoutes } from "./views/simulations";
import { routes as examplesRoutes } from "./views/examples";
import AppContainer from "./views/AppContainer.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/app/simulations",
      component: AppContainer,
      children: [{ path: "", component: PageNotFound }, ...simulationsRoutes]
    },
    {
      path: "/examples",
      component: AppContainer,
      children: [{ path: "", component: PageNotFound }, ...examplesRoutes]
    },
    {
      path: "*",
      component: PageNotFound
    }
  ]
});
