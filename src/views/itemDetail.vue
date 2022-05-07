<style lang="scss" scoped>
</style>
<template>
  <div class="itemDetail">
    <navigation />
    <div class="container" v-if="product && productLoading != true">
      <p>{{ product.name }}</p>
      <p>{{ product.price }}&euro;</p>
      <p v-if="product.quantity == 0" style="color: red;">Out of stock</p>
      <button @click="addToCart()" :disabled="product.quantity == 0">Add to cart</button>
    </div>
      <loader v-else/>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
import loader from "@/components/loader.vue";
export default {
  name: "itemDetail",
  components: {
    navigation,
    loader,
  },
  methods: {
    async addToCart() {
      console.log(this.$store.state.token)
      console.log(this.$store.state.product.name)
      axios
      .post("http://localhost:3000/user/cart/add",{itemName: this.$store.state.product.name}, { headers: { Authorization: `Bearer ${this.$store.state.token}`},
      })
    },
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    productLoading() {
      return this.$store.state.productLoading;
    },
  },
  mounted() {
    this.$store.dispatch("setLoading", true);
    this.$store.dispatch("getProduct", this.$route.params.id);
  },
};
</script>