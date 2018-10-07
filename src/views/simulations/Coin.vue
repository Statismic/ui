<template>
<div class="gridcontainer">

  <div class="input">
    <div>I want to:</div> 
    <form action="#">
        <div class="tab">flip <input type="number" v-model="coins"> coin(s)</div>
        <div class="tab">run <input type="number" v-model="exper"> experiment(s)</div>
        <div class="tab"> have a <input type="number" v-model="probability"> probability of success (heads)</div>
        <div class="tab">hide coin visualization <input type="checkbox" v-model="hidden"></div>
        <button type="button" @click="run">Run Experiment</button>
    </form>
      <!-- TODO restrict some input to decimal point -->
  </div>
  <div class="short-graph">
    <scatter-plot label-x="Ratio" label-y="Experiment(s)" :data-x="xDataShort" :data-y="yDataShort"/>
  </div>
  <div class="output">
    <p v-show="!hidden">{{coinString}}</p>
    <p v-html="timerString"></p>
  </div>
  <div class="long-graph">
    <scatter-plot label-x="Ratio" label-y="Trials" :data-x="xDataLong" :data-y="yDataLong"/>
  </div>

</div>
</template>


<script>
import ScatterPlot from "@/components/plots/Scatter.vue";

export default {
  components: {
    ScatterPlot
  },
  data() {
    return {
      coins: 1,
      coinString: "",
      timerString: "",
      heads: 0,
      total: 0,
      exper: 1,
      probability: 0.5,
      hidden: false,
      xDataShort: [0, 1],
      yDataShort: [0, 1],
      xDataLong: [0, 1],
      yDataLong: [0, 1],
      accuracy: 1000 //decimal accuracy s.t. we weight the random probability
    };
  },
  methods: {
    doExper() {
      this.coinString = "";
      let trialHead = 0;
      trialHead = 0;
      let experiementHead = 0;
      let processedProb = Math.round(this.probability * this.accuracy);
      if (this.coins < 0 || this.exper < 0) return;
      for (let j = 0; j < this.exper; j++) {
        for (let i = 0; i < this.coins; i++) {
          let x = Math.round(Math.random() * this.accuracy) <= processedProb;
          if (!this.hidden) {
            // save computation by onlyb building the coin visualization
            //    string if the user wants it
            this.coinString += +x;
            this.coinString += "\t";
          }
          this.total++;
          if (x === true) {
            this.heads++;
            experiementHead++;
            trialHead++;
          }
        }
        this.xDataShort.push((experiementHead / this.coins).toPrecision(2));
        experiementHead = 0;
      }
      this.xDataLong.push(
        (trialHead / (this.coins * this.exper)).toPrecision(2)
      );
    },
    run() {
      let t0 = performance.now();
      this.doExper();
      let t1 = performance.now();
      this.timerString =
        "Call took " +
        (t1 - t0).toFixed(1) +
        " milliseconds." +
        "<br>Heads : " +
        this.heads +
        "<br>Total : " +
        this.total +
        "<br>Ratio : " +
        (this.heads / this.total).toPrecision(5);
    }
  },
  watch: {
    coins(val) {
      this.coins = Math.abs(Math.round(val));
    },
    exper(val) {
      this.exper = Math.abs(Math.round(val));
    },
    probability(val) {
      this.probability = Math.abs(val % 1);
    }
  }
};
</script>

<style scoped>
.gridcontainer {
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background: lightblue;

  display: grid;
  grid-template:
    "input short-graph" 49vh
    "output long-graph" 49vh
    / minmax(15em, 30%) minmax(30em, 70%);
  grid-column-gap: 1.5em;
  grid-row-gap: 1.5em;
}

.input {
  margin-top: 1.5em;
  margin-left: 1.5em;
  padding: 1.5em;
  grid-area: input;
  background: lightcoral;
}
.short-graph {
  margin-right: 1.5em;
  margin-top: 1.5em;
  grid-area: short-graph;
  background: #86d5db;
}
.output {
  margin-left: 1.5em;
  margin-bottom: 1.5em;
  padding: 1.5em;
  grid-area: output;
  background: #5acdd6;
}
.long-graph {
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  padding: 1.5em;
  grid-area: long-graph;
  background: #5acdd6;
}
.tab {
  margin-left: 15px;
}
</style>
