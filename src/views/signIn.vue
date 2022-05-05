<style lang="scss" scoped>
.signin{
    width: 100%;
    height: 100vh;
    .container{
        height: 92vh;
        display: flex;
        justify-content: center;
        align-items: center;
        form{
            display: flex;
            flex-direction: column;
            gap: 10px;
        }
    }
    .signedIn{
        height: 92vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
<template>
  <div class="signin">
    <navigation />
    <div class="container" v-if="kafka != true">
      <form v-on:submit.prevent="login">
        <label for="username"></label>
        <input type="text" id="username" v-model="username" />
        <label for="password"></label>
        <input type="password" v-model="password" />
        <p :style="{ color: color }">{{ message }}</p>
        <input type="submit" value="přihlásit se" />
      </form>
    </div>
    <div class="signedIn" v-else>
    <p>You're already signed in!</p></div>
  </div>
</template>
<script>
import navigation from "@/components/navigation.vue";
import axios from "axios";
export default {
  name: "signin",
  components: {
    navigation,
  },
  data() {
    return {
      username: "",
      password: "",
      message: "",
      color: "",
    };
  },
  computed: {
    kafka() {
      return this.$store.state.kafka;
    },
  },
  methods: {
    async login() {
      this.$store.dispatch("setLoading", true);
      await axios
        .post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch("setToken", response.data);
            this.$store.commit("setKafka", true);
            this.$router.push("/account")
          }
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.color = "red";
          console.log(error)
          this.message = error.response.data
          this.$store.commit("setKafka", false);
          this.dispatch("setToken", undefined);
        });
    },
  },
};
</script>