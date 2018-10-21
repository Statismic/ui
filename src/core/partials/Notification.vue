<template>
<!-- The actual snackbar -->
<div id="notification" v-show="updateAvailable">
  <h4 id="text">A new version of Statismic is available
    <a id="reload" href="" @click.prevent="onReload">REFRESH</a>
  </h4>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState(["updateAvailable"])
  },
  methods: {
    ...mapActions(["updateAvailableOff"]),
    onReload() {
      this.updateAvailableOff();
      location.reload(true);
    }
  }
};
</script>


<style scoped>
#notification {
  position: absolute;
  background-color: #3f69aa;
  width: 100%;
  box-shadow: 0 2px 10px 2px rgba(0, 0, 0, 0.2);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  vertical-align: middle;
}

#text {
  margin: 13px;
}

#reload {
  color: white;
}
</style>
