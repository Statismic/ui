<template>
<div>
  <histogram label-x="X Label" label-y="Y Label" :data-x="xdata" :interval="0.1" style="height: 600px;"/>
  <Button color-button="gray" @click="add" style="margin: 60px auto;">Add</Button>
</div>
</template>

<script>
import Histogram from "@/core/plots/Histogram.vue";
import Button from "@/core/components/Button.vue";

export default {
  components: {
    Histogram,
    Button
  },
  data() {
    return {
      xdata: [0.9]
    };
  },
  methods: {
    add() {
      this.xdata.push(Math.random());
    }
  }
};
</script>
