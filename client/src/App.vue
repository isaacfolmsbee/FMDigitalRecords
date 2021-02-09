<template>
<div class="w-full h-full">
	<TheNavbar :JWT="JWT" :canEditDB="permissions.editDB" class="z-10" @toggleModal="isModalOpen = !isModalOpen" />
	<TheNavbarModal :JWT="JWT" :canEditDB="permissions.editDB" v-if="isModalOpen" @closeModal="isModalOpen = !isModalOpen" />
	<router-view @updateUser="updateUser($event)" :JWT="JWT" class="pt-16 xl:pt-0 xl:pl-40"></router-view>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import TheNavbar from './components/TheNavbar.vue';
import TheNavbarModal from './components/TheNavbarModal.vue';

export default Vue.extend({
	name: "App",
	components: {
		TheNavbar,
		TheNavbarModal,
	},
	data() {
		return {
			JWT: sessionStorage.getItem('authtoken'),
			permissions: {
				admin: false,
				editDB: false,
			},
			isModalOpen: false,
		}
	},
	methods: {
		updateUser(response: {
			data: {
				admin: boolean;
				editDB: boolean;
			};
			headers: {
				authtoken: string;
			};
		} | undefined ) {
			if (response === undefined) {
				this.JWT = null;
				this.permissions = {
					admin: false,
					editDB: false,
				};
			} else {
				sessionStorage.setItem('authtoken', response.headers.authtoken);
				this.JWT = response.headers.authtoken;

				sessionStorage.setItem('permissions', JSON.stringify(response.data));
				this.permissions = {
					admin: response.data.admin,
					editDB: response.data.editDB || response.data.admin,
				};
			}
		}
	}
})
</script>