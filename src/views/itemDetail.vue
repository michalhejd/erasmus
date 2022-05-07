<style lang="scss" scoped>
</style>
<template>
  <div class="itemDetail">
    <navigation />
    <div class="container" v-if="product">
      <p>{{ product.name }}</p>
      <p>quantity: {{ product.quantity }}</p>
      <p>{{ product.price }}&euro;</p>
      <button @click="addToCart()">Add to cart</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
export default {
  name: "itemDetail",
  components: {
    navigation,
  },
  methods: {
    async addToCart() {
      await axios
        .post(
          "http://localhost:3000/user/cart/add", {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
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
    this.$store.dispatch("getProduct", this.$route.params.id);
  },
};
</script>