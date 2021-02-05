<template>
<div class="h-5/6 w-screen xl:w-2/3 xl:mx-auto flex flex-col justify-center items-center">
	<h1 class="text-3xl xl:text-4xl font-bold text-gray-200 text-center">Welcome to the FMCC Digital Records Archive</h1>
	<p class="mt-8 mx-5 xl:mx-0 text-2xl font-medium text-gray-400 text-center">Use the navigation bar to choose 
		between the different records you’d like to browse!
		This site is still under work so some things may be broken.
		<br>
		<br>
		If you’d like to edit records please sign in to gain access to that
	</p>
</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>
