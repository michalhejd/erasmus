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
  }
}
a{
    text-decoration: none;
}
</style>
<template>
  <router-link :to="{name: 'itemDetail', params: {id: product.name}}" style="text-decoration: none">
    <div class="itemBox">
      <img
        src="https://img.kytary.com/eshop_cz/velky_v2/na/635418107771000000/b2283488/64214570/yamaha-ez-220.jpg"
        alt="no img"
      />
      <p>{{ product.name }}</p>
      <p>price: {{ product.price }}&euro;</p>
      <p>{{index}}</p>
    </div>
  </router-link>
</template>
<script>
export default {
  name: "itemBox",
  props: ["product", "index"],
};
</script>