
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
  background-color: #ee6c4d;
  border-radius: 100px;
  border: 0;
  outline: 0;
  cursor: pointer;
  font-weight: bold;
  color: white;
  margin-bottom: 150px;
}
.flex-two{
  justify-content: center;
  display: flex;
}
article {
  padding: 0 150px;
  max-width: 750px;
  line-height: 25px;
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
    <div class="flex-two">
      <article>
        <h2>
          Welcome to EraShop!
        </h2>
        <!--<h3>
          Homemade European instruments by EU students
        </h3> -->
        <p>
          <strong>Internet eshop made by European students</strong> during the "Erasmus+ Musical Instruments Start-Up" project. You can expect nothing but <strong>musical instruments</strong> of all kinds here, and of course, every single one of them is handmade and created by one of the teams of students. The teams are made up of multiple students from <b> Chechnya, Germoney, Baguette Land and Lazy monarchy</b>, each with its own different role in the whole project.
        </p>
      </article>
    </div>
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
