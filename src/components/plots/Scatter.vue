<template>
<svg ref="plot" class="plot">
  <line class="axes axes-x" 
    :x1="padding" :y1="height - padding" 
    :x2="width - padding" :y2="height - padding" />
  <line class="axes axes-y" 
    :x1="padding" :y1="height - padding" 
    :x2="padding" :y2="padding" />

  <text class="label label-x"
    :x="width / 2" :y="height - padding + 45" 
    text-anchor="middle">
    {{ xlabel }}
  </text>
  <text class="label label-y"
    :x="padding - 40" :y="height / 2" 
    text-anchor="middle" writing-mode="tb-rl">
    {{ ylabel }}
  </text>

  <g v-for="(v, index) in xdata" :key="index">
    <text class="index index-x"
      :x="padding + v * xgap" :y="height - (padding - 20)"
      text-anchor="middle">
      {{ v }}
    </text>
    <text class="index index-y"
      :x="padding - 15" :y="height - padding + 5 - v * ygap"
      text-anchor="middle" writing-mode="tb-rl">
      {{ v }}
    </text>

    <circle class="point"
      :cx="padding + v * xgap" 
      :cy="height - padding - ydata[index] * ygap" 
      r="3" fill="black"
      @mouseover="activeIndex=index"
      @mouseout="activeIndex=-1"/>

    <line class="highligher highlighter-x" 
      :x1="padding" :y1="height - padding - ydata[index] * ygap" 
      :x2="padding + v * xgap - 3" :y2="height - padding - ydata[index] * ygap" 
      stroke="black" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
    <line class="highligher highlighter-y" 
      :x1="padding + v * xgap" :y1="height - padding" 
      :x2="padding + v * xgap" :y2="height - padding + 3 - ydata[index] * ygap" 
      stroke="black" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
  </g>

</svg>
</template>

<script>
export default {
  props: {
    xlabel: String,
    ylabel: String,
    ydata: Array,
    xdata: Array
  },
  data() {
    return {
      height: 0,
      width: 0,
      padding: 50, // for axes
      xgap: 0,
      xwidth: 0,
      ygap: 0,
      yheight: 0,
      activeIndex: -1 // Index based on xdata
    };
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      this.height = this.$refs.plot.clientHeight;
      this.width = this.$refs.plot.clientWidth;
      this.xwidth = this.width - 2 * this.padding;
      this.yheight = this.height - 2 * this.padding;
      this.xgapHandler();
      this.ygapHandler();
    },
    xgapHandler() {
      const max = Math.max(...this.xdata);
      this.xgap = this.xwidth / max;
    },
    ygapHandler() {
      const max = Math.max(...this.ydata);
      this.ygap = this.yheight / max;
    }
  }
};
</script>

<style scoped>
.plot {
  width: 100%;
  height: 100%;
}

.axes {
  stroke: black;
  stroke-width: 2.2;
}

.label {
  font-size: 1em;
}

.index {
  font-size: 0.8em;
}

.point:hover {
  fill: gray;
  cursor: pointer;
}
</style>
