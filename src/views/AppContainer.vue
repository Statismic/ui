<template>
<div class="container">
  <div class="header">
    <router-link to="/" id="banner">
      <img id="logo" src="@/assets/logo/logo_basic.png"/>
      <h3 id="title">Statismic</h3>
    </router-link>
    <h3 id="search">Search</h3>
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
  grid-template-rows: minmax(40px, 65px) max-content auto minmax(30px, 50px);
}

.header {
  display: grid;
  background: #60599e;
  box-shadow: 0 2px 15px 4px rgba(0, 0, 0, 0.2);
  z-index: 5;
  padding-left: 10px;
  padding-right: 10px;
  grid-template-areas: "banner . search";
  grid-template-columns: max-content 1fr max-content;
}

#banner {
  display: grid;
  grid-area: banner;
  grid-template-columns: auto auto;
}

#banner:hover {
  cursor: pointer;
}

#logo {
  max-height: 50%;
  margin: auto 20px;
}

#title {
  color: whitesmoke;
  margin: auto;
}

#search {
  grid-area: search;
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
