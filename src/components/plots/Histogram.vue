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

  <g v-for="(c, index) in counter" :key="index">
    <text class="index index-x"
      :x="padding + (index + 0.5) * barWidth" :y="height - (padding - 20)"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle">
      {{ c.value | round }}
    </text>
    <text class="index index-y"
      :x="padding - 15" :y="height - padding + 5 - c.freq * gapY"
      :fill="colorIndex" :font-size="sizeIndex" text-anchor="middle" 
      writing-mode="tb-rl">
      {{ c.freq }}
    </text>

    <rect class="bar" transform="scale(1,-1)"
        :x="padding + index * barWidth" :y="-(height - padding)"
        :width="barWidth" :height="c.freq * gapY"
        :fill="colorBar" stroke-width="1" stroke="black"
        @mouseover="activeIndex=index"
        @mouseout="activeIndex=-1"/>

    <line class="highligher highlighter-x" 
      :x1="padding" :y1="height - padding - c.freq * gapY" 
      :x2="padding + index * barWidth" :y2="height - padding - c.freq * gapY" 
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
    interval: {
      type: Number,
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
    colorBar: {
      type: String,
      default: "green"
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
      barWidth: 0,
      gapY: 0,
      activeIndex: -1 // Index based on xdata
    };
  },
  computed: {
    counter() {
      if (this.dataX === undefined || this.dataX.length === 0) return [];
      const sorted = [...this.dataX].sort();
      const min = sorted[0];

      let currentTreshold = min + this.interval;
      let currentIndex = 0;
      let counter = [
        {
          value: currentTreshold - this.interval / 2,
          freq: 0
        }
      ];

      for (let v of sorted) {
        while (v > currentTreshold) {
          currentTreshold += this.interval;
          counter.push({
            value: currentTreshold - this.interval / 2,
            freq: 0
          });
          currentIndex++;
        }

        counter[currentIndex].freq++;
      }

      return counter;
    }
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
      const { width, height } = this.$refs.plot.getBoundingClientRect();
      this.height = height;
      this.width = width;
      if (this.counter.length === 0) return;
      this.barWidthHandler(this.counter);
      this.yGapHandler(this.counter);
    },
    barWidthHandler(counter) {
      const length = this.width - 2 * this.padding;
      this.barWidth = length / counter.length;
    },
    yGapHandler(counter) {
      let max = Math.max(...counter.map(c => c.freq));
      const length = this.height - 2 * this.padding;
      this.gapY = length / max;
    }
  },
  filters: {
    round(value) {
      return value.toPrecision(2);
    }
  },
  watch: {
    counter(newCounter) {
      this.barWidthHandler(newCounter);
      this.yGapHandler(newCounter);
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

.bar:hover {
  fill: gray;
  cursor: pointer;
}

.bar {
  -webkit-transition: width 0.4s ease 0s, height 0.4s ease 0s; /* Safari */
  -moz-transition: width 0.4s ease 0s, height 0.4s ease 0s;
  -o-transition: width 0.4s ease 0s, height 0.4s ease 0s;
  transition: width 0.4s ease 0s, height 0.4s ease 0s;
  will-change: width, height;
}
</style>
