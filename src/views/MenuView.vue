<template>
	<div class="menu">
		<ALogo />
		<DifficultySelector />
		<button @click="$router.push('play')">Start</button>
	</div>
</template>

<script setup lang="ts">
import ALogo from '@/components/ALogo.vue';
import DifficultySelector from '@/components/DifficultySelector.vue';

</script>

<style scoped>
.menu {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: 100vh;
	margin-top: -15vh;
}


button {
	background: transparent;
	border: none;
	color: var(--color-text);
	border-radius: 20px;
	padding: 1rem;
	border: 1px solid rgba(0, 128, 0, 0.5);
	margin: 20px auto;
	display: block;
	width: 75%;
}
</style>