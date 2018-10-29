<template>
<svg ref="plot" class="container">
  <y-axis :ctx="this"/>
  <x-axis :ctx="this"/>
  <y-label :ctx="this"/>
  <x-label :ctx="this"/>

  <path :d="path" stroke="black" fill="transparent" stroke-width="2"/>

  <g v-for="(v, index) in dataX" :key="index">
    <text
      :x="padding + v * gapX" :y="height - (padding - 20)"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ v }}
    </text>
    <text
      :x="padding - 15" :y="height - padding + 5 - dataY[index] * gapY"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
      writing-mode="tb-rl">
      {{ dataY[index] }}
    </text>

    <circle class="hover"
      :cx="padding + v * gapX" 
      :cy="height - padding - dataY[index] * gapY" 
      :r="sizePoint" :fill="colorPoint"
      @mouseover="activeIndex=index"
      @mouseout="activeIndex=-1"/>

    <line 
      :x1="padding" :y1="height - padding - dataY[index] * gapY" 
      :x2="padding + v * gapX - 3" :y2="height - padding - dataY[index] * gapY" 
      :stroke="colorHighlighter" stroke-dasharray="5,5"
      v-show="activeIndex===index"/>
    <line
      :x1="padding + v * gapX" :y1="height - padding" 
      :x2="padding + v * gapX" :y2="height - padding + 3 - dataY[index] * gapY" 
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
    gapX() {
      const max = Math.max(...this.dataX);
      const length = this.width - 2 * this.padding;
      return length / max;
    },
    gapY() {
      const max = Math.max(...this.dataY);
      const length = this.height - 2 * this.padding;
      return length / max;
    },
    path() {
      if (this.dataX.length < 2) return "";
      let paths = [];
      const x = this.dataX;
      const y = this.dataY;
      const getX = x => this.padding + x * this.gapX;
      const getY = y => this.height - this.padding - y * this.gapY;

      paths.push(`M${getX(x[0])},${getY(y[0])}`);
      for (let i = 1; i < x.length; i++)
        paths.push(`L${getX(x[i])},${getY(y[i])}`);

      return paths.join(" ");
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
