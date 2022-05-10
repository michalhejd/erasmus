<style lang="scss" scoped>
.account {
  width: 100vw;
  height: 100vh;
  .account-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .account-box {
      p {
        font-size: 1rem;
        padding-bottom: 5%;
      }
      .account-center {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        h2 {
          margin-top: 30px;
        }
      }
      p {
        padding: 5%;
      }
      .account-parametr-stats {
        margin-bottom: 30px;
      }
      display: flex;
      flex-direction: column;
      background-color: #FBFBFB;
      border-radius: 50px;
      margin-top: 3%;
      width: 30%;
      padding: 50px;
      div {
        display: flex;
        flex-direction: column;
        button {
          margin-top: 30px;
          background-color: white;
          padding: 10px;
          border: none;
          border-radius: 50px;
          cursor: pointer;
        }
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
          <p>Username:</p>
          <p class="account-parametr-stats">{{ this.user.username }}</p>
          <p>Email:</p>
          <p class="account-parametr-stats">{{ this.user.email }}</p>
          <p>Ballance:</p>
          <p class="account-parametr-stats">{{ this.user.ballance }} $Era</p>
          <div>
            <button @click="signOut()">Sign out</button>
          </div>
          <div v-if="this.user.ownedItems !== []">
            <div class="account-center">
              <h2>Owned Items</h2>
            </div>
            <div v-if="this.user.ownedItems != undefined || this.user.ownedItems != '' || this.user.ownedItems != []">
              <p>Name:</p>
              <p v-for="item in this.user.ownedItems" :key="item.name">
                {{ item.name }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div
        class="error"
        v-else-if="this.userLoading != true && this.userError != undefined"
      >
        <p>{{ this.userError }}</p>
      </div>
      <loader v-else />
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
import loader from "@/components/loader.vue";
export default {
  name: "account",
  components: {
    navigation,
    loader,
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
    this.$store.dispatch("setLoading", true);
    axios
      .get("https://erasmustartup.eu/user/data", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.user = response.data;
          this.$store.dispatch("setLoading", false);

          console.log(response.data);
        }
      })
      .catch((error) => {
        this.userError = error.response.data;
        this.$store.dispatch("setLoading", false);
      });
  },
};
</script>
