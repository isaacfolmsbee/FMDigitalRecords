<template>
<div class="w-full h-full">
	<TheNavbar :JWT="JWT" class="z-10" @toggleModal="isModalOpen = !isModalOpen" />
	<TheNavbarModal :JWT="JWT" v-if="isModalOpen" @closeModal="isModalOpen = !isModalOpen" />
	<router-view @updateJWT="updateJWT" :JWT="JWT" class="pt-16 xl:pt-0 xl:pl-40"></router-view>
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'
import TheNavbarModal from '@/components/TheNavbarModal.vue'

export default Vue.extend({
	name: "App",
	components: {
		TheNavbar,
		TheNavbarModal,
	},
	data() {
		return {
			JWT: sessionStorage.getItem('authtoken'),
			isModalOpen: false,
		}
	},
	methods: {
		updateJWT() {
			this.JWT = sessionStorage.getItem('authtoken');
		}
	}
})
</script>