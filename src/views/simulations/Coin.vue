<template>
<div class="gridcontainer">

  <div class="input">
    <div class="tab">flip <input type="number" v-model="coins"> coin(s)</div>
    <div class="tab">run <input type="number" v-model="exper"> experiment(s)</div>
    <div class="tab"> have a <input type="number" v-model="probability"> probability of success (heads)</div>
    <div class="tab">hide coin visualization <input type="checkbox" v-model="hidden"></div>
    <button type="button" @click="run">Run Experiment</button>
    <!-- Give people a reason to use your form -->
    <!-- TODO restrict some input to decimal point -->
  </div>
  <div class="short-graph">
    <histogram label-x="Ratio" label-y="Experiment(s)" :data-x="xDataShort" :interval="0.1"/>
  </div>
  <div class="output">
    <div v-show="!hidden">{{coinString}}</div>
    <div v-html="timerString"></div>
  </div>
  <div class="long-graph">
    <histogram label-x="Ratio" label-y="Trials" :data-x="xDataLong" :interval="0.1"/>
  </div>

</div>
</template>


<script>
import Histogram from "@/components/plots/Histogram.vue";

export default {
  components: {
    Histogram
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
      xDataShort: [],
      xDataLong: [],
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
            // save computation by only building the coin visualization
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
        this.xDataShort.push(experiementHead / this.coins);
        experiementHead = 0;
      }
      this.xDataLong.push(trialHead / (this.coins * this.exper));
    },
    run() {
      this.doExper();
      this.timerString =
        "Heads : " +
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
  background: lightblue;
  padding: 1.5em;
  min-height: 100%;

  display: grid;
  grid-template:
    "input" auto
    "short-graph" minmax(200px, 400px)
    "long-graph" minmax(200px, 400px)
    "output" auto
    / minmax(300px, auto);
  grid-gap: 1.5em;
}
@media screen and (min-width: 792px) {
  .gridcontainer {
    background: lightblue;
    padding: 1.5em;
    min-height: 100%;

    display: grid;
    grid-template:
      "input short-graph"
      "output long-graph"
      / minmax(15em, 40%) minmax(30em, 60%);
    grid-gap: 1.5em;
  }
}

.input {
  padding: 1.5em;
  grid-area: input;
  background: lightcoral;
}
.short-graph {
  grid-area: short-graph;
  background: #86d5db;
}
.output {
  padding: 1.5em;
  grid-area: output;
  background: #5acdd6;
}
.long-graph {
  grid-area: long-graph;
  background: #5acdd6;
}
.tab {
  margin-left: 15px;
}
</style>
