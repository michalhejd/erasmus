
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
  p{
    padding-top: 5%;
    text-align: justify;
  }
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
    <article>
      <h2>Homemade European instruments by EU students</h2>
      <p>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perferendis error voluptatem vitae! Maxime pariatur architecto saepe obcaecati dolore molestias voluptate porro voluptas error est, nesciunt sapiente aut in corrupti officiis? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis mollitia sunt nihil. Libero, ullam at pariatur illum quia cumque quis eligendi veniam molestiae eveniet! Dolor eum modi sed ratione ipsa? Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus ipsa porro incidunt quisquam repellat, repellendus quam, architecto provident similique assumenda, laudantium ipsum libero quibusdam omnis adipisci obcaecati nostrum nisi aut.
      </p>
    </article>
    <div class="wrap">
      <router-link to="/products">
        <button>More</button>
      </router-link>
    </div>
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
