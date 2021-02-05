<template>
<div class="w-full h-full">
	<TheNavbar class="z-10" @toggleModal="isModalOpen = !isModalOpen" />
	<TheNavbarModal v-if="isModalOpen" @closeModal="isModalOpen = !isModalOpen" />
	<router-view class="pt-16 xl:pt-0 xl:pl-40 z-10"></router-view>
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
			isModalOpen: false,
		}
	}
})
</script>