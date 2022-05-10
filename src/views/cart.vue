<style lang="scss" scoped>
.cartProduct {
  display: flex;
  gap: 10px;
}
.shopHere {
  display: flex;
}
.container {
  display: flex;
  height: 100vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h1 {
    margin-bottom: 3%;
  }
  .cartBox {
    display: flex;
    flex-direction: column;
    width: 40%;
    height: 60%;
    background-color: #fbfbfb;
    border-radius: 10px;
    .cartProduct {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 5%;
      .line {
        width: 2px;
        height: 100%;
        background-color: #999999;
        margin-right: 10%;
        margin-left: 10%;
      }
      button {
        display: flex;
        justify-content: center;
        text-align: center;
        margin-left: 5%;
        border: none;
        background-color: #fbfbfb;
      }
    }
  }
}
</style>
<template>
  <div class="cart">
    <navigation />
    <div class="container" v-if="this.cart != []">
      <h1>Cart</h1>
      <div class="cartBox">
        <template v-for="product in this.cart" >
          <div class="cartProduct" :key="product._id">
            <p>{{ product.name }}</p>
            <div class="line"></div>
            <p>{{ product.quantity }}</p>
            <div class="line"></div>
            <p>{{ product.price }}&euro;</p>
            <button @click="removeItem(product.name)">
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </template>
        <button @click="purchase()">Purchase</button>
      </div>
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
      .get("/user/cart/data", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.cart = response.data;
          this.cartLoading = false;
          console.log(this.cart);
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
          "https://erasmustartup.eu/user/cart/remove",
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
          }
        })
        .catch((error) => {
          this.$store.dispatch("setLoading", false);
          this.cartError = error.response.data;
        });
    },
    purchase() {
      this.$store.dispatch("setLoading", true);
      axios
        .post(
          "http://localhost:3000/user/purchase",
          {},
          {
            headers: {
              Authorization: `Bearer ${this.$store.state.token}`,
            },
          }
        )
        .then((response) => {
          if (response.status === 200) {
            this.$store.dispatch("setLoading", false);
            this.$store.dispatch("cart", []);
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
