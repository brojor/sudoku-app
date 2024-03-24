import { defineStore } from 'pinia'
import { Sudoku } from '@/sudoku'
import type { SudokuCell, Digit, Candidate } from '@/types'
import type { Difficulty } from '@/sudoku'
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
    boards: {
      beginner: [],
      easy: [],
      medium: [],
      hard: [],
      extreme: []
    } as Record<Difficulty, SudokuCell[][]>,
    snapshots: {
      beginner: [],
      easy: [],
      medium: [],
      hard: [],
      extreme: []
    } as Record<Difficulty, SudokuCell[][][]>
  }),

  getters: {
    numOfBlankCells: (state) =>
      state.boards[useGameState().difficulty].flat().filter((cell) => cell.value === 0).length,
    numOfRemaining: (state) => (digit: Candidate) =>
      9 -
      state.boards[useGameState().difficulty].flat().filter((cell) => cell.value === digit).length
  },

  actions: {
    initBoard() {
      const gameState = useGameState()
      const initialBoard = sudoku.createPuzzle(gameState.difficulty)
      this.boards[useGameState().difficulty] = initialBoard.map((row) =>
        row.map((value) => ({ value, isGiven: value !== 0 }))
      ) as SudokuCell[][]
      this.createSnapshot(this.boards[useGameState().difficulty])
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

      this.createSnapshot(this.boards[useGameState().difficulty])
    },

    updatePossibleValues(cell: SudokuCell, value: Digit) {
      if (value === 0) return delete cell.possibleValues

      if (cell.possibleValues) {
        this.togglePossibleValue(cell, value)
      } else {
        cell.possibleValues = [value]
      }

      this.createSnapshot(this.boards[useGameState().difficulty])
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
      const cellIndex = this.boards[useGameState().difficulty].flat().indexOf(cell)
      const row = Math.floor(cellIndex / 9)
      const col = cellIndex % 9

      const removeValue = (cell: SudokuCell) => {
        if (cell.possibleValues?.includes(value)) {
          cell.possibleValues.splice(cell.possibleValues.indexOf(value), 1)
        }
      }

      Sudoku.iterateOverRow(this.boards[useGameState().difficulty], row, removeValue)
      Sudoku.iterateOverColumn(this.boards[useGameState().difficulty], col, removeValue)
      Sudoku.iterateOverBox(this.boards[useGameState().difficulty], row, col, removeValue)
    },

    restart() {
      this.boards[useGameState().difficulty] = this.boards[useGameState().difficulty].map((row) =>
        row.map(({ value, isGiven }) => ({ value: isGiven ? value : 0, isGiven }))
      )
    },

    createSnapshot(board: SudokuCell[][]) {
      this.snapshots[useGameState().difficulty].push(cloneBoard(board))
    },

    undo() {
      const snapshots = this.snapshots[useGameState().difficulty]
 
      if (snapshots.length > 1) {
        snapshots.pop()
        this.boards[useGameState().difficulty] = cloneBoard(snapshots[snapshots.length - 1])
      }
    },

    validate() {
      const uiState = useUiState()
      uiState.reset()
      this.boards[useGameState().difficulty] = sudoku.validatePuzzle(
        this.boards[useGameState().difficulty]
      )
    },

    checkSolution() {
      const solution = this.boards[useGameState().difficulty].map((row) =>
        row.map((cell) => cell.value)
      )
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
