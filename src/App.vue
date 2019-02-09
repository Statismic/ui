<template>
  <v-app dark>
    <Notification/>
    <v-toolbar color="secondary" v-if="this.$route.path !== '/'">
      <v-toolbar-items>
        <router-link tag="div" to="/">
          <v-layout align-center justify-center row fill-height style="cursor: pointer">
            <v-avatar tile>
              <img src="@/assets/logo/logo_basic.png" id="logo">
            </v-avatar>
            <h3 style="text-decoration: none">Statismic</h3>
          </v-layout>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
import Notification from "@/core/partials/Notification.vue";

export default {
  name: "app",
  components: {
    Notification
  }
};
</script>

<style>
#logo {
  max-height: 60%;
  width: auto;
  height: auto;
}
</style>
