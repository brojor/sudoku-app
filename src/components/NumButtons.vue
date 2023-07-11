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
			:class="{ selected: puzzle.selectedDigit === digit }">
			{{ digit ? digit : 'X' }}
			<span v-if="digit">{{ puzzle.numOfRemaining(digit) || '' }}</span>
		</div>
	</div>
</template>

<style scoped >
.num-buttons {
	display: flex;
	justify-content: center;
	gap: 2vw;
	flex-wrap: wrap;
	margin: 0 auto;
	width: calc(100% - 20vw);
	transition: all 0.5s ease-in-out;
}

.is-solved .num-buttons {
	opacity: 0;
	pointer-events: none;
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
	border: 1px solid rgba(0, 255, 0, 0.25);
	border-radius: 100%;
	position: relative;
}

.selected {
	background-color: rgba(0, 255, 0, 0.5);
}

span {
	position: absolute;
	font-size: 3vw;
	line-height: 1.4;
	bottom: 0;
}
</style>
