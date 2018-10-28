<template>
<text
    :x="ctx.width / 2" :y="ctx.height - ctx.padding + 45" :fill="ctx.colorLabel"
    :font-size="ctx.sizeLabel" text-anchor="middle">
    {{ ctx.labelX }}
</text>
</template>

<script>
export default {
  props: {
    ctx: Object
  }
};
</script>
