<template>
<div>
  <div class="card">
    {{ name }}
  </div>
</div>
</template>

<script>
export default {
  props: {
    name: String
  }
};
</script>

<style scoped>
.card {
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  text-align: center;
  cursor: pointer;
  height: 30px;
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
</style>
