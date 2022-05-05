
<style lang="scss" scoped>
.home {
  width: 100%;
  display: flex;
  gap: 50px;
  flex-direction: column;
}
.wrap {
  display: flex;
  justify-content: center;
}
button {
  width: 150px;
  height: 50px;
  background-color: #f5f5f5;
  border-radius: 100px;
  border: 0;
  outline: 0;
  cursor: pointer;
}
article {
  padding: 0 150px;
  h2 {
    font-weight: 600;
  }
  text-align: center;
}
.carousel{
  padding: 0 300px;
}
</style>
<template>
  <div class="home">
    <navigation />
    <div class="wrap">
      <router-link to="/products">
        <button>More</button>
      </router-link>
    </div>
    <article>
      <h2>Homemade European instruments by EU students</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde,
        perferendis et enim aut alias saepe? Ullam, eum? Libero voluptates
        facilis officia minus voluptatem ad maxime alias eligendi expedita,
        repudiandae nisi!
      </p>
    </article>
  </div>
</template>

<script>
// @ is an alias to /src
import itemBox from "@/components/item-list/itemBox.vue";
import navigation from "@/components/navigation.vue";
import carousel from "vue-owl-carousel";
export default {
  name: "home",
  components: {
    navigation,
    carousel,
    itemBox,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
};
</script>
