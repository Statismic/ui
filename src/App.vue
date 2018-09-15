<template>
<div>
  <Notification/>
  <router-view/>
</div>
</template>

<script>
import Notification from "@/components/Notification.vue";

export default {
  name: "app",
  components: {
    Notification
  }
};
</script>

<style>
* {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #005960;
  margin: 0px;
}
</style>
