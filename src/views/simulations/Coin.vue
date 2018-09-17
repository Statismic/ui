<template>
<div>

  <header class="nav">
    <h1 class="nav-logo">Statistismic
      <img class="nav-logo" src="https://raw.githubusercontent.com/Statismic/ui/master/src/assets/logo/logo_basic.png" height=40px width=40px/>
    </h1>
  </header>

  <h1 class="description">
    Coin Flip Simmulation
  </h1>
  <div class="input">
    <form action="#">
        # of coins : <input type="number" v-model="coins"><br>
        # of experiments : <input type="number" v-model="exper"><br>
        probability of success (heads) : <input type="number" v-model="probability"><br>
        hide coin visualization <input type="checkbox" v-model="hidden"><br>
        <button type="button" @click="run">Run Experiment</button>
    </form>
      <!-- TODO restrict some input to decimal point -->
  </div>
  <div class="short-graph">This is the short-term Graph</div>
  <div class="output">
    <p v-show="!hidden">{{coinString}}</p>
    <p v-html="timerString"></p>
  </div>
  <div class="long-graph">This is the long-term Graph</div>
  <footer class="foot">Just pretend I'm a super rad footer</footer>
  


</div>
</template>


<script>
export default {
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
      accuracy: 1000 //decimal accuracy s.t. we weight the random probability
    };
  },
  methods: {
    doExper() {
      this.coinString = "";
      let processedProb = Math.round(this.probability * this.accuracy);
      if (this.coins < 0 || this.exper < 0) return;
      for (let j = 0; j < this.exper; j++) {
        for (let i = 0; i < this.coins; i++) {
          let x = Math.round(Math.random() * this.accuracy) <= processedProb;
          this.coinString += +x;
          this.coinString += "\t";
          this.total++;
          if (x === true) this.heads++;
        }
      }
    },
    run() {
      let t0 = performance.now();
      this.doExper();
      let t1 = performance.now();
      this.timerString =
        "Call took " +
        (t1 - t0) +
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
      this.coins = Math.round(val);
    },
    exper(val) {
      this.exper = Math.round(val);
    }
  }
};
</script>

<style scoped>
div {
  line-height: 1.6;
  margin: 0;
  padding: 0;
  background: lightblue;

  display: grid;
  grid-template:
    "nav nav nav nav" auto
    "description description description description" auto
    ". input short-graph ." 39vh
    ". output long-graph ." 39vh
    "foot foot foot foot" auto
    / 1fr minmax(15em, 3fr) minmax(30em, 6fr) 1fr;
  grid-column-gap: 1.5em;
}

.nav {
  grid-area: nav;
  background: #005960;
}
.nav-logo {
  text-align: left;
  color: white;
}
.description {
  margin: 0;
  padding: 0;
  grid-area: description;
  text-align: center;
  background: #056f78;
}
.input {
  margin-top: 2em;
  padding: 1.5em;
  grid-area: input;
  background: lightcoral;
}
.short-graph {
  margin-top: 2em;
  padding: 1.5em;
  grid-area: short-graph;
  background: #86d5db;
}
.output {
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 1.5em;
  grid-area: output;
  background: #5acdd6;
}
.long-graph {
  margin-top: 2em;
  margin-bottom: 2em;
  padding: 1.5em;
  grid-area: long-graph;
  background: #5acdd6;
}
.foot {
  grid-area: foot;
  background: #005960;
}
</style>
