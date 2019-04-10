<template>
  <v-card class="pa-2" style="width: max-content;">
    <v-card-title primary-title>
      <h1>Search Results</h1>
    </v-card-title>

    <v-divider />

    <v-list>
      <v-list-tile v-for="(result, index) in results" :key="index" router :to="result.path">
        <v-list-tile-content>
          <v-list-tile-title v-text="result.name" />
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    results: {
      type: Array,
      default: () => []
    }
  }
}
</script>
