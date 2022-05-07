<style lang="scss" scoped>
</style>
<template>
  <div class="account">
    <navigation />
    <div class="accountwrap">
      <div
        class="account-info"
        v-if="this.userLoading != true && this.user != undefined"
      >
        <p>{{ this.user.username }}</p>
        <p>{{ this.user.email }}</p>
        <p>{{ this.user.ballance }}</p>
        <p>{{ this.user.state }}</p>
        <button @click="signOut()">Sign out</button>
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