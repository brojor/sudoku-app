<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import ACircle from '@/components/ACircle.vue';
import type { Cell } from '@/stores/puzzle';
import { Sudoku } from '@/sudoku'

const puzzle = usePuzzleStore();
const sudoku = new Sudoku()
const initialBoard = sudoku.createPuzzle('beginner')

puzzle.initBoard(initialBoard)

const validateSolution = () => {
  const solution = puzzle.board.map(row => row.map(cell => cell.value))
  const isCorrect = sudoku.checkSolution(solution)
  if (isCorrect) alert('You win!');
}

const handleClick = (row: number, col: number, cell: Cell) => {
  if (cell.isGiven) {
    puzzle.selectedCell = null;
    puzzle.highlightDigit(cell.value);
  } else if (puzzle.selectedDigit && puzzle.pencilMode) {
    puzzle.updatePossibleValues(`${row}${col}`, puzzle.selectedDigit);
  } else if (puzzle.selectedDigit) {
    puzzle.updateCell(`${row}${col}`, puzzle.selectedDigit);
    if(puzzle.numOfBlankCells === 0) {
      validateSolution()
    }
  } else {
    puzzle.selectCell(`${row}${col}`);
  }
}
</script>

<template>
  <div class="board">
    <template v-for="(row, rowIdx) in puzzle.board">
      <div v-for="(cell, colIdx) in row" :key="`cell-${rowIdx}-${colIdx}`" class="cell" :row="rowIdx + 1"
        :col="colIdx + 1">
        <ACircle :cell-id="`${rowIdx}${colIdx}`" :cell="cell" @click="handleClick(rowIdx, colIdx, cell)" />
      </div>
    </template>
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
  margin-top: 8vh;
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
</style>
