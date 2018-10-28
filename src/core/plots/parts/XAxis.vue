<template>
<line
    :x1="ctx.padding" :y1="ctx.height - ctx.padding" 
    :x2="ctx.width - ctx.padding" :y2="ctx.height - ctx.padding" 
    :stroke="ctx.colorAxes" :stroke-width="ctx.sizeAxes"/>
</template>

<script>
export default {
  props: {
    ctx: Object
  }
};
</script>
