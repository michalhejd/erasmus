<style lang="scss" scoped>
.itemDetail {
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  .container {
    display: flex;
    height: 100%;
    .product {
      display: flex;
      width: 60%;
    }
    .product-stats {
      display: flex;
      flex-direction: column;
      width: 40%;
      padding: 50px;
      .price,
      .description,
      .material,
      .origin {
        margin-top: 30px;
        font-size: 1.3em;
      }
      .description-data {
        margin-top: 30px;
        text-align: justify;
      }
      .button-box {
        display: flex;
        height: 100%;
        width: 100%;
        justify-content: center;
        align-items: center;
        button {
          margin-top: -100px;
          border: none;
          height: 15%;
          width: 25%;
          border-radius: 30px;
        }
      }
    }
  }
}
</style>
<template>
  <div class="itemDetail">
    <navigation />
    <div class="container" v-if="product && loading != true">
      <div class="product">
        <img
          src="https://d1aeri3ty3izns.cloudfront.net/media/23/235459/600/preview_4.jpg"
          alt=""
        />
      </div>
      <div class="product-stats">
        <h1>{{ product.name }}</h1>
        <p class="price">
          Price: <strong>${{ product.price }}</strong>
        </p>
        <p class="description">Description:</p>
        <p class="description-data">{{ product.description }}</p>
        <p class="material">
          Material: <strong>{{ product.material }}</strong>
        </p>
        <p class="origin">
          Country of origin: <strong>{{ product.origin }}</strong>
        </p>
        <p v-if="product.quantity == 0" style="color: red">Out of stock</p>
        <div class="button-box">
          <button @click="addToCart()" :disabled="product.quantity == 0">
            Add to cart
          </button>
        </div>
      </div>
    </div>
    <loader v-else />
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
      console.log(this.$store.state.token);
      console.log(this.$store.state.product.name);
      await axios.post(
        "https://erasmustartup.eu/user/cart/add",
        { itemName: this.$store.state.product.name },
        { headers: { Authorization: `Bearer ${this.$store.state.token}` } }
      );
    },
  },
  computed: {
    product() {
      return this.$store.state.product;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
  mounted() {
    this.$store.dispatch("getProduct", this.$route.params.id);
  },
};
</script>
