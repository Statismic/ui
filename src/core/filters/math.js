import Vue from "vue";

Vue.filter("round", value => value.toPrecision(2));
