import { defineStore } from 'pinia'
import { Sudoku } from '@/sudoku'
import type { SudokuCell, Digit, Candidate } from '@/types'

function cloneBoard(board: SudokuCell[][]) {
  return board.map((row) => row.map((cell) => ({ ...cell, possibleValues: cell.possibleValues?.slice() })))
}

export const usePuzzleStore = defineStore('puzzle', {
  state: () => ({
    board: [] as SudokuCell[][],
    selectedCell: null as string | null,
    selectedDigit: 0 as Digit,
    highlightedDigit: null as Candidate | null,
    pencilMode: false,
    snapshots: [] as SudokuCell[][][]
  }),

  getters: {
    numOfBlankCells: (state) => state.board.flat().filter((cell) => !cell.value).length,
    numOfRemaining: (state) => (digit: Candidate) =>
      9 - state.board.flat().filter((cell) => cell.value === digit).length
  },

  actions: {
    initBoard(puzzle: number[][]) {
      this.board = puzzle.map((row) =>
        row.map((value) => ({ value, isGiven: value !== 0 }))
      ) as SudokuCell[][]
      this.createSnapshot(this.board)
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
      this.createSnapshot(this.board)
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
      this.createSnapshot(this.board)
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
    },

    restart() {
      this.board = this.board.map((row) =>
        row.map(({ value, isGiven }) => ({ value: isGiven ? value : 0, isGiven }))
      )
    },

    createSnapshot(board: SudokuCell[][]) {
      this.snapshots.push(cloneBoard(board))
    },

    undo() {
      if (this.snapshots.length > 1) {
        this.snapshots.pop()
        this.board = cloneBoard(this.snapshots[this.snapshots.length - 1])
      }
    }
  }
})
