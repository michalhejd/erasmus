<style lang="scss" scoped>
.heading-content {
  width: 100%;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h2 {
    font-weight: 600;
  }
}
.container {
  padding: 0 50px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 50px;
  row-gap: 50px;
}
@media only screen and (max-width: 1150px) {
  .container {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media only screen and (max-width: 650px) {
  .container {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media only screen and (max-width: 450px) {
  .container {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
<template>
  <div class="products">
    <navigation />
    <div class="heading-content">
      <h2>Musical Instruments</h2>
      <p>European students</p>
    </div>
    <div class="container" v-if="products && loading != true">
      <template v-for="(product, index) in products">
        <itemBox :key="product._id" :index="index" :product="product" />
      </template>
    </div>
    <loader v-else />
  </div>
</template>
<script>
import navigation from "@/components/navigation.vue";
import itemBox from "@/components/item-list/itemBox.vue";
import loader from "@/components/loader.vue";
export default {
  name: "products",
  components: {
    navigation,
    itemBox,
    loader,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    loading() {
      return this.$store.state.loading;
    },
  },
};
</script>