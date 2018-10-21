<template>
<div class="button" @click="$emit('click')" :style="{ background: colorButton, color: colorText }">
  <slot>button</slot>
</div>
</template>

<script>
export default {
  props: {
    colorButton: {
      type: String,
      default: "red"
    },
    colorText: {
      type: String,
      default: "white"
    }
  }
};
</script>


<style scoped>
.button {
  width: fit-content;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 1.2em;
  font-weight: 500;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.button:hover {
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.2);
}
</style>
