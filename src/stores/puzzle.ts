import { defineStore } from 'pinia'
import { Sudoku } from '@/sudoku'
import type { SudokuCell, Digit, Candidate } from '@/types'

export const usePuzzleStore = defineStore('puzzle', {
  state: () => ({
    board: [] as SudokuCell[][],
    selectedCell: null as string | null,
    selectedDigit: 0 as Digit,
    highlightedDigit: null as Candidate | null,
    pencilMode: false
  }),

  getters: {
    numOfBlankCells: (state) => state.board.flat().filter((cell) => !cell.value).length
  },

  actions: {
    initBoard(puzzle: number[][]) {
      this.board = puzzle.map((row) =>
        row.map((value) => ({ value, isGiven: value !== 0 }))
      ) as SudokuCell[][]
    },

    selectCell(cellId: string) {
      this.selectedCell = this.selectedCell === cellId ? null : cellId
    },

    selectDigit(digit: Digit) {
      this.selectedDigit = this.selectedDigit === digit ? 0 : digit
    },

    highlightDigit(digit: Digit) {
      this.highlightedDigit = this.highlightedDigit === digit || !digit ? null : digit
    },

    updateCell(cellId: string, value: Digit) {
      const [row, col] = cellId.split('').map(Number)
      const cell = this.board[row][col]

      cell.value = cell.value === value ? 0 : value

      if (cell.value) {
        this.removePossibleValues(cellId, cell.value)
        delete cell.possibleValues
      }
    },

    togglePencilMode() {
      this.pencilMode = !this.pencilMode
    },

    updatePossibleValues(cellId: string, value: Digit) {
      const [row, col] = cellId.split('').map(Number)
      const cell = this.board[row][col]

      if (value === 0) return delete cell.possibleValues

      if (cell.possibleValues) {
        cell.possibleValues.includes(value)
          ? cell.possibleValues.splice(cell.possibleValues.indexOf(value), 1)
          : this.addPossibleValue(cell, value)
      } else {
        cell.possibleValues = [value]
      }
    },

    addPossibleValue(cell: SudokuCell, value: Candidate) {
      if (cell.possibleValues!.length < 8) {
        cell.possibleValues = [...cell.possibleValues!, value].sort()
      }
    },

    removePossibleValues(cellId: string, value: Candidate) {
      const [row, col] = cellId.split('').map(Number)

      const removeValue = (cell: SudokuCell) => {
        if (cell.possibleValues?.includes(value)) {
          cell.possibleValues.splice(cell.possibleValues.indexOf(value), 1)
        }
      }

      Sudoku.iterateOverRow(this.board, row, removeValue)
      Sudoku.iterateOverColumn(this.board, col, removeValue)
      Sudoku.iterateOverBox(this.board, row, col, removeValue)
    }
  }
})
