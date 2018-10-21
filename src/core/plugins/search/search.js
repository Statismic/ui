import _Vue from "vue";
import categories from "@/assets/data/categories.json";
import Fuse from "fuse.js";

export const SearchPlugin = {
  install(Vue, options) {
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

    const fuseOpts = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["category", "name"]
    };

    const fuse = new Fuse(list, fuseOpts);

    Vue.prototype.$search = function(text) {
      return fuse.search(text);
    };
  }
};
