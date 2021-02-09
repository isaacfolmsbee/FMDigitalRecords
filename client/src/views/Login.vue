<template>
<div class="fixed w-full h-4/5 xl:-ml-16 flex flex-col justify-center items-center">
	<p class="text-xl text-red-500 font-bold">{{ error }}</p>
	<input class="input" type="text" v-model="username" placeholder="Username...">
	<input class="input" type="password" v-model="password" placeholder="Password...">
	<button @click="login()" class="mt-5 w-5/6 max-w-xs py-1 px-2 rounded-lg bg-gray-700 text-lg text-gray-400 focus:text-gray-200 focus:outline-none hover:text-gray-200">Login</button>
	<div class="flex items-center mt-3 text-sm text-gray-400 cursor-default">
		<p>Need an account?</p>
		<router-link class="ml-1.5 text-blue-400 text-base underline" to="/register">Register</router-link>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { login } from '../api/user';

export default Vue.extend({
	name: 'Login',
	data() {
		return {
			username: '',
			password: '',
			error: '',
		}
	},
	methods: {
		async login() {
			try {
				const response = await login(this.username, this.password);
				
				this.$emit('updateUser', response);
				this.$router.push('/');
			} catch (error) {
				this.error = 'Invalid login information';
			}
		}
	},
	created() {
		document.title = 'Login | FM Records';
	}
});
</script>

<style scoped>
.input {
	@apply mt-5 pl-1.5 h-10 w-5/6 max-w-xs bg-gray-800 rounded-md border focus:outline-none border-gray-600 focus:border-gray-500 placeholder-gray-400 text-gray-200 font-medium
}
</style>