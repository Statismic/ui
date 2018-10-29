<template>
<trendline label-x="X Label" label-y="Y Label" :data-x="xdata" :data-y="ydata"/>
</template>

<script>
import Trendline from "@/core/plots/Trendline.vue";

export default {
  components: {
    Trendline
  },
  data() {
    return {
      xdata: [0, 1, 3, 5],
      ydata: [0, 7, 3, 5]
    };
  }
};
</script>
