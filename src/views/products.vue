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
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
<template>
  <div class="products">
    <navigation />
    <div class="heading-content">
      <h2>Musical Instruments</h2>
      <p>European students</p>
    </div>
    <transition name="fade">
     <div class="container" v-if="products && productLoading != true">
    <template v-for="(product, index) in products">
 <itemBox :key="product._id" :index="index" :product="product"/>
    </template>
    </div>
      <loader v-else/>
    </transition>
   
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
      products(){
            return this.$store.state.products;
      },
      productLoading(){
            return this.$store.state.productLoading;
      }
  }
};
</script>