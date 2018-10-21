<template>
<div class="card">
  <div class="container">
    <h3 class="title">Search Results</h3>
    <ul>
      <li v-for="(result, index) in results" :key="index">
        <router-link :to="result.path">
          <h4 class="result">{{ result.name }}</h4>
        </router-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
export default {
  props: {
    results: Array
  }
};
</script>

<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  cursor: pointer;
  width: fit-content;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  z-index: 10;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
}

.container {
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-flow: dense;
}

.title {
  color: white;
}

.result {
  color: rgba(255, 255, 255, 0.8);
}
</style>
