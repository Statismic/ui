<template>
  <div class="gridcontainer">
    <form class="input">
      <v-text-field v-model="coins" label="coins" type="number" required />
      <v-text-field v-model="exper" label="experiments" type="number" required />
      <v-text-field v-model="probability" label="success probability" type="number" required />

      <v-btn class="run" color="#00838f" style="color: white;" @click="run">
        Run Experiment
      </v-btn>
    </form>

    <div class="short-graph">
      <plot
        type="trendline"
        :options="{labelX: 'Experiment', labelY: 'Probability', sizePoint: 2.5}"
        :data="trendlineData"
      />
    </div>
    <div class="output">
      <div v-html="timerString" />
      <div v-show="!hidden">
        {{ coinString }}
      </div>
    </div>
    <div class="long-graph">
      <plot
        type="histogram"
        :options="{labelX: 'Ratio', labelY: 'Experiment(s)', barColor: '#A9E3F5'}"
        :data="xDataShort"
      />
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      trendlineData: [],
      coins: 1,
      coinString: '',
      timerString: '',
      heads: 0,
      total: 0,
      exper: 1,
      experCounter: 0,
      probability: 0.5,
      hidden: true,
      xDataShort: Array(10)
        .fill()
        .map((_, i) => ({
          x: (0.1 * i).toFixed(1),
          y: 0
        })),
      accuracy: 1000 // decimal accuracy for the random probability
    }
  },
  watch: {
    coins(val) {
      this.coins = Math.abs(Math.round(val))
    },
    exper(val) {
      this.exper = Math.abs(Math.round(val))
    },
    probability(val) {
      this.probability = Math.abs(val % 1)
    }
  },
  methods: {
    /**
     * @param prob is [0.0, 1.0]
     */
    cntrHash(prob) {
      return Math.floor(prob * this.xDataShort.length)
    },
    doExper() {
      this.coinString = ''
      let experiementHead = 0
      const processedProb = Math.round(this.probability * this.accuracy)
      if (this.coins < 0 || this.exper < 0) return
      for (let j = 0; j < this.exper; j++) {
        for (let i = 0; i < this.coins; i++) {
          const x = Math.round(Math.random() * this.accuracy) <= processedProb
          if (!this.hidden) {
            // save computation by only building the coin visualization
            //    string if the user wants it
            this.coinString += +x + '\t'
          }
          this.total++
          if (x === true) {
            this.heads++
            experiementHead++
          }
        }
        this.xDataShort[this.cntrHash(experiementHead / this.coins)].y++
        this.trendlineData.push({
          x: this.experCounter,
          y: experiementHead / this.coins
        })
        this.experCounter++
        experiementHead = 0
      }
      if (this.trendlineData.length > 50) {
        const start = this.trendlineData.length - 50
        this.trendlineData = this.trendlineData.slice(start)
      }
    },
    run() {
      this.doExper()
      this.timerString =
        'Heads : ' +
        this.heads +
        '<br>Total : ' +
        this.total +
        '<br>Ratio : ' +
        (this.heads / this.total).toPrecision(5)
    }
  }
}
</script>

<style scoped>
.gridcontainer {
  min-height: 100%;

  display: grid;

  grid-template:
    'input' auto
    'short-graph' minmax(200px, 400px)
    'long-graph' minmax(200px, 400px)
    'output' auto
    / minmax(300px, auto);
  grid-gap: 1.5em;
}
@media screen and (min-width: 792px) {
  .gridcontainer {
    padding: 1.5em;
    min-height: 100%;

    display: grid;
    grid-template:
      'input short-graph'
      'output long-graph'
      / minmax(15em, 40%) minmax(30em, 60%);
    grid-gap: 1.5em;
  }
}

.input {
  padding: 1.5em;
  grid-area: input;
}
.short-graph {
  grid-area: short-graph;
}
.output {
  padding: 1.5em;
  grid-area: output;
}
.long-graph {
  grid-area: long-graph;
}
.tab {
  margin-left: 15px;
}
.run {
  margin: 1em 0em;
  display: grid;
  grid-template: 'runicon runtext';
}
.runicon {
  margin: 0.25em;
}
.runtext {
  margin: 0.25em 0.25em 0.25em 0.75em;
}
</style>
