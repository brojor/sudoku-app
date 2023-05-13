import type { Digit } from '@/types'
type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'extreme'

function shuffle(array: number[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export class Sudoku {
  board: Digit[][] = []

  constructor() {
    this.createBoard()
    this.createSolution()
  }
  
  createBoard() {
    this.board = Array.from({ length: 9 }, () => Array(9).fill(0))
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

  isValid(row: number, col: number, value: Digit) {
    let valid = true

    const checkValue = (v: Digit) => {
      if (v === value) {
        valid = false
      }
    }

    Sudoku.iterateOverRow(this.board, row, checkValue)
    Sudoku.iterateOverColumn(this.board, col, checkValue)
    Sudoku.iterateOverBox(this.board, row, col, checkValue)
    return valid
  }

	createSolution(): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (this.board[row][col] === 0) {
					const possibleValues = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]) as Digit[]
					for (const value of possibleValues) {
						if (this.isValid(row, col, value)) {
							this.board[row][col] = value
							if (this.createSolution()) {
								return true
							}
							this.board[row][col] = 0
						}
					}
					return false
				}
			}
		}
		return true
	}

  createPuzzle(difficulty: Difficulty) {
    let numberOfCellsToRemove = {
      beginner: 24,
      easy: 37,
      medium: 46,
      hard: 52,
      extreme: 56,
    }[difficulty]

    const puzzle = this.board.map((row) => [...row])

    while (numberOfCellsToRemove > 0) {
      const randomRow = Math.floor(Math.random() * 9)
      const randomCol = Math.floor(Math.random() * 9)
      if (puzzle[randomRow][randomCol] !== 0) {
        puzzle[randomRow][randomCol] = 0
        numberOfCellsToRemove--
      }
    }

    return puzzle
  }
  
  checkSolution(puzzle: Digit[][]) {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] !== this.board[row][col]) {
          return false
        }
      }
    }
    return true
  }
}


