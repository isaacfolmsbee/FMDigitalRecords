<template>
<div class="overflow-y-hidden fixed z-0 pt-16 bg-gray-800 h-screen w-screen animate-slide-fade-in">
	<hr class="border-gray-500">
	<div class="h-2/3 flex flex-col items-center">
		<span class="mt-8" @click="$emit('closeModal')"><router-link class="router-btn" to="/">Home</router-link></span>
		<span class="mt-8" @click="$emit('closeModal')"><router-link class="router-btn" to="/courses">Courses</router-link></span>
		<span class="mt-8" @click="$emit('closeModal')"><router-link class="router-btn" to="/faculty">Faculty</router-link></span>
		<span class="mt-8" @click="$emit('closeModal')"><router-link class="router-btn" to="/yearbook">Yearbook</router-link></span>
		<span @click="$emit('closeModal')" class="mt-auto"><router-link to="/login" class="text-3xl font-bold text-green-400">Login</router-link></span>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: "TheNavbarModal"
})
</script>

<style scoped>
.router-btn {
	@apply py-1 px-2 text-3xl font-medium rounded-md text-gray-400 border-2 border-gray-500;
}

.router-link-exact-active {
	@apply text-blue-400 font-bold bg-gray-900 border-2
}
</style>