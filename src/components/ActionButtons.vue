<script setup lang="ts">
import { usePuzzleState } from '@/stores/puzzleState';
import { useUiState } from '@/stores/uiState';

const puzzle = usePuzzleState();
const uiState = useUiState();

const actionButtons = [
	{ icon: 'refresh', action: 'restart' },
	{ icon: 'check', action: 'validate' },
	{ icon: 'edit', action: 'togglePencil' },
	{ icon: 'undo', action: 'undo' },
]

const handleClick = (action: string) => {
	switch (action) {
		case 'togglePencil':
			uiState.togglePencilMode();
			break;
		case 'restart':
			puzzle.restart();
			break;
		case 'undo':
			puzzle.undo();
			break;
		case 'validate':
			puzzle.validate();
			break;
	}
}
</script>

<template>
	<div class="action-buttons">
		<div v-for="button in actionButtons" :key="button.action" @click="handleClick(button.action)"
			class="button" :class="{active: button.action === 'togglePencil' && uiState.pencilMode}">
			<div :class="`i-ic:baseline-${button.icon}`"></div>
		</div>
	</div>
</template>

<style scoped >
.action-buttons {
	display: flex;
	margin: 10px auto;
	justify-content: center;
	gap: 5px;
	width: calc(100% - 14vw);
}

.is-solved .action-buttons {
	opacity: 0;
	pointer-events: none;
}

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	cursor: pointer;
	flex-grow: 1;
	font-size: 5.5vw;
	padding: 3px;
	border-radius: 20px;
}

.active {
	background-color: rgba(var(--foreground), 0.5);
}

</style>@/stores/puzzleState
