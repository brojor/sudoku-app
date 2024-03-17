<script setup lang="ts">
import type { Digit } from '@/types';
import { usePuzzleState } from '@/stores/puzzleState';
import { useUiState } from '@/stores/uiState';

const puzzle = usePuzzleState();
const uiState = useUiState();
const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const;

const handleClick = (digit: Digit) => {
	if (uiState.selectedCell && uiState.pencilMode) {
		puzzle.updatePossibleValues(uiState.selectedCell, digit)
		return
	}
	uiState.highlightDigit(digit);
	if (uiState.selectedCell) {
		puzzle.updateCell(uiState.selectedCell, digit);
		return
	}
	uiState.selectDigit(digit);
}
</script>

<template>
	<div class="num-buttons">
		<div v-for="digit in digits" :key="digit" @click="handleClick(digit)" class="button"
			:class="{ selected: uiState.selectedDigit === digit }">
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
	border: 1px solid rgba(var(--foreground), 0.25);
	border-radius: 100%;
	position: relative;
}

.selected {
	background-color: rgba(var(--foreground), 0.5);
}

span {
	position: absolute;
	font-size: 3vw;
	line-height: 1.4;
	bottom: 0;
}
</style>@/stores/puzzleState
