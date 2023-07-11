import { defineStore } from 'pinia'
import { difficultyList } from '@/sudoku'

export const useGameState = defineStore('gameState', {
  state: () => ({
    difficulty: difficultyList[0] as typeof difficultyList[number],
  }),
	getters: {
		lowestDifficulty: (state) => state.difficulty === difficultyList[0],
		highestDifficulty: (state) => state.difficulty === difficultyList[difficultyList.length - 1],
	},
  actions: {
    increaseDifficulty() {
			const index = difficultyList.indexOf(this.difficulty)
			if (index < difficultyList.length - 1) {
				this.difficulty = difficultyList[index + 1]
			}
		},
		decreaseDifficulty() {
			const index = difficultyList.indexOf(this.difficulty)
			if (index > 0) {
				this.difficulty = difficultyList[index - 1]
			}
		}
  },
})
