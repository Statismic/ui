<template>
<div>
  <h1>
    Coin Flip Simmulation
  </h1>

  <form action="#">
    # of coins : <input type="number" v-model="coins"><br>
    # of experiments : <input type="number" v-model="exper"><br>
    probability of success (heads) : <input type="number" v-model="probability"><br>
    hide coin visualization <input type="checkbox" v-model="hidden"><br>
    <button type="button" @click="run">Run Experiment</button>

</form>
  <!-- TODO restrict some input to decimal point -->

  <br>
  <br>
  <br>
  <span>Hidden?: {{ hidden }}</span><br>
  <p v-show="!hidden">{{coinString}}</p>
  <p>{{timerString}}</p>

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
      probability: .5,
      hidden: false,
      accuracy: 1000,
    };
  },
  methods: {
    doExper(){
      this.coinString = ""
      let processedProb = Math.round(this.probability*this.accuracy)
      if(this.coins<0||this.exper<0)
        return
      for(let j = 0; j<this.exper; j++){
        for(let i = 0; i<this.coins; i++){
          let x = (Math.round(Math.random()*this.accuracy)<= processedProb)
          this.coinString+= +x
          this.coinString+="\t"
          this.total++
          if(x===1)
            this.heads++     
        }
      }
    },
    run(){
      let t0 = performance.now();
      this.doExper();
      let t1 = performance.now();
      this.timerString = "Call took " + (t1 - t0) + " milliseconds."+
          "<br>Heads : "+ this.heads +
          "<br>Total : "+ this.total +
          "<br>Ratio : "+ (this.heads/this.total).toPrecision(5) 
    }
  },
  watch: {
    coins(val) {
      this.coins = Math.round(val);
    },
    exper (val) {
      this.exper = Math.round(val);
    }
  }
};
</script>

<style scoped>
</style>

