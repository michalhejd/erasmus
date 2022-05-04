<style lang="scss" scoped>
.heading-content {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2{
      font-weight: 600;
  }
}
.container{
    padding: 0 50px;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 30px;
}
</style>
<template>
  <div class="products">
    <navigation />
    <div class="heading-content">
      <h2>Musical Instruments</h2>
      <p>European students</p>
    </div>
    <div class="container" v-if="products">
        <itemBox v-for="product in products.data" :key="product._id" :product="product"/>
    </div>
  </div>
</template>
<script>
import navigation from "@/components/navigation.vue";
import itemBox from "@/components/item-list/itemBox.vue";
export default {
  name: "products",
  components: {
    navigation,
    itemBox
  },
  computed: {
      products(){
            return this.$store.state.products;
      }
  },
  mounted() {
      this.$store.dispatch("getProducts");
  },
};
</script>