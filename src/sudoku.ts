import type { Digit, SudokuCell } from './types'
type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'extreme'
interface IsValidParams {
  board?: Digit[][]
  row: number
  col: number
  value: Digit
}

function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

export class Sudoku {
  private difficultyMap = {
    beginner: 24,
    easy: 37,
    medium: 46,
    hard: 52,
    extreme: 56
  }
  solution: Digit[][] = []
  puzzle: Digit[][] = []
  numOfSolutions = 0

  constructor() {
    this.createBoard()
    this.createSolution()
    // this.createPuzzle('extreme')
  }

  createBoard() {
    this.solution = Array.from({ length: 9 }, () => Array(9).fill(0))
  }

  static iterateOverRow<T>(board: T[][], row: number, callback: (value: T) => void) {
    for (let i = 0; i < 9; i++) {
      callback(board[row][i])
    }
  }

  static iterateOverColumn<T>(board: T[][], col: number, callback: (value: T) => void) {
    for (let i = 0; i < 9; i++) {
      callback(board[i][col])
    }
  }

  static iterateOverBox<T>(board: T[][], row: number, col: number, callback: (value: T) => void) {
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        callback(board[startRow + i][startCol + j])
      }
    }
  }

  isValid({ board = this.solution, row, col, value }: IsValidParams) {
    let valid = true

    const checkValue = (v: Digit) => v === value && (valid = false)

    Sudoku.iterateOverRow(board, row, checkValue)
    if (!valid) return valid
    Sudoku.iterateOverColumn(board, col, checkValue)
    if (!valid) return valid
    Sudoku.iterateOverBox(board, row, col, checkValue)
    return valid
  }

  createSolution(): boolean {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (this.solution[row][col] === 0) {
          const possibleValues = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]) as Digit[]
          for (const value of possibleValues) {
            if (this.isValid({ row, col, value })) {
              this.solution[row][col] = value
              if (this.createSolution()) {
                return true
              }
              this.solution[row][col] = 0
            }
          }
          return false
        }
      }
    }
    return true
  }

  createPuzzle(difficulty: Difficulty): number[][] {
    let numberOfCellsToRemove = this.difficultyMap[difficulty]

    this.puzzle = this.solution.map((row) => [...row])
    const shuffledCells = this.getShuffledCells()

    while (numberOfCellsToRemove > 0) {
      if (shuffledCells.length === 0) {
        this.createBoard()
        this.createSolution()
        return this.createPuzzle(difficulty)
      }

      const { x, y } = shuffledCells.pop()!
      if (this.puzzle[x][y] !== 0) {
        const value = this.puzzle[x][y]
        this.puzzle[x][y] = 0
        if (this.hasUniqueSolution(this.puzzle)) {
          numberOfCellsToRemove--
        } else {
          this.puzzle[x][y] = value
        }
      }
    }
    return this.puzzle
  }

  private getShuffledCells() {
    const cells = []

    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        cells.push({ x, y })
      }
    }

    return shuffle(cells)
  }

  hasUniqueSolution(puzzle: Digit[][]) {
    this.numOfSolutions = 0
    const puzzleCopy = puzzle.map((row) => [...row])
    this.findSolutions(puzzleCopy)
    return this.numOfSolutions <= 1
  }

  findSolutions(puzzle: Digit[][]) {
    if (this.numOfSolutions > 1) {
      return
    }

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0) {
          for (const value of [1, 2, 3, 4, 5, 6, 7, 8, 9] as Digit[]) {
            const isValid = this.isValid({ board: puzzle, row, col, value })
            if (isValid) {
              puzzle[row][col] = value
              if (this.findSolutions(puzzle)) {
                return true
              }
              puzzle[row][col] = 0
            }
          }
          return false
        }
      }
    }
    this.numOfSolutions++
  }

  checkSolution(puzzle: Digit[][]) {
    return JSON.stringify(puzzle) === JSON.stringify(this.solution)
  }

  validatePuzzle(puzzle: SudokuCell[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const cell = puzzle[row][col]
        if (cell.value === 0 || cell.isGiven) continue
        if (cell.value !== this.solution[row][col]) {
          cell.isInvalid = true
        }
      }
    }

    return puzzle
  }
}