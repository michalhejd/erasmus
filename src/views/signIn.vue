<style lang="scss" scoped>
	@import url("https://fonts.googleapis.com/css2?family=Raleway:wght@400;500&display=swap");
	.signin {
		width: 100%;
		height: 100vh;
		.container {
			height: 92vh;
			display: flex;
			justify-content: center;
			align-items: center;
			font-family: "Raleway", sans;

			form {
				border-radius: 40px;
				display: flex;
				flex-direction: column;
        align-items: center;
				gap: 20px;
				background-color: #fbfbfb;
				padding: 50px;
				margin: 0 10px;
				.input {
					background-color: #f1f1f1;
					border-style: none;
					padding: 10px;
					border: 1px solid rgba(0, 0, 0, 0.1);
					border-radius: 0.5vh;
					width: 250px;
				}
				.main {
          display: flex;
          flex-direction: column;
          gap: 5px;
				}

				h1 {
					text-align: center;
					margin-bottom: 1.5vh;
				}
				
				.flex-one {
					display: flex;
					justify-content: center;
					.submit {
						background-color: rgba(232, 232, 232, 0.56);
						border-style: none;
						border: none;
						padding: 1.5vh 2vh;
						border-radius: 1.5vh;
						cursor: pointer;
					}
				}
			}
		}
	}
	.signedIn {
		height: 92vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 10px;
		.account {
			display: flex;
		}
	}
	@media only screen and (max-width: 450px) {
		.signin .container form {
			padding: 25px;
		}
	}
	@media only screen and (max-width: 350px) {
		.signin .container form {
			border-radius: 20px;
		}
		.signin .container form .input {
			width: 200px;
		}
	}
</style>
<template>
	<div class="signin">
		<navigation />
		<loader v-if="this.$store.state.loader == true" />
		<div class="container" v-else-if="kafka != true">
			<form v-on:submit.prevent="login">
				<div class="main">
					<h1>Sign in</h1>
					<p>Username/mail</p>
					<label for="username" class="username"></label>
					<input type="text" id="username" class="input" v-model="username" />
					<p>Password</p>
					<label for="password"></label>
					<input type="password" class="input" v-model="password" />
					<p :style="{ color: color }">{{ message }}</p>
					<div class="flex-one">
						<input class="submit" type="submit" value="Login" />
					</div>
				</div>
				<p>If you don't have an account, register <a href="">here</a></p>
			</form>
		</div>
		<div class="signedIn" v-else>
			<p>You're already signed in!</p>
			<div class="account">
				<p>Check out your&nbsp;</p>
				<router-link to="/account">account</router-link>
				<p>!</p>
			</div>
		</div>
	</div>
</template>
<script>
	import navigation from "@/components/navigation.vue";
	import axios from "axios";
	import loader from "@/components/loader.vue";
	export default {
		name: "signin",
		components: {
			navigation,
			loader,
		},
		data() {
			return {
				username: "",
				password: "",
				message: "",
				color: "",
			};
		},
		computed: {
			kafka() {
				return this.$store.state.kafka;
			},
		},
		methods: {
			async login() {
				this.$store.dispatch("setLoading", true);
				await axios
					.put("/login", {
						username: this.username,
						password: this.password,
					})
					.then((response) => {
						if (response.status === 200) {
							this.$store.commit("setToken", response.data)
							this.$store.commit("setKafka", true);
							this.$router.push("/account");
						}
					})
					.catch((error) => {
						this.$store.dispatch("setLoading", false);
						this.color = "red";
						console.log(error);
						this.message = error.response.data;
						this.$store.commit("setKafka", false);
						this.$store.commit("setToken", undefined);
					});
			},
		},
	};
</script>
