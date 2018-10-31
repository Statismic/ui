<template>
<svg ref="plot" class="container">
  <y-axis :ctx="this"/>
  <x-axis :ctx="this"/>
  <y-label :ctx="this"/>
  <x-label :ctx="this"/>

  <g v-for="(v, index) in dataX" :key="index">
    <text
      :x="computeX(v)" :y="computeY(0) + 20"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ v }}
    </text>
    <text
      :x="computeX(0) - 15" :y="computeY(dataY[index]) + 5"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
      writing-mode="tb-rl">
      {{ dataY[index] }}
    </text>

    <circle class="hover"
      :cx="computeX(v)" 
      :cy="computeY(dataY[index])" 
      :r="sizePoint" :fill="colorPoint"
      @mouseover="activeIndex=index"
      @mouseout="activeIndex=-1"/>

    <line 
      :x1="computeX(0)" :y1="computeY(dataY[index])" 
      :x2="computeX(v)" :y2="computeY(dataY[index])" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
    <line
      :x1="computeX(v)" :y1="computeY(0)" 
      :x2="computeX(v)" :y2="computeY(dataY[index])" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
  </g>
</svg>
</template>

<script>
import BaseMixins from "./base";
import { XAxis, YAxis, XLabel, YLabel } from "./parts";

export default {
  /**
    data-y: an array of y values
    color-point: color for points in the plot
    color-highlighter: color for helper lines when you hover points
    size-point: sizes of points in the plot
   */
  mixins: [BaseMixins],
  props: {
    dataY: {
      type: Array,
      required: true
    },
    colorPoint: {
      type: String,
      default: "black"
    },
    colorHighlighter: {
      type: String,
      default: "black"
    },
    sizePoint: {
      type: String,
      default: "5"
    }
  },
  data() {
    return {
      activeIndex: -1 // Index based on xdata
    };
  },
  computed: {
    height() {
      const max = this.$math.safe(Math.max(...this.dataY));
      const min = this.$math.safe(Math.min(...this.dataY));
      const diff = max - min;
      return diff === 0 ? 1 : diff;
    },
    width() {
      const max = this.$math.safe(Math.max(...this.dataX));
      const min = this.$math.safe(Math.min(...this.dataX));
      const diff = max - min;
      return diff === 0 ? 1 : diff;
    }
  },
  components: {
    YAxis,
    XAxis,
    XLabel,
    YLabel
  }
};
</script>

<style scoped>
@import "./base.css";
</style>
