<template>
  <div id="app">
    <vs-topbar style="justify-content: flex-start;">
      <vs-button vs-type="dark-flat" vs-icon="true"><i class="material-icons">menu</i></vs-button>
      <h3>This is my cool application topbar title</h3>
      <vs-button vs-type="dark-flat" vs-icon="more_vert"></vs-button>
    </vs-topbar>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
