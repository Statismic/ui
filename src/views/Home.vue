<template>
  <div class="container">
    <Menu v-for="(value, index) in menus" :key="index" :name="value" />
  </div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  data() {
    let menus = [];
    for (let i = 1; i <= 30; i++) menus.push(i.toString());
    return {
      menus: menus
    };
  }
};
</script>

<style scoped>
.container {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(155px, 1fr));
  justify-items: stretch;
}
</style>
