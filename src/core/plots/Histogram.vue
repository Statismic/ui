<template>
<div class="container">
  <span ref="tooltip" class="tooltip" v-show="activeIndex !== -1">
    <div>frequency: {{ currentFreq }}</div>
    <div>range: {{ currentRange }}</div>
  </span>
  
  <svg ref="plot" class="container">
    <x-axis :ctx="this"/>
    <y-axis :ctx="this"/>
    <x-label :ctx="this"/>
    <y-label :ctx="this"/>

    <!-- First index because of boundary issue -->
    <text
      :x="computeX(0)" :y="computeY(0) + 20"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ range[0] | round }}
    </text>

    <g v-for="(c, index) in counter" :key="index">
      <text
        :x="computeX(index + 1)" :y="computeY(0) + 20"
        :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
        {{ (index + 1) * interval | round }}
      </text>

      <text
        :x="computeX(0) - 15" :y="computeY(c) + 5"
        :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
        writing-mode="tb-rl"
        v-show="activeIndex === index">
        {{ c }}
      </text>

      <rect class="bar hover" transform="scale(1,-1)"
          :x="computeX(index)" :y="-(computeY(0))"
          :width="scaleX" :height="scaleY * c"
          :fill="colorBar" stroke-width="1" stroke="black"
          @mouseover="activeIndex=index"
          @mouseout="activeIndex=-1"/>

      <line
        :x1="computeX(0)" :y1="computeY(c)" 
        :x2="computeX(index)" :y2="computeY(c)" 
        :stroke="colorHighlighter" stroke-dasharray="5,5"
        v-show="activeIndex===index"/>
    </g>
  </svg>
</div>
</template>

<script>
import BaseMixins from "./base";
import { XAxis, YAxis, XLabel, YLabel } from "./parts";

export default {
  /**
    range: range of min max of data-x
    color-bar: color for bars in the histogram
    color-highlighter: color for helper lines when you hover bars 
   */
  mixins: [BaseMixins],
  props: {
    range: {
      type: Array,
      // Min-max of dataX [min, max]
      default: () => [0, 1]
    },
    interval: {
      type: Number,
      required: true
    },

    // Design Customizations
    colorBar: {
      type: String,
      default: "green"
    },
    colorHighlighter: {
      type: String,
      default: "black"
    }
  },
  components: {
    YAxis,
    XAxis,
    XLabel,
    YLabel
  },
  data() {
    return {
      activeIndex: -1 // Index based on xdata
    };
  },
  computed: {
    counter() {
      const n = Math.floor((this.range[1] - this.range[0]) / this.interval);
      let counter = Array.from({ length: n }, () => 0);
      if (this.dataX === undefined || this.dataX.length === 0) return counter;
      const hash = val => {
        const h = Math.floor(val / this.interval);
        return h === n ? h - 1 : h; // This is to handle the last value
      };
      for (let v of this.dataX) counter[hash(v)]++;

      return counter;
    },
    currentFreq() {
      return this.activeIndex >= 0 ? this.counter[this.activeIndex] : 0;
    },
    currentRange() {
      if (this.activeIndex < 0) return "";
      const low = this.activeIndex * this.interval;
      const high = low + this.interval;
      return `${low.toPrecision(2)} - ${high.toPrecision(2)}`;
    },
    width() {
      return this.counter.length;
    },
    height() {
      const max = Math.max(...this.counter);
      return max === 0 ? 1 : max;
    }
  },
  mounted() {
    window.addEventListener("mousemove", this.tooltipHandler);
  },
  beforeDestroy() {
    window.removeEventListener("mousemove", this.tooltipHandler);
  },
  methods: {
    tooltipHandler(e) {
      this.$refs.tooltip.style.left = e.pageX + "px";
      this.$refs.tooltip.style.top = e.pageY + "px";
    }
  }
};
</script>

<style scoped>
@import "./base.css";

.bar {
  -webkit-transition: width 0.4s ease 0s, height 0.4s ease 0s;
  -moz-transition: width 0.4s ease 0s, height 0.4s ease 0s;
  -o-transition: width 0.4s ease 0s, height 0.4s ease 0s;
  transition: width 0.4s ease 0s, height 0.4s ease 0s;
}

.tooltip {
  padding: 10px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  font-size: 0.8em;
  position: absolute;
  z-index: 1;
}
</style>
