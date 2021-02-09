<template>
<div>

</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: "Logout",
	created() {
		sessionStorage.removeItem('authtoken');
		this.$emit('updateUser', undefined);
		this.$router.push('/');
	}
})
</script>