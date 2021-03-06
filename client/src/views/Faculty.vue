<template>
<div class="flex flex-col items-center">
	<div class="mt-5">
		<input v-model="query" @keyup.enter="queryData" type="text" placeholder="Search..."
		class="h-9 w-44 pl-1 bg-gray-800 rounded-md border focus:outline-none border-gray-600 focus:border-gray-500 placeholder-gray-300 text-gray-200 font-medium">
		<button @click="queryData" type="button" class="ml-2 py-1 px-2 rounded-lg bg-gray-700 text-lg text-gray-300 focus:text-gray-100 hover:text-gray-100 focus:outline-none">Search</button>
	</div>
	<div class="w-full mt-7">
		<!-- Mobile view table -->
		<div v-if="isMobile">
			<div v-for="record in tableData" :key="record._id"
				class="w-11/12 mx-auto flex flex-row flex-wrap bg-gray-800 mb-5 border border-gray-600 rounded-md text-gray-300">
				<div class="table-row"><span class="table-label">Last Name</span><span class="table-data">{{ record.lastName }}</span></div>
				<div class="table-row"><span class="table-label">First Name</span><span class="table-data">{{ record.firstName }}</span></div>
				<div v-if="record.middleInitial" class="table-row"><span class="table-label">Middle Initial</span><span class="table-data">{{ record.middleInitial }}</span></div>
				<div v-if="record.suffix" class="table-row"><span class="table-label">Suffix</span><span class="table-data">{{ record.suffix }}</span></div>
				<div class="table-row"><span class="table-label">Role</span><span class="table-data">{{ record.role }}</span></div>
				<div v-if="record.department" class="table-row"><span class="table-label">Department</span><span class="table-data">{{ record.department }}</span></div>
				<div class="table-row"><span class="table-label">Academic Year</span><span class="table-data">{{ record.academicYear }}</span></div>
			</div>
		</div>
		<!-- Desktop view table -->
		<div v-else>
			<table class="w-11/12 mx-auto">
				<thead class="bg-gray-600">
					<tr class="text-lg text-gray-100 whitespace-nowrap">
						<th class="desktop-table-header">Last Name</th>
						<th class="desktop-table-header">First Name</th>
						<th class="desktop-table-header">Middle Initial</th>
						<th class="desktop-table-header">Suffix</th>
						<th class="desktop-table-header">Role</th>
						<th class="desktop-table-header">Department</th>
						<th class="px-1">Academic Year</th>
					</tr>
				</thead>
				<tbody class="text-gray-300 border-r border-b border-gray-600">
					<tr class="border-t border-gray-600" v-for="record in tableData" :key="record._id">
						<td class="desktop-table-data">{{ record.lastName }}</td>
						<td class="desktop-table-data">{{ record.firstName }}</td>
						<td class="desktop-table-data">{{ record.middleInitial }}</td>
						<td class="desktop-table-data">{{ record.suffix }}</td>
						<td class="desktop-table-data">{{ record.role }}</td>
						<td class="desktop-table-data">{{ record.department }}</td>
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
import { getFaculty, queryFaculty } from '@/api/faculty';

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
		document.title = 'Faculty | FM Records';
		this.tableData = await getFaculty();
	},
	methods: {
		async queryData() {
			this.tableData = await queryFaculty(this.query);
		},
	},
	mounted() {
		window.onresize  = () => {
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