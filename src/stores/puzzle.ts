import { ref } from 'vue'
import { defineStore } from 'pinia'

export const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const
export type Digit = typeof digits[number]

export interface Cell {
  value: Digit
  isGiven: boolean
  possibleValues?: Omit<Digit, 0>[]
}

export const usePuzzleStore = defineStore('puzzle', () => {
  const board = ref<Cell[][]>([])
  const selectedCell = ref<string | null>(null)
  const selectedDigit = ref<Digit>(0)
  const highlightedDigit = ref<Digit>(0)

  const initBoard = (puzzle: number[][]) => {
    board.value = puzzle.map(row => row.map(value => ({ value, isGiven: value !== 0 }))) as Cell[][]
  }

  const selectCell = (cellId: string) => {
    selectedCell.value = selectedCell.value === cellId ? null : cellId
  }

  const selectDigit = (digit: Digit) => {
    selectedDigit.value = selectedDigit.value === digit ? 0 : digit
  }

  const highlightDigit = (digit: Digit) => {
    highlightedDigit.value = highlightedDigit.value === digit ? 0 : digit
  }

  const updateCell = (cellId: string, value: Digit) => {
    const [row, col] = cellId.split('').map(Number)
    const cell = board.value[row][col]
    cell.value = cell.value === value ? 0 : value
  }

  return { board, initBoard, selectedCell, selectCell, selectedDigit, selectDigit, updateCell, highlightedDigit, highlightDigit}
})
