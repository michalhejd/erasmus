<style lang="scss" scoped>
.itemBox {
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: black;
  img {
    width: 100%;
    max-width: 150px;
    max-height: 150px;
  }
}
a {
  text-decoration: none;
}
</style>
<template>
  <router-link
    :to="{ name: 'itemDetail', params: { id: product.name } }"
    style="text-decoration: none"
  >
    <div class="itemBox">
      <div class="img">
        <img :src="`http://erasmustartup.eu/images/${product.name}/0.jpg`" />
      </div>
      <p>{{ product.name }}</p>
      <p>{{ product.price }}&euro;</p>
      <p v-if="product.quantity == 0" style="color: red">Out of stock</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "itemBox",
  props: ["product", "index"],
};
</script>
