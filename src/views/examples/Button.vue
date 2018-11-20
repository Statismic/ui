<template>
<div style="margin: 30px;">
  <Button color-button="#005662" color-text="white" @click="greet">
    Execute
  </Button>
  <br>
    <Button color-button="#00838f" color-text="white" @click="greet">
    Execute
  </Button>
</div>
</template>

<script>
import Button from "@/core/components/Button.vue";
export default {
  components: {
    Button
  },
  methods: {
    greet() {
      alert("Hello world!");
    }
  }
};
</script>
