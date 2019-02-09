<template>
  <v-layout align-start justify-space-around row fill-height>
    <v-spacer></v-spacer>
    <v-flex grow>
      <v-card light>
        <router-view></router-view>
      </v-card>
    </v-flex>
    <v-spacer></v-spacer>
  </v-layout>
</template>

<style scoped>
</style>
