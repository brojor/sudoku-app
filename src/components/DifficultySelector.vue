<template>
	<div class="wrapper">
		<button :class="{hidden: gameState.lowestDifficulty}" @click="gameState.decreaseDifficulty()">
			<i class="i-ic:round-keyboard-arrow-left"></i>
		</button>
		<div>{{ gameState.difficulty }}</div>
		<button :class="{hidden: gameState.highestDifficulty}" @click="gameState.increaseDifficulty()">
			<i class="i-ic:round-keyboard-arrow-right"></i>
		</button>
	</div>
</template>

<script setup lang="ts">

import { useGameState } from '@/stores/gameState';

const gameState = useGameState();
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 75%;
	margin: 0 auto;
	margin-top: 7vh;
	margin-bottom: 1vh;
}

button {
	background: transparent;
	border: none;
	font-weight: bold;
	color: var(--color-text);
	cursor: pointer;
	border: 1px solid transparent;
	border-radius: 50%;
	width: 10vw;
	height: 10vw;
	display: flex;
	justify-content: center;
	align-items: center;
}

i {
	display: block;
	font-size: 2rem;
}

.hidden {
	opacity: 0;
	pointer-events: none;
}

</style>