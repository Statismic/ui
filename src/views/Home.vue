<template>
<div>
  <img id="logo" src="@/assets/logo/logo_transparent.png" height="350px"/>
  <input type="text" placeholder="Search">
  <div class="grid-container">
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
    <Menu v-for="(category, index) in menus" :key="index" :name="category.name" :apps="category.apps" />
  </div>
</div>
</template>

<script>
import Menu from "@/components/Menu.vue";

export default {
  name: "home",
  components: {
    Menu
  },
  data() {
    let menus = [];

    menus.push({
      name: "Simulations",
      apps: [
        {
          name: "Coin",
          path: "/app/simulations/coin"
        }
      ]
    });
    for (let i = 1; i < 15; i++) {
      menus.push({
        name: i.toString(),
        apps: [
          {
            name: "Lorem ipsum dolor sit amet.",
            path: "/"
          }
        ]
      });
    }

    return {
      menus: menus
    };
  }
};
</script>

<style scoped>
#logo {
  display: block;
  margin: 0 auto;
}

input {
  display: block;
  border: 0;
  outline: 0;
  margin: 0 auto;
  width: 300px;
  background: transparent;
  border-bottom: 1px solid white;
  color: white;
  text-align: center;
  font-size: 1.5em;
}

.grid-container {
  padding: 40px;
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
