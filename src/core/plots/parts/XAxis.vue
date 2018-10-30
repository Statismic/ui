<template>
<line
    :x1="ctx.padding" :y1="ctx.containerHeight - ctx.padding" 
    :x2="ctx.containerWidth - ctx.padding" :y2="ctx.containerHeight - ctx.padding"
    :stroke="ctx.colorAxes" :stroke-width="ctx.sizeAxes"/>
</template>

<script>
export default {
  props: {
    ctx: Object
  }
};
</script>
