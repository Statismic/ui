<template>
<div class="container">
  <div class="header">
    <router-link to="/" id="banner">
      <img id="logo" src="@/assets/logo/logo_basic.png"/>
      <h3 id="title">Statismic</h3>
    </router-link>
    <h3 id="search">Search</h3>
  </div>
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
  grid-template-areas:
    "header header header"
    ". content-container ."
    "footer footer footer";
  grid-template-rows: minmax(40px, 50px) 1fr 50px;
  grid-template-columns: 1fr 8fr 1fr;
}

.header {
  grid-area: header;
  display: grid;
  background: #00838f;
  box-shadow: 0 2px 15px 4px rgba(0, 0, 0, 0.2);
  z-index: 5;
  padding-left: 10px;
  padding-right: 10px;
  align-items: center;
  grid-template-areas: "banner . search";
  grid-template-columns: auto 1fr auto;
}

#banner {
  display: flex;
  height: 100%;
  grid-area: banner;
  align-items: center;
}

#banner:hover {
  cursor: pointer;
}

#logo {
  max-height: 50%;
  width: auto;
  margin: 0 20px;
}

#title {
  color: whitesmoke;
}

#search {
  grid-area: search;
}

.content-container {
  grid-area: content-container;
  justify-items: center;
}

.content {
  background: white;
  box-shadow: 0 2px 10px 8px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 100%;
  height: 100%;
}

.footer {
  grid-area: footer;
}

h3 {
  margin-block-start: 0;
  margin-block-end: 0;
}

a {
  text-decoration: none;
}
</style>
