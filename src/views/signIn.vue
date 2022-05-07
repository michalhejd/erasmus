<style lang="scss" scoped>
@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");
.signin {
  width: 100%;
  height: 100vh;
  font-family: "Raleway", sans;
  .container {
    height: 92vh;
    display: flex;
    justify-content: center;
    align-items: center;
    form {
      .input {
        background-color: #f1f1f1;
        border-style: none;
        padding: 1vh;
        border: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0.5vh;
        width: 35vh;
      }
      .main {
        padding: 10vh 15vh 10vh 15vh;
      }
      border-radius: 6vh;
      display: flex;
      flex-direction: column;
      gap: 10vh;
      background-color: #fbfbfb;
      h1 {
        text-align: center;
        margin-bottom: 1.5vh;
      }
      p {
        padding-top: 2vh;
        padding-bottom: 2vh;
      }
      .flex-one {
        display: flex;
        justify-content: center;
        .submit {
          background-color: rgba(232, 232, 232, 0.56);
          border-style: none;
          border: none;
          padding: 1.5vh 2vh;
          border-radius: 1.5vh;
        }
      }
    }
  }
}
.signedIn {
  height: 92vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  .account {
    display: flex;
  }
}
</style>
<template>
  <div class="signin">
    <navigation />
    <div class="container" v-if="kafka != true">
      <form v-on:submit.prevent="login">
        <div class="main">
          <h1>Sign in</h1>
          <p>Username/mail</p>
          <label for="username" class="username"></label>
          <input type="text" id="username" class="input" v-model="username" />
          <p>Password</p>
          <label for="password"></label>
          <input type="password" class="input" v-model="password" />
          <p :style="{ color: color }">{{ message }}</p>
          <div class="flex-one">
            <input class="submit" type="submit" value="Login" />
          </div>
        </div>
      </form>
    </div>
    <div class="signedIn" v-else>
      <p>You're already signed in!</p>
      <div class="account">
        <p>Check out your&nbsp;</p>
        <router-link to="/account">account</router-link>
        <p>!</p>
      </div>
    </div>
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
            this.$router.push("/account");
          }
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.color = "red";
          console.log(error);
          this.message = error.response.data;
          this.$store.commit("setKafka", false);
          this.$store.commit("setToken", undefined);
        });
    },
  },
};
</script>
