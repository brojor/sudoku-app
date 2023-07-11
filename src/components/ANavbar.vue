<template>
	<div class="wrapper">
		<i @click="$router.push('/')" class="i-ic:baseline-arrow-back"></i>
		<div v-if="!gameState.isSolved" class="timer">{{ gameState.formatedTime }}</div>
		<i class="i-ic:baseline-palette"></i>
	</div>
</template>


<script setup lang="ts">
import { useGameState } from '@/stores/gameState';
const gameState = useGameState()

	
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 1rem;
}

i {
	display: block;
	font-size: 1.5rem;
}

.timer {
	font-size: 3.5vw;
}
</style>