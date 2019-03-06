<template>
  <v-app dark>
    <v-toolbar color="secondary">
      <v-toolbar-items>
        <router-link tag="div" to="/">
          <v-layout align-center justify-center row fill-height style="cursor: pointer">
            <v-avatar tile>
              <img id="logo" src="@/assets/logo/logo_basic.png">
            </v-avatar>
            <h3 style="text-decoration: none">
              Statismic
            </h3>
          </v-layout>
        </router-link>
      </v-toolbar-items>
    </v-toolbar>
    <v-content>
      <v-layout align-start justify-space-around row fill-height>
        <v-spacer />
        <v-flex grow>
          <v-card light>
            <router-view />
          </v-card>
        </v-flex>
        <v-spacer />
      </v-layout>
    </v-content>
  </v-app>
</template>

<style scoped>
#logo {
  max-height: 60%;
  width: auto;
  height: auto;
}
</style>
