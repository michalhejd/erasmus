<style lang="scss" scoped>
.navigation {
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .logo {
    font-size: 26px;
  }
  .cart {
    svg {
      width: 16px;
    }
  }
  .icons {
    display: flex;
    align-items: center;
    gap: 30px;
    font-size: 20px;
    text-decoration: none;
    color: black;
    svg {
      text-decoration: none;
      color: black;
    }
  }
  a{
    text-decoration: none;
    color: black;
  }
}
</style>
<template>
  <div class="navigation">
    <router-link to="/"><div class="logo">EraShop</div></router-link>
    <div class="icons">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      <router-link :to="kafka ? '/account' : '/signIn'">
      <font-awesome-icon icon="fa-solid fa-user" />
      </router-link>
      <router-link to="/cart">
        <font-awesome-icon icon="fa-solid fa-cart-shopping" />
      </router-link>
      <font-awesome-icon icon="fa-solid fa-bars-staggered" />
    </div>
  </div>
</template>
<script>
export default {
  name: "navigation",
  computed: {
    kafka(){
      return this.$store.state.kafka;
    },
    link(){
      return this.$store.state.link;
    }
  },
};
</script>