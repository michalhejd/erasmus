<style lang="scss">
html,
body,
p,
h1,
h2,
h3,
h4,
h5,
h6,
div,
span {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  --base-color: #c4ecf4;
  --main-color: #f5f5f5;
  --border-color: rgb(209, 206, 206);
}
#app {
  font-family: "Poppins", sans-serif;
  font-weight: 500;
}
::-moz-selection {
  color: black;
  background: #ffe65b;
}

::selection {
  color: black;
  background: #ffe65b;
}
</style>
<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch("getProducts");
  },
};
</script>