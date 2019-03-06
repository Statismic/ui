<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card id="container" slot="activator" color="rgba(0, 0, 0, 0.5)" elevation="4" ripple>
      <v-card-title>
        <h3 id="title" class="capitalize">
          {{ category.name }}
        </h3>
      </v-card-title>
    </v-card>

    <v-card light>
      <v-card-title primary-title>
        <h2 class="capitalize">
          {{ category.name }}
        </h2>
      </v-card-title>
      <v-divider />

      <v-list>
        <v-list-tile v-for="(app, index) in category.apps" :key="index">
          <v-list-tile-content>
            <v-list-tile-title>
              <nuxt-link :to="app.path" class="capitalize">
                {{ app.name }}
              </nuxt-link>
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      default: () => null
    }
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>
#container {
  cursor: pointer;
  border-radius: 5px;
}

#title {
  color: white;
  text-align: center;
  width: 100%;
}

.capitalize {
  text-transform: capitalize;
}
</style>
