<script setup lang="ts">
import type { Digit } from '@/types';
import { usePuzzleStore } from '@/stores/puzzle';

const puzzle = usePuzzleStore();
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;

const handleClick = (digit: Digit) => {
	if (puzzle.selectedCell && puzzle.pencilMode) {
		puzzle.updatePossibleValues(puzzle.selectedCell, digit)
		return
	}
	puzzle.highlightDigit(digit);
	if (puzzle.selectedCell) {
		puzzle.updateCell(puzzle.selectedCell, digit);
		return
	}
	puzzle.selectDigit(digit);
}
</script>

<template>
	<div class="num-buttons">
		<div v-for="digit in digits" :key="digit" @click="handleClick(digit)" class="button"
			:class="{ selected: puzzle.selectedDigit && puzzle.selectedDigit === digit }">
			{{ digit ? digit : 'X' }}
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

.selected {
	background-color: rgba(0, 255, 0, 0.5);
}
</style>
