<template>
<div>
	<TheNavbar />
</div>
</template>

<script lang="ts">
import Vue from 'vue'
import TheNavbar from '@/components/TheNavbar.vue'

export default Vue.extend({
	name: "App",
	components: {
		TheNavbar,
	}
})
</script>