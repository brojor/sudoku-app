import { defineStore } from 'pinia'
import { nextTick } from 'vue'

export const digits = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0] as const
export type Digit = (typeof digits)[number]

export interface Cell {
  value: Digit
  isGiven: boolean
  possibleValues?: Omit<Digit, 0>[]
}

export const usePuzzleStore = defineStore('puzzle', {
  state: () => ({
    board: [] as Cell[][],
    selectedCell: null as string | null,
    selectedDigit: 0 as Digit,
    highlightedDigit: 0 as Digit,
    pencilMode: false,
    numOfBlankCells: 0
  }),
  // getters: {
  //   doubleCount: (state) => state.count * 2,
  // },
  actions: {
    initBoard(puzzle: number[][]) {
      this.board = puzzle.map((row) =>
        row.map((value) => {
          const isGiven = value !== 0
          if (!isGiven) this.numOfBlankCells++
          return { value, isGiven }
        })
      ) as Cell[][]
    },

    selectCell(cellId: string) {
      this.selectedCell = this.selectedCell === cellId ? null : cellId
    },

    selectDigit(digit: Digit) {
      this.selectedDigit = this.selectedDigit === digit ? 0 : digit
    },

    highlightDigit(digit: Digit) {
      this.highlightedDigit = this.highlightedDigit === digit ? 0 : digit
    },

    updateCell(cellId: string, value: Digit) {
      const [row, col] = cellId.split('').map(Number)
      const cell = this.board[row][col]

      if (cell.value) {
        this.numOfBlankCells += 1
      }

      if (cell.value === value) {
        cell.value = 0
        return
      }

      cell.value = value
      nextTick(() => {
        this.numOfBlankCells--
      })
    },

    togglePencilMode() {
      this.pencilMode = !this.pencilMode
    },

    updatePossibleValues(cellId: string, value: Digit) {
      const [row, col] = cellId.split('').map(Number)
      const cell = this.board[row][col]
      if (cell.possibleValues) {
        cell.possibleValues.includes(value)
          ? cell.possibleValues.splice(cell.possibleValues.indexOf(value), 1)
          : this.addPossibleValue(cell, value)
      } else {
        cell.possibleValues = [value]
      }
    },

    addPossibleValue(cell: Cell, value: Digit) {
      if (cell.possibleValues!.length < 8) {
        cell.possibleValues = [...cell.possibleValues!, value].sort()
      }
    }
  }
})
