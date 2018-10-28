<template>
<text
  :x="ctx.padding - 40" :y="ctx.height / 2" :fill="ctx.colorLabel"
  :font-size="ctx.sizeLabel" text-anchor="middle" writing-mode="tb-rl">
  {{ ctx.labelY }}
</text>
</template>

<script>
export default {
  props: {
    ctx: Object
  }
};
</script>
