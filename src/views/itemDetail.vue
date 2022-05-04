<style lang="scss" scoped>
</style>
<template>
  <div class="itemDetail">
    <navigation />
    <div class="container" v-if="productLoading != true && product">
    <p>{{product.item.name}}</p>
    <p>{{product.item.quantity}}</p>
    <p>{{product.item.price}}&euro;</p>
    </div>
  </div>
</template>
<script>
import navigation from "@/components/navigation.vue";
export default {
  name: "itemDetail",
  components: {
    navigation,
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