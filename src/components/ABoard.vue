<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import ACircle from '@/components/ACircle.vue';
import type { Candidate, SudokuCell } from '@/types'
import { ref } from 'vue';
import { useGameState } from '@/stores/gameState';

const puzzle = usePuzzleStore();
const gameState = useGameState()

puzzle.initBoard()

const clickedCell = ref<null | SudokuCell>(null) 

const handleClick = (row: number, col: number, cell: SudokuCell) => {
  if (gameState.isSolved) return
  clickedCell.value = cell;

  if (cell.isGiven) {
    if (puzzle.selectedDigit !== null) return
    puzzle.selectedCell = null;
    puzzle.highlightDigit(cell.value as Candidate);
    return;
  }
  
  if (puzzle.selectedDigit && puzzle.pencilMode) {
    puzzle.updatePossibleValues(cell, puzzle.selectedDigit);
  } else if (puzzle.selectedDigit === null) {
    puzzle.selectCell(cell);
  } else {
    puzzle.updateCell(cell, puzzle.selectedDigit);
  }
}
</script>

<template>
  <div class="wrapper">
    <div class="time">{{ gameState.formatedTime }}</div>
    <div class="board">
      <template v-for="(row, rowIdx) in puzzle.board">
        <div v-for="(cell, colIdx) in row" :key="`cell-${rowIdx}-${colIdx}`" class="cell" :row="rowIdx + 1"
          :col="colIdx + 1">
          <ACircle :cell-id="`${rowIdx}${colIdx}`" :cell="cell" @click="handleClick(rowIdx, colIdx, cell)"
            :clicked="cell === clickedCell" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 1px;
  width: 100vw;
  aspect-ratio: 1;
  padding: 0 2px;
}

.is-solved .board {
  transform: translateY(50px);
  transition: all .5s ease-in-out;
  transition-delay: .5s;
}

.is-solved .board .given,
.is-solved .board .highlighted {
  background-color: transparent;
  transition: all .5s ease-in-out;
  color: #fff;
}

.cell {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.cell::before,
.cell::after {
  content: "";
  position: absolute;
  background-color: green;
  opacity: .5;
}

.cell:not(:nth-child(9n))::before {
  width: 1.5px;
  right: -1px;
  top: 20%;
  bottom: 20%;
}

.cell:not(:nth-last-child(-n + 9))::after {
  height: 1.5px;
  bottom: -1px;
  left: 20%;
  right: 20%;
}

.cell[row="3"]::after,
.cell[row="6"]::after {
  left: -.5px;
  right: -.5px;
  opacity: 1;
}

.cell[col="3"]::before,
.cell[col="6"]::before {
  top: -.5px;
  bottom: -.5px;
  opacity: 1;
}

.wrapper {
  position: relative;
}

.time {
  position: absolute;
  top: 5vw;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 4.5vw;
  opacity: 0;
  color: #fff;
}

.is-solved .time {
  transition: all .5s ease-in-out;
  opacity: 1;
  transition-delay: 1s;
}
</style>
