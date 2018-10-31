function nIndex(size) {
  const baseSize = 480;
  const baseNIndex = 10;

  return Math.floor((baseNIndex * size) / baseSize);
}

export default {
  /** 
  label-x: label for x axis
  label-y: label for y axis
  data-x: an array of x values
  padding: space between parent and the plot
  color-label: color for label-x and label-y
  color-axis: color the axes lines
  color-index: color for data-x and data-y
  size-label: sizes of label-x and label-y
  size-index: sizes of data-x and data-y
  */
  props: {
    labelX: String,
    labelY: String,
    dataX: {
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
    colorAxes: {
      type: String,
      default: "black"
    },
    colorIndex: {
      type: String,
      default: "black"
    },
    sizeLabel: {
      type: String,
      default: "1em"
    },
    sizeAxes: {
      type: String,
      default: "2.2"
    },
    sizeIndex: {
      type: String,
      default: "1em"
    }
  },
  data() {
    return {
      containerHeight: 0,
      containerWidth: 0
    };
  },
  computed: {
    height() {},
    width() {},
    scaleX() {
      return (this.containerWidth - 2 * this.padding) / this.width;
    },
    scaleY() {
      return (this.containerHeight - 2 * this.padding) / this.height;
    },
    nIndexX() {
      return nIndex(this.containerWidth);
    },
    nIndexY() {
      return nIndex(this.containerHeight);
    }
  },
  methods: {
    resizeHandler() {
      const { width, height } = this.$refs.plot.getBoundingClientRect();
      this.containerHeight = height;
      this.containerWidth = width;
    },
    computeX(x) {
      return this.padding + x * this.scaleX;
    },
    computeY(y) {
      return (this.height - y) * this.scaleY + this.padding;
    }
  },
  mounted() {
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.resizeHandler);
  }
};
