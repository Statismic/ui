<template>
<svg ref="plot" class="plot">
  <line class="axes axes-x" 
    :x1="padding" :y1="height - padding" 
    :x2="width - padding" :y2="height - padding" />
  <line class="axes axes-y" 
    :x1="padding" :y1="height - padding" 
    :x2="padding" :y2="padding" />

  <text class="label label-x"
    :x="width / 2" :y="height - padding + 45" :fill="colorLabel"
    :font-size="sizeLabel" text-anchor="middle">
    {{ labelX }}
  </text>
  <text class="label label-y"
    :x="padding - 40" :y="height / 2" :fill="colorLabel"
    :font-size="sizeLabel" text-anchor="middle" writing-mode="tb-rl">
    {{ labelY }}
  </text>

  <g v-for="(v, index) in dataX" :key="index">
    <text class="index index-x"
      :x="padding + v * gapX" :y="height - (padding - 20)"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ v }}
    </text>
    <text class="index index-y"
      :x="padding - 15" :y="height - padding + 5 - dataY[index] * gapY"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
      writing-mode="tb-rl">
      {{ dataY[index] }}
    </text>

    <circle class="point"
      :cx="padding + v * gapX" 
      :cy="height - padding - dataY[index] * gapY" 
      :r="sizePoint" :fill="colorPoint"
      @mouseover="activeIndex=index"
      @mouseout="activeIndex=-1"/>

    <line class="highligher highlighter-x" 
      :x1="padding" :y1="height - padding - dataY[index] * gapY" 
      :x2="padding + v * gapX - 3" :y2="height - padding - dataY[index] * gapY" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
    <line class="highligher highlighter-y" 
      :x1="padding + v * gapX" :y1="height - padding" 
      :x2="padding + v * gapX" :y2="height - padding + 3 - dataY[index] * gapY" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
  </g>

</svg>
</template>

<script>
export default {
  /**
    label-x: label for x axis
    label-y: label for y axis
    data-x: an array of x values
    data-y: an array of y values
    padding: space between parent and the plot
    color-label: color for label-x and label-y
    color-index: color for data-x and data-y
    color-point: color for points in the plot
    color-highlighter: color for helper lines when you hover points
    size-label: sizes of label-x and label-y
    size-index: sizes of data-x and data-y
    size-point: sizes of points in the plot
   */
  props: {
    labelX: String,
    labelY: String,
    dataX: {
      type: Array,
      required: true
    },
    dataY: {
      type: Array,
      required: true
    },

    // Design Customizations
    padding: {
      padding: Number,
      default: 50
    },
    colorLabel: {
      type: String,
      default: "black"
    },
    colorIndex: {
      type: String,
      default: "black"
    },
    colorPoint: {
      type: String,
      default: "black"
    },
    colorHighlighter: {
      type: String,
      default: "black"
    },
    sizeLabel: {
      type: String,
      default: "1em"
    },
    sizeIndex: {
      type: String,
      default: "1em"
    },
    sizePoint: {
      type: String,
      default: "5"
    }
  },
  data() {
    return {
      height: 0,
      width: 0,
      gapX: 0,
      gapY: 0,
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
      this.xGapHandler();
      this.yGapHandler();
    },
    xGapHandler() {
      const max = Math.max(...this.dataX);
      const length = this.width - 2 * this.padding;
      this.gapX = length / max;
    },
    yGapHandler() {
      const max = Math.max(...this.dataY);
      const length = this.height - 2 * this.padding;
      this.gapY = length / max;
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

.point:hover {
  fill: gray;
  cursor: pointer;
}
</style>
