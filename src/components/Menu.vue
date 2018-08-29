<template>
  <div id="card">
    {{ name }}
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
#card {
  cursor: pointer;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

#card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}
</style>
