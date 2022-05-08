<style lang="scss" scoped>
.cartProduct {
  display: flex;
  gap: 10px;
}
.shopHere {
  display: flex;
}
</style>
<template>
  <div class="cart">
    <navigation />
    <div class="container" v-if="this.cart != undefined">
      <template v-for="(product, index) in this.cart">
        <div class="cartProduct" :key="index">
          <p>{{ product.item }}</p>
          <p>{{ product.price }}&euro;</p>
          <p>{{ product.quantity }}</p>
          <button @click="removeItem(product.item)"></button>
        </div>
      </template>
      <button @click="removeAll()"></button>
    </div>
    <div class="empty" v-else>
      <p>Your cart is empty!</p>
      <div class="shopHere">
        <p>You can shop&nbsp;</p>
        <router-link to="/products">here</router-link>
        <p>!</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
export default {
  name: "cart",
  components: {
    navigation,
  },
  data() {
    return {
      cart: undefined,
      cartLoading: false,
      cartError: undefined,
    };
  },
  mounted() {
    axios
      .get("http://localhost:3000/user/cart/data", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.cart = response.data;
          this.cartLoading = false;
        }
      })
      .catch((error) => {
        this.cartError = error.response.data;
      });
  },
  methods: {
    removeItem(product) {
      this.$store.dispatch("setLoading", true);
      axios
        .post(
          "http://localhost:3000/user/cart/remove",
          {
            itemName: product,
          },
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch("setLoading", false);
            this.$store.dispatch("setCart", response.data);
          }
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.cartError = error.response.data;
        });
    },
    removeAll() {
      this.$store.dispatch("setLoading", true);
      axios
        .post("/user/cart/removeall", {
          headers: {
            Authorization: `Bearer ${this.$store.state.token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch("setLoading", false);
            this.$store.dispatch("setCart", response.data);
          }
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.cartError = error.response.data;
        });
    },
  },
};
</script>