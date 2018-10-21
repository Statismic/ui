<template>
<div>
  <transition name="show">
    <img id="logo" src="@/assets/logo/logo_transparent.png" height="350px" v-show="!searchMode" />
  </transition>
  <input id="search" type="text" placeholder="Search" v-model="searchTerm">
  <SearchResult id="search-result" v-show="searchMode" :results="searchResults" />

  <div class="grid-container" v-show="!searchMode">
    <CategoryModal v-show="showModal" @close="showModal = false" :name="modal.name" :apps="modal.apps" />
    <Category v-for="(category, index) in categories" :key="index" :name="category.name" @click.native="onShowModal(category)"/>
  </div>

  <vue-particles
    color="#dedede"
    :particleOpacity="0.7"
    :particlesNumber="80"
    shapeType="circle"
    :particleSize="4"
    linesColor="#dedede"
    :linesWidth="1"
    :lineLinked="true"
    :lineOpacity="0.4"
    :linesDistance="150"
    :moveSpeed="3"
    :hoverEffect="true"
    hoverMode="grab"
    :clickEffect="true"
    clickMode="push"
  >
  </vue-particles>
</div>
</template>

<script>
import categories from "@/assets/data/categories.json";
import Fuse from "fuse.js";
import Category from "@/core/partials/Category.vue";
import CategoryModal from "@/core/partials/CategoryModal.vue";
import SearchResult from "@/core/partials/SearchResult.vue";

export default {
  name: "home",
  components: {
    Category,
    CategoryModal,
    SearchResult
  },
  data() {
    let list = [];
    categories.forEach((category, index) => {
      for (const app of category.apps) {
        list.push({
          id: index,
          category: category.name,
          name: app.name,
          path: app.path
        });
      }
    });

    const options = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["category", "name"]
    };

    return {
      fuse: new Fuse(list, options),
      searchTerm: "",
      searchMode: false,
      searchResults: [],
      showModal: false,
      categories: categories,
      modal: {
        name: "",
        apps: []
      }
    };
  },
  methods: {
    onShowModal(category) {
      this.showModal = true;
      this.modal.name = category.name;
      this.modal.apps = category.apps;
    }
  },
  watch: {
    searchTerm(val) {
      if (val === "") {
        this.searchMode = false;
        return;
      }

      this.searchMode = true;
      this.searchResults = this.fuse.search(val);
    }
  }
};
</script>

<style scoped>
#logo {
  display: block;
  margin: 0 auto;
}

.show-enter,
.show-leave-to {
  max-height: 0px;
}

.show-enter-to,
.show-leave {
  max-height: 350px;
}

.show-enter-active,
.show-leave-active {
  -webkit-transition: max-height 1s ease 0s;
  -moz-transition: max-height 1s ease 0s;
  -o-transition: max-height 1s ease 0s;
  transition: max-height 1s ease 0s;
  will-change: max-height;
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

#particles-js {
  position: absolute;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  z-index: -1;
}
</style>
