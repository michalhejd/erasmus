<style lang="scss" scoped>
	a {
    text-decoration: none;
    max-width: 250px;
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
	}
</style>
<template>
	<router-link
		:to="{ name: 'itemDetail', params: { id: product._id } }"
		style="text-decoration: none"
	>
		<div class="itemBox">
			<div class="img" v-if="image">
				<img :src="`${image}`" />
			</div>
			<p>{{ product.name }}</p>
			<p>{{ product.price }}&euro;</p>
			<p v-if="product.quantity == 0" style="color: red">Out of stock</p>
		</div>
	</router-link>
</template>
<script>
import axios from "axios";
	export default {
		name: "itemBox",
		props: ["product", "index"],
    data(){
      return {
        image: null
      }
    },
    mounted() {
      // convert product name with spaces to a string with dashes
      let productName = this.product.name.replace(/\s+/g, "-").toLowerCase();
      this.image = `${axios.defaults.baseURL}/image/${this.product.name}/0`;
    },
	};
</script>
