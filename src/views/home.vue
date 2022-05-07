
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
    text-align: center;
  }
  h2 {
    font-weight: 600;
  }
  h3 {
    padding-top: 2.5%;
    font-weight: 500;
  }
  text-align: center;
}
.carousel{
  padding: 0 300px;
}
.flex{
  display: flex;
  justify-content: center;
  align-items: baseline;
  .center-image{
    width: 100vh;
    height: 50vh;
    background-color: black;
    margin-left: 5vh;
    margin-right: 5vh;
  }
  .side-image{
    width: 75vh;
    height: 40vh;
    background-color: black;
  }
}
</style>
<template>
  <div class="home">
    <navigation />
    <div class="flex">
      <div class="side-image">

      </div>
      <div class="center-image">

      </div>
      <div class="side-image">

      </div>
    </div>
    <article>
      <h2>
        Welcome to EraShop!
      </h2>
      <!--<h3>
        Homemade European instruments by EU students
      </h3> -->
      <p>
        Internet eshop made by European students during the "Erasmus+ Musical Instruments Start-Up" project. You can expect nothing but musical instruments of all kinds here, and of course, every single one of them is handmade and created by one of the teams of students.
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
