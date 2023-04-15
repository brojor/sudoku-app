<script setup lang="ts">
import { digits, usePuzzleStore } from '@/stores/puzzle';
import type { Digit } from '@/stores/puzzle';

const puzzle = usePuzzleStore();

const handleClick = (num: Digit) => {
	if(puzzle.selectedCell) {
		puzzle.updateCell(puzzle.selectedCell, num);
	}
}

</script>

<template>
	<div class="num-buttons">
		<div class="button" v-for="num in digits" :key="num" @click="handleClick(num)">
			{{ num ? num : 'X' }}
		</div>
	</div>
</template>

<style scoped >
.num-buttons {
	display: flex;
	justify-content: center;
	gap: 2vw;
	flex-wrap: wrap;
	margin: 46px auto 0;
	width: calc(100% - 20vw);
}

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	cursor: pointer;
	font-size: 7vw;
	font-weight: 700;
	width: calc((100% - 4 * 2vw) / 5);
	aspect-ratio: 1;
	border: 0.5px solid rgba(0, 255, 0, 0.5);
	border-radius: 100%;
}
</style>
