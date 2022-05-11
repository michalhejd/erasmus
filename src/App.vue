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
import axios from "axios";
export default {
  async created() {
    this.$store.dispatch("getProducts");
    await axios
      .get("https://erasmustartup.eu/kafka", {
        headers: {
          Authorization: "Bearer " + this.$store.state.token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.$store.dispatch("setKafka", true);
        } else {
          this.$store.dispatch("setKafka", false);
          this.$store.dispatch("setToken", undefined);
        }
        this.$store.dispatch("setLoading", false);
      })
      .catch((error) => {
        this.$store.dispatch("setKafka", false);
        this.$store.dispatch("setToken", undefined);
        this.$store.dispatch("setLoading", false);
      });
  },
};
</script>