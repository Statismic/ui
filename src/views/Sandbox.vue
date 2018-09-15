<template>
<scatter-plot xlabel="X Label" ylabel="Y Label" :xdata="xdata" :ydata="ydata" />
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
      ydata: [0, 1, 3, 5]
    };
  }
};
</script>
