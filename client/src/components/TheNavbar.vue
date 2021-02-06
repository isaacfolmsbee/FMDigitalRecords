<template>
<div class="fixed bg-gray-800 w-screen xl:w-40 h-16 xl:h-screen flex xl:flex-col items-center xl:items-start justify-between xl:justify-start">
	<router-link class="focus:outline-none" to="/"><h1 class="ml-3 xl:ml-2 xl:mt-2 font-bold text-4xl"><span class="text-green-400">F</span><span class="text-blue-400">M</span></h1></router-link>
	<h1 class="mr-auto ml-1 xl:ml-2 mt-2 xl:mt-0 text-gray-500 font-medium text-xl cursor-default"><span class="hidden xl:inline-block">Digital</span> Records</h1>
	<svg @click="$emit('toggleModal')" class="xl:hidden h-10 w-10 mr-3 text-gray-500 fill-current cursor-pointer" viewBox="0 0 24 24"><path d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2z"></path></svg>

	<div class="hidden xl:flex flex-grow flex-col mt-4 mx-auto items-center">
		<router-link class="router-btn" to="/">Home</router-link>
		<router-link class="router-btn" to="/courses">Courses</router-link>
		<router-link class="router-btn" to="/faculty">Faculty</router-link>
		<router-link class="router-btn" to="/yearbook">Yearbook</router-link>
		<router-link to="/login" class="mt-auto mb-8 text-3xl font-bold text-green-400">Login</router-link>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: "TheNavbar"
})
</script>

<style scoped>
.router-btn {
	@apply mt-7 py-1 px-2 text-2xl font-medium rounded-md text-gray-400 border-2 border-gray-500 focus:border-gray-200;
}

.router-link-exact-active.router-btn {
	@apply text-blue-400 font-bold bg-gray-900 border-2
}
</style>