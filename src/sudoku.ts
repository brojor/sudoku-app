type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'extreme'

function shuffle(array: number[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[array[i], array[j]] = [array[j], array[i]]
	}
	return array
}

export class Sudoku {
  board = [] as number[][]

  constructor() {
    this.createBoard()
    this.createSolution()
  }
  
  createBoard() {
    this.board = Array.from({ length: 9 }, () => Array(9).fill(0))
  }

  iterateOverRow(row: number, callback: (value: number) => void) {
    for (let i = 0; i < 9; i++) {
      callback(this.board[row][i])
    }
  }

  iterateOverColumn(col: number, callback: (value: number) => void) {
    for (let i = 0; i < 9; i++) {
      callback(this.board[i][col])
    }
  }

  iterateOverBox(row: number, col: number, callback: (value: number) => void) {
    const startRow = Math.floor(row / 3) * 3
    const startCol = Math.floor(col / 3) * 3

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        callback(this.board[startRow + i][startCol + j])
      }
    }
  }

  isValid(row: number, col: number, value: number) {
    let valid = true
    this.iterateOverRow(row, (v) => {
      if (v === value) {
        valid = false
      }
    })
    this.iterateOverColumn(col, (v) => {
      if (v === value) {
        valid = false
      }
    })
    this.iterateOverBox(row, col, (v) => {
      if (v === value) {
        valid = false
      }
    })
    return valid
  }

	createSolution(): boolean {
		for (let row = 0; row < 9; row++) {
			for (let col = 0; col < 9; col++) {
				if (this.board[row][col] === 0) {
					const possibleValues = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9])
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
  
  checkSolution(puzzle: number[][]) {
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


