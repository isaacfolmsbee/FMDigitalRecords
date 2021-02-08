<template>
<div class="w-11/12 flex flex-col items-center">
	<p class="mt-3.5 text-xl text-red-500 font-bold">{{ error }}</p>
	<span class="label">Last Name:</span>
	<input v-model="queryObject.lastName" type="text" class="input">
	<span class="label">First Name:</span>
	<input v-model="queryObject.firstName" type="text" class="input">
	<span class="label">Middle Initial:</span>
	<input v-model="queryObject.middleInitial" type="text" class="input">
	<span class="label">Suffix:</span>
	<input v-model="queryObject.suffix" type="text" class="input">
	<span class="label">Role:</span>
	<input v-model="queryObject.role" type="text" class="input">
	<span class="label">Department:</span>
	<input v-model="queryObject.department" type="text" class="input">
	<span class="label">Academic Year:</span>
	<input v-model="queryObject.academicYear" type="text" class="input">
	<button @click="postRecord()" class="w-2/3 max-w-xs mx-auto mt-6 py-0.5 text-xl xl:text-2xl font-medium rounded-md text-gray-300 border-2 border-gray-500 hover:border-gray-200">Submit Record</button>
</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { postFacultyRecord } from '../../api/faculty';

export default Vue.extend({
	name: "TheFacultyForm",
	props: {
		JWT: {
			type: String,
			default: null,
		}
	},
	data() {
		return {
			queryObject: {
				lastName: '',
				firstName: '',
				middleInitial: '',
				suffix: '',
				role: '',
				department: '',
				academicYear: '',
			},
			error: '',
		}
	},
	methods: {
		async postRecord() {
			try {
				await postFacultyRecord(this.queryObject, this.JWT);

				this.queryObject = {
					lastName: '',
					firstName: '',
					middleInitial: '',
					suffix: '',
					role: '',
					department: '',
					academicYear: '',
				}
			} catch (error) {
				this.error = error.response.data;
			}
		}
	}
})
</script>

<style scoped>
.label {
	@apply w-11/12 max-w-md xl:max-w-2xl mx-auto mt-3.5 text-gray-300 text-lg xl:text-2xl;
}

.input {
	@apply h-8 xl:h-9 w-11/12 mx-auto max-w-md xl:max-w-2xl pl-1.5 bg-gray-800 rounded-md border focus:outline-none border-gray-600 focus:border-gray-400 xl:text-lg text-gray-200 font-medium;
}
</style>