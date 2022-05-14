<style lang="scss" scoped>
.cartProduct {
  display: flex;
  gap: 10px;
}
.shopHere {
  display: flex;
}
.notLogged {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
  .wrap {
    display: flex;
  }
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
    <div class="logged" v-if="this.cartError == undefined">
      <loader v-if="this.cartLoading ==true" />
      <div
        class="container"
        v-else-if="
          this.cart != [] ||
          this.cart != '' ||
          this.cart != undefined ||
          this.cart != null ||
          this.cart.length != 0 ||
          this.cart != {}
        "
      >
        <h1>Cart</h1>
        <div class="cartBox">
          <template v-for="product in this.cart">
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
    <div class="notLogged" v-else>
      <p>You need to be signed in to view your cart!</p>
      <div class="wrap">
        <p>Sign in&nbsp;</p>
        <router-link to="/signIn">here</router-link>
        <p>!</p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import navigation from "@/components/navigation.vue";
import loader from "@/components/loader.vue";
export default {
  name: "cart",
  components: {
    navigation,
    loader,
  },
  data() {
    return {
      cart: undefined,
      cartLoading: false,
      cartError: undefined,
    };
  },
  async mounted() {
    this.cartLoading = true;
    await axios
      .get("https://erasmustartup.eu/user/cart/data", {
        headers: {
          Authorization: `Bearer ${this.$store.state.token}`,
        },
      })
      .then((response) => {
        this.cartLoading = false;
        if (response.status === 200) {
          if(response.data.length === 0){
            this.cart = undefined;
        }
        }
      })
      .catch((error) => {
        this.$store.commit("setKafka", false);
          this.$store.commit("setToken", undefined);
        this.cartError = error.response.data;
        this.cartLoading = false;
      });
  },
  methods: {
    async removeItem(product) {
      this.cartLoading = true;
      await axios
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
        .then(async (response) => {
          if (response.status === 200) {
            this.$store.dispatch("setLoading", true);
            await axios
              .get("https://erasmustartup.eu/user/cart/data", {
                headers: {
                  Authorization: `Bearer ${this.$store.state.token}`,
                },
              })
              .then((response) => {
                if (response.status === 200) {
                  this.cart = undefined;
                  this.cart = response.data;
                  this.cartLoading = false;
                  console.log(this.cart);

                }
              })
              .catch((error) => {
                this.$store.commit("setKafka", false);
          this.$store.commit("setToken", undefined);
                this.cartError = error.response.data;
                this.cartLoading = false;
              });
          }
        })
        .catch((error) => {
          this.$store.commit("setKafka", false);
          this.$store.commit("setToken", undefined);
          this.cartError = error.response.data;
          this.cartLoading = false;
        });
    },
    purchase() {
      this.$store.dispatch("setLoading", true);
      axios
        .post(
          "https://erasmustartup.eu/user/purchase",
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
          this.$store.commit("setKafka", false);
          this.$store.commit("setToken", undefined);
          this.$store.dispatch("setLoading", false);
          this.cartError = error.response.data;
        });
    },
  },
};
</script>
