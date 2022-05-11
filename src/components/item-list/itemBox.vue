<style lang="scss" scoped>
.itemBox {
  max-width: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  color: black;
  border: 1px solid rgb(122, 122, 122);
  border-radius: 5px;
  padding: 10px;
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
        <img :src="`https://erasmustartup.eu/images/${product.name}/0.jpg`" />
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
