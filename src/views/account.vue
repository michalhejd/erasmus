<style lang="scss" scoped>
.account-info {
  display: flex;
  flex-direction: column;
  height: 50vh;
  justify-content: center;
  align-items: center;
  .account-box {
    p{
      font-size: 1rem;
      padding-bottom: 5%;
    }
    display: flex;
    flex-direction: column;
    background-color: rgb(237, 237, 237);
    border-radius: 10px;
    margin-top: 3%;
    width: 30%;
    padding: 50px;
    div {
      display: flex;
      flex-direction: column;
      button {
        margin-top: 30px;
        background-color: transparent;
        border: none;
        cursor: pointer;
      }
    }
  }
}
</style>
<template>
  <div class="account">
    <navigation />
    <div class="accountwrap">
      <div
        class="account-info"
        v-if="this.userLoading != true && this.user != undefined"
      >
          <h1>My Account</h1>
        <div class="account-box">
          <p>Username: {{ this.user.username }}</p>
          <p>Email: {{ this.user.email }}</p>
          <p>Ballance: {{ this.user.ballance }} $Era</p>
          <div>
            <button @click="signOut()">Sign out</button>
          </div>
        </div>
      </div>
      <div
        class="error"
        v-else-if="this.userLoading != true && this.userError != undefined"
      >
        <p>{{ this.userError }}</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
export default {
  name: "account",
  components: {
    navigation,
  },
  data() {
    return {
      user: undefined,
      userLoading: false,
      userError: undefined,
    };
  },
  methods: {
    signOut() {
      this.$store.dispatch("setToken", undefined);
      this.$store.commit("setKafka", false);
      this.$router.push({ path: "/signIn" });
    },
  },
  mounted() {
    axios
      .get("http://localhost:3000/user/data", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.user = response.data;
          this.userLoading = false;
          console.log(response.data);
        }
      })
      .catch((error) => {
        this.userError = error.response.data;
        this.userLoading = false;
      });
  },
};
</script>
