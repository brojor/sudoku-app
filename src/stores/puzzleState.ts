import { defineStore } from 'pinia'
import { Sudoku } from '@/sudoku'
import type { SudokuCell, Digit, Candidate } from '@/types'
import { useGameState } from './gameState'
import { useUiState } from './uiState'

function cloneBoard(board: SudokuCell[][]) {
  return board.map((row) =>
    row.map((cell) => ({ ...cell, possibleValues: cell.possibleValues?.slice() }))
  )
}

const sudoku = new Sudoku()

export const usePuzzleState = defineStore('puzzle', {
  state: () => ({
    board: [] as SudokuCell[][],
    snapshots: [] as SudokuCell[][][]
  }),

  getters: {
    numOfBlankCells: (state) => state.board.flat().filter((cell) => !cell.value).length,
    numOfRemaining: (state) => (digit: Candidate) =>
      9 - state.board.flat().filter((cell) => cell.value === digit).length
  },

  actions: {
    initBoard() {
      const gameState = useGameState()
      const initialBoard = sudoku.createPuzzle(gameState.difficulty)
      this.board = initialBoard.map((row) =>
        row.map((value) => ({ value, isGiven: value !== 0 }))
      ) as SudokuCell[][]
      this.createSnapshot(this.board)
    },

    updateCell(cell: SudokuCell, value: Digit) {
      cell.isInvalid = false
      cell.value = cell.value === value ? 0 : value

      if (cell.value) {
        this.removePossibleValues(cell, cell.value)
        delete cell.possibleValues
      }

      if (this.numOfBlankCells === 0) {
        this.checkSolution()
      }

      this.createSnapshot(this.board)
    },

    updatePossibleValues(cell: SudokuCell, value: Digit) {
      if (value === 0) return delete cell.possibleValues

      if (cell.possibleValues) {
        this.togglePossibleValue(cell, value)
      } else {
        cell.possibleValues = [value]
      }

      this.createSnapshot(this.board)
    },

    togglePossibleValue(cell: SudokuCell, value: Candidate) {
      cell.value = 0
      if (cell.possibleValues?.includes(value)) {
        cell.possibleValues.splice(cell.possibleValues.indexOf(value), 1)
      } else if (cell.possibleValues!.length < 8) {
        cell.possibleValues = [...cell.possibleValues!, value].sort()
      }
    },

    removePossibleValues(cell: SudokuCell, value: Candidate) {
      const cellIndex = this.board.flat().indexOf(cell)
      const row = Math.floor(cellIndex / 9)
      const col = cellIndex % 9

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
    },

    validate() {
      const uiState = useUiState()
      uiState.reset()
      this.board = sudoku.validatePuzzle(this.board)
    },

    checkSolution() {
      const solution = this.board.map((row) => row.map((cell) => cell.value))
      const isCorrect = sudoku.checkSolution(solution)
      if (isCorrect) {
        const uiState = useUiState()
        uiState.reset()
        // reset snapshots here or on initBoard
        const gameState = useGameState()
        gameState.stopTimer()
        gameState.isSolved = true
      }
    }
  }
})
