<template>
<svg ref="plot" class="container">
  <y-axis :ctx="this"/>
  <x-axis :ctx="this"/>
  <y-label :ctx="this"/>
  <x-label :ctx="this"/>

  <path :d="path" stroke="black" fill="transparent" stroke-width="2"/>

  <g v-for="(v, index) in dataX" :key="index">
    <text
      :x="computeX(v - minX)" :y="computeY(0) + 20"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle"
      v-if="index % indexMultiplierX === 0">
      {{ v | round }}
    </text>
    <text
      :x="computeX(0) - 15" :y="computeY(dataY[index] - minY) + 5"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
      writing-mode="tb-rl" v-if="index % indexMultiplierY === 0">
      {{ dataY[index] | round }}
    </text>

    <circle class="hover"
      :cx="computeX(v - minX)" 
      :cy="computeY(dataY[index] - minY)" 
      :r="sizePoint" :fill="colorPoint"
      @mouseover="activeIndex=index"
      @mouseout="activeIndex=-1"/>

    <line 
      :x1="computeX(0)" :y1="computeY(dataY[index] - minY)" 
      :x2="computeX(v - minX)" :y2="computeY(dataY[index] - minY)" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
    <line
      :x1="computeX(v - minX)" :y1="computeY(0)" 
      :x2="computeX(v - minX)" :y2="computeY(dataY[index] - minY)" 
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
    minX() {
      return this.$math.safe(Math.min(...this.dataX));
    },
    minY() {
      return this.$math.safe(Math.min(...this.dataY));
    },
    height() {
      const max = this.$math.safe(Math.max(...this.dataY));
      const diff = max - this.minY;
      return diff === 0 ? 1 : diff;
    },
    width() {
      const max = this.$math.safe(Math.max(...this.dataX));
      const diff = max - this.minX;
      return diff === 0 ? 1 : diff;
    },
    path() {
      if (this.dataX.length < 2) return "";
      let paths = [];
      const x = this.dataX;
      const y = this.dataY;

      paths.push(
        `M${this.computeX(x[0] - this.minX)},${this.computeY(y[0] - this.minY)}`
      );
      for (let i = 1; i < x.length; i++)
        paths.push(
          `L${this.computeX(x[i] - this.minX)},${this.computeY(
            y[i] - this.minY
          )}`
        );

      return paths.join(" ");
    },
    indexMultiplierX() {
      return Math.ceil(this.dataX.length / this.nIndexX);
    },
    indexMultiplierY() {
      return Math.ceil(this.dataY.length / this.nIndexY);
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
