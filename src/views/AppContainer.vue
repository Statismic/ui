<template>
<div class="container">
  <div class="header">
  </div>
  <div class="navbar"></div>
  <div class="content-container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
  <div class="footer"></div>
</div>
</template>

<style scoped>
.container {
  display: grid;
  width: 100%;
  grid-template-rows: minmax(50px, 80px) max-content auto minmax(30px, 50px);
}

.header {
  background: #60599e;
  box-shadow: 0 2px 15px 4px rgba(0, 0, 0, 0.2);
  z-index: 5;
}

.content-container {
  display: grid;
  grid-template-columns: minmax(5px, 100px) auto minmax(5px, 100px);
  grid-template-areas: ". content .";
  justify-items: center;
}

.content {
  grid-area: content;
  background: white;
  box-shadow: 0 2px 10px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
}
</style>
