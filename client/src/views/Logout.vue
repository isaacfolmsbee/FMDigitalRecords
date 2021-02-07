<template>
<div>

</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	created() {
		sessionStorage.removeItem('authtoken');
		this.$emit('updateJWT');
		this.$router.push('/');
	}
})
</script>