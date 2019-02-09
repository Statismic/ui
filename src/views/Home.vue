<template>
  <v-container fluid>
    <transition :css="false" @enter="onLeaveSearchMode" @leave="onEnterSearchMode">
      <img id="logo" src="@/assets/logo/logo_transparent.png" v-show="!searchMode">
    </transition>

    <input id="search" type="text" placeholder="Search" v-model="searchTerm">
    <SearchResult
      ref="searchResult"
      key="result"
      id="search-result"
      v-show="searchMode"
      :results="searchResults"
    />

    <div class="grid-container" v-show="!searchMode">
      <Category v-for="(category, index) in categories" :key="index" :category="category"/>
    </div>
  </v-container>
</template>

<script>
import categories from "@/assets/data/categories.json";
import Category from "@/core/partials/Category.vue";
import SearchResult from "@/core/partials/SearchResult.vue";
import { TweenLite } from "gsap";

export default {
  name: "home",
  components: {
    Category,
    SearchResult
  },
  data() {
    return {
      searchTerm: "",
      searchMode: false,
      searchResults: [],
      dialog: false,
      categories: categories
    };
  },
  methods: {
    onEnterSearchMode(el, done) {
      TweenLite.to(el, 1, { maxHeight: "0px", onComplete: done });
    },
    onLeaveSearchMode(el, done) {
      TweenLite.to(el, 1, { maxHeight: "350px", onComplete: done });
    }
  },
  watch: {
    searchTerm(val) {
      if (val === "") {
        this.searchMode = false;
        return;
      }

      this.searchMode = true;
      this.searchResults = this.$search(val);
    }
  }
};
</script>

<style scoped>
#logo {
  display: block;
  margin: 0 auto;
  max-height: 400px;
}

input#search {
  display: block;
  border: 0;
  outline: 0;
  margin: 0 auto;
  margin-bottom: 20px;
  width: 300px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  text-align: center;
  font-size: 1.5em;
}

#search-result {
  margin: 0 auto;
}

.grid-container {
  padding: 40px 20px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
</style>
