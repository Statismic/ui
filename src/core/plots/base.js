export default {
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
      default: 2.2
    },
    sizeIndex: {
      type: String,
      default: "1em"
    }
  },
  data() {
    return {
      height: 0,
      width: 0
    };
  },
  methods: {
    resizeHandler() {
      const { width, height } = this.$refs.plot.getBoundingClientRect();
      this.height = height;
      this.width = width;
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
