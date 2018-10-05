<template>
<scatter-plot label-x="X Label" label-y="Y Label" :data-x="xdata" :data-y="ydata"/>
</template>

<script>
import ScatterPlot from "@/components/plots/Scatter.vue";

export default {
  components: {
    ScatterPlot
  },
  data() {
    return {
      xdata: [0, 1, 3, 5],
      ydata: [0, 7, 3, 5]
    };
  }
};
</script>
