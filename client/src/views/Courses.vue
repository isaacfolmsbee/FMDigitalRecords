<template>
<div class="flex flex-col items-center">
	<div class="mt-5">
		<input v-model="query" @keyup.enter="queryData" type="text" placeholder="Search..."
		class="h-9 w-44 pl-1 bg-gray-800 rounded-md border focus:outline-none border-gray-600 focus:border-gray-500 placeholder-gray-300 text-gray-200 font-medium">
		<button @click="queryData" type="button" class="ml-2 py-1 px-2 rounded-lg bg-gray-700 text-lg text-gray-300 focus:text-gray-100 focus:outline-none">Search</button>
	</div>
	<div class="w-full mt-7">
		<!-- Mobile view table -->
		<div v-if="isMobile">
			<div v-for="record in tableData" :key="record._id"
				class="w-11/12 mx-auto flex flex-row flex-wrap bg-gray-800 mb-5 border border-gray-600 rounded-md text-gray-300">
				<div class="table-row"><span class="table-label">Course Code</span><span class="table-data">{{ record.courseCode }}</span></div>
				<div class="table-row"><span class="table-label">Course Name</span><span class="table-data">{{ record.courseName }}</span></div>
				<div class="table-row"><span class="table-label">Course Description</span><span class="table-data">{{ record.courseDescription }}</span></div>
				<div class="table-row"><span class="table-label">Credit Hours</span><span class="table-data">{{ record.creditHours }}</span></div>
				<div v-if="record.weeklyClassHours" class="table-row"><span class="table-label">Weekly Class Hours</span><span class="table-data">{{ record.weeklyClassHours }}</span></div>
				<div v-if="record.weeklyLabHours" class="table-row"><span class="table-label">Weekly Lab Hours</span><span class="table-data">{{ record.weeklyLabHours }}</span></div>
				<div v-if="record.labFee" class="table-row"><span class="table-label">Lab Fee</span><span class="table-data">{{ record.labFee }}</span></div>
				<div v-if="record.prerequisite" class="table-row"><span class="table-label">Prerequisite</span><span class="table-data">{{ record.prerequisite }}</span></div>
				<div class="table-row"><span class="table-label">Academic Year</span><span class="table-data">{{ record.academicYear }}</span></div>
			</div>
		</div>
		<!-- Desktop view table -->
		<div v-else>
			<table class="w-11/12 mx-auto">
				<thead class="bg-gray-600">
					<tr class="text-lg text-gray-100">
						<th class="desktop-table-header">Course Code</th>
						<th class="desktop-table-header" >Course Name</th>
						<th class="desktop-table-header" >Course Description</th>
						<th class="desktop-table-header" >Credit Hours</th>
						<th class="desktop-table-header" >Weekly Class Hours</th>
						<th class="desktop-table-header" >Weekly Lab Hours</th>
						<th class="desktop-table-header" >Lab Fee</th>
						<th class="desktop-table-header" >Prerequisite</th>
						<th class="px-1">Academic Year</th>
					</tr>
				</thead>
				<tbody class="text-gray-300 border-r border-b border-gray-600">
					<tr class="border-t border-gray-600" v-for="record in tableData" :key="record._id">
						<td class="desktop-table-data">{{ record.courseCode }}</td>
						<td class="desktop-table-data">{{ record.courseName }}</td>
						<td class="desktop-table-data">{{ record.courseDescription }}</td>
						<td class="desktop-table-data">{{ record.creditHours }}</td>
						<td class="desktop-table-data">{{ record.weeklyClassHours }}</td>
						<td class="desktop-table-data">{{ record.weeklyLabHours }}</td>
						<td class="desktop-table-data">{{ record.labFee }}</td>
						<td class="desktop-table-data">{{ record.prerequisite }}</td>
						<td class="desktop-table-data">{{ record.academicYear }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { getCourses, queryCourses } from '@/api/courses';

export default Vue.extend({
	name: 'Faculty',
	data() {
		return {
			query: '',
			isMobile: window.innerWidth <= 1023 ? true : false,
			tableData: {},
		}
	},
	async created() {
		document.title = 'Courses | FM Records';
		this.tableData = await getCourses();
	},
	methods: {
		async queryData() {
			this.tableData = await queryCourses(this.query);
		},
	},
	mounted() {
		window.onresize = () => {
			this.isMobile = window.innerWidth <= 1023 ? true : false;
		};
	},
});
</script>

<style scoped>
.table-row {
	@apply py-0.5 w-full flex border-b border-gray-600;
}

.table-row:last-child {
	@apply border-none;
}

.table-label {
	@apply w-36 pl-1.5 border-r border-gray-600;
}

.table-data {
	@apply mx-auto text-center w-48 sm:w-96;
}

.desktop-table-header {
	@apply px-1 border-r border-gray-700;
}

.desktop-table-data {
	@apply py-0.5 pl-1 border-l border-gray-600;
}
</style>