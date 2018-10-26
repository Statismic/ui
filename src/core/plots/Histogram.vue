<template>
<div class="container">
  <span ref="tooltip" class="tooltip" v-show="activeIndex !== -1">
    <div>frequency: {{ currentFreq }}</div>
    <div>range: {{ currentRange }}</div>
  </span>
  
  <svg ref="plot" class="container">
    <line class="axes" 
      :x1="padding" :y1="height - padding" 
      :x2="width - padding" :y2="height - padding" 
      :stroke="colorAxes" :stroke-width="sizeAxes"/>
    <line class="axes" 
      :x1="padding" :y1="height - padding" 
      :x2="padding" :y2="padding" 
      :stroke="colorAxes" :stroke-width="sizeAxes"/>

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

    <!-- First index because of boundary issue -->
    <text class="index index-x"
      :x="padding" :y="height - (padding - 20)"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ range[0] | round }}
    </text>

    <g v-for="(c, index) in counter" :key="index">
      <text class="index index-x"
        :x="padding + (index + 1) * barWidth" :y="height - (padding - 20)"
        :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
        {{ (index + 1) * interval | round }}
      </text>

      <text class="index index-y"
        :x="padding - 15" :y="height - padding + 5 - c * gapY"
        :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
        writing-mode="tb-rl"
        v-show="activeIndex === index">
        {{ c }}
      </text>

      <rect class="bar" transform="scale(1,-1)"
          :x="padding + index * barWidth" :y="-(height - padding)"
          :width="barWidth" :height="c * gapY"
          :fill="colorBar" stroke-width="1" stroke="black"
          @mouseover="activeIndex=index"
          @mouseout="activeIndex=-1"/>

      <line class="highligher highlighter-x" 
        :x1="padding" :y1="height - padding - c * gapY" 
        :x2="padding + index * barWidth" :y2="height - padding - c * gapY" 
        :stroke="colorHighlighter" stroke-dasharray="5,5"
        v-show="activeIndex===index"/>
    </g>
  </svg>
</div>
</template>

<script>
import BaseMixins from "./base";

export default {
  /**
    label-x: label for x axis
    label-y: label for y axis
    data-x: an array of x values
    range: range of min max of data-x
    padding: space between parent and the plot
    color-label: color for label-x and label-y
    color-axis: color the axes lines
    color-index: color for data-x and data-y
    color-bar: color for bars in the histogram
    color-highlighter: color for helper lines when you hover bars 
    size-label: sizes of label-x and label-y
    size-index: sizes of data-x and data-y
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
    barWidth() {
      const length = this.width - 2 * this.padding;
      return length / this.counter.length;
    },
    gapY() {
      let max = Math.max(...this.counter);
      const length = this.height - 2 * this.padding;
      return length / max;
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
  },
  watch: {
    counter() {
      this.barWidthHandler();
      this.yGapHandler();
    }
  }
};
</script>

<style scoped>
@import "./base.css";

.bar:hover {
  fill: gray;
  cursor: pointer;
}

.bar {
  -webkit-transition: width 0.4s ease 0s, height 0.4s ease 0s, fill 0.4s ease 0s; /* Safari */
  -moz-transition: width 0.4s ease 0s, height 0.4s ease 0s, fill 0.4s ease 0s;
  -o-transition: width 0.4s ease 0s, height 0.4s ease 0s, fill 0.4s ease 0s;
  transition: width 0.4s ease 0s, height 0.4s ease 0s, fill 0.4s ease 0s;
  will-change: width, height, fill;
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
