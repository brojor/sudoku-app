<template>
	<div class="wrapper">
		<i @click="goBack" class="i-ic:baseline-arrow-back"></i>
		<div v-if="!gameState.isSolved" class="timer">{{ gameState.formatedTime }}</div>
		<div class="placeholder"></div>
		<ColorPicker />
	</div>
</template>


<script setup lang="ts">
import { useGameState } from '@/stores/gameState';
import ColorPicker from './ColorPicker.vue'
import { useRouter } from 'vue-router';

const gameState = useGameState()
const router = useRouter()

const goBack = () => {
	gameState.pauseTimer()
	router.push('/')
}
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 2.5vw;
	position: relative;
}

i {
	display: block;
	font-size: 6vw;
}

.timer {
	font-size: 3.5vw;
}

.placeholder {
	width: 6vw;
}
</style>