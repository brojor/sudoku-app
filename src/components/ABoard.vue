<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import ACircle from '@/components/ACircle.vue';
import type { Cell } from '@/stores/puzzle';

const puzzle = usePuzzleStore();
const initialBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

puzzle.initBoard(initialBoard)

const handleClick = (row: number, col: number, cell: Cell) => {
  if (cell.isGiven) return;
  puzzle.selectCell(`${row}${col}`);
}
</script>

<template>
  <div class="board">
    <template v-for="(row, rowIdx) in puzzle.board">
      <div v-for="(cell, colIdx) in row" :key="`cell-${rowIdx}-${colIdx}`" 
        class="cell" :row="rowIdx + 1" :col="colIdx + 1">
        <ACircle :cell-id="`${rowIdx}${colIdx}`" @click="handleClick(rowIdx, colIdx, cell)"/>
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
  width: 300px;
  height: 300px;
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
  width: 1px;
  right: -1px;
  top: 20%;
  bottom: 20%;
}

.cell:not(:nth-last-child(-n + 9))::after {
  height: 1px;
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