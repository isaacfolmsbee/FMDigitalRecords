<template>
<div class="flex flex-col justify-center items-center">
	<div class="mt-5 xl:mt-20">
		<span class="text-gray-200 text-lg xl:text-2xl">Select database:</span>
		<br>
		<button @click="currentForm = 'faculty'" class="btn">Faculty</button>
		<!-- <button @click="currentForm = 'courses'" class="btn">Courses</button> -->
	</div>
	<TheFacultyForm v-if="currentForm === 'faculty'" />
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import TheFacultyForm from '../components/forms/TheFacultyForm.vue';

export default Vue.extend({
	name: "AddRecord",
	components: {
		TheFacultyForm,
	},
	data() {
		return {
			currentForm: '',
		}
	},
	created() {
		document.title = 'Add Record | FM Records';
	}
})
</script>

<style scoped>
.btn {
	@apply mr-3 py-1 xl:py-1.5 px-2 xl:px-3 rounded-lg bg-gray-700 text-lg xl:text-2xl text-gray-300 focus:text-gray-100 focus:outline-none;
}
</style>