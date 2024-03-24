<template>
	<div class="menu">
		<ALogo />
		<DifficultySelector />
		<div class="buttons">
			<button @click="startGame">New Game</button>
			<button v-if="gameState.times[gameState.difficulty]" @click="resumeGame">Resume</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import ALogo from '@/components/ALogo.vue';
import DifficultySelector from '@/components/DifficultySelector.vue';
import { useGameState } from '@/stores/gameState';
import { usePuzzleState } from '@/stores/puzzleState';
import { useRouter } from 'vue-router';

const router = useRouter()
const gameState = useGameState()
const puzzle = usePuzzleState()

const startGame = () => {
	puzzle.initBoard()
	gameState.startTimer()
	gameState.isSolved = false
	router.push('/play')
}

const resumeGame = () => {
	gameState.resumeTimer()
	router.push('/play')
}

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

.buttons {
	height: 13vh;
	width: 100%;
}

button {
	background: transparent;
	border: none;
	color: var(--color-text);
	border-radius: 20px;
	padding: 0.75rem;
	border: 1px solid rgba(var(--foreground), 0.5);
	margin: 0.5rem auto;
	display: block;
	width: 75%;
}
</style>