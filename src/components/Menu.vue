<template>
<div>
    <div class="collapsible" @click="isCollapsed=!isCollapsed">
        <i class="fas icon" :class="{ 'fa-plus': isCollapsed, 'fa-minus': !isCollapsed }"></i>
        {{ name }}
    </div>
    <transition name="drop">
        <div class="content" v-show="!isCollapsed">
            <p>Lorem ipsum...</p>
        </div>
    </transition>
</div>
</template>

<script>
export default {
  props: {
    name: String
  },
  data() {
    return {
      isCollapsed: true
    };
  }
};
</script>

<style scoped>
.collapsible {
  background-color: #522d80;
  color: white;
  text-align: center;
  cursor: pointer;
  padding: 15px;
  padding-left: 20px;
  padding-right: 20px;
  border-radius: 5px;
  z-index: 10;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.collapsible:hover {
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
}

.icon {
  font-size: 13px;
  color: white;
  float: right;
  margin-top: 3px;
}

/* Style the collapsible content. Note: hidden by default */
.content {
  cursor: pointer;
  padding: 0 18px;
  overflow: hidden;

  /* Add shadows to create the "card" effect */
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.content:hover {
  box-shadow: 0 2px 1px 0 rgba(0, 0, 0, 0.2);
}

/* Drop down animation */
.drop-enter-active {
  animation: drop-down 0.3s;
  animation-fill-mode: forwards;
}
.drop-leave-active {
  animation: drop-down 0.3s reverse;
  animation-fill-mode: forwards;
}
@keyframes drop-down {
  0% {
    transform: translateY(-30px);
    opacity: 0;
  }
  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}
</style>
