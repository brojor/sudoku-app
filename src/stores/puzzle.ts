import { ref } from 'vue'
import { defineStore } from 'pinia'

type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

export interface Cell {
  value: Digit
  isGiven: boolean
  possibleValues?: Omit<Digit, 0>[]
}


export const usePuzzleStore = defineStore('puzzle', () => {
  const board = ref<Cell[][]>([])

  const initBoard = (puzzle: number[][]) => {
    board.value = puzzle.map(row => row.map(value => ({ value, isGiven: value !== 0 }))) as Cell[][]
  }

  return { board, initBoard }
})
