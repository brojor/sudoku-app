import { defineStore } from 'pinia'
import { difficultyList } from '@/sudoku'

export const useGameState = defineStore('gameState', {
  state: () => ({
    difficulty: difficultyList[0] as (typeof difficultyList)[number],
    time: 0,
    timer: 0,
		isSolved: false,
  }),
  getters: {
    lowestDifficulty: (state) => state.difficulty === difficultyList[0],
    highestDifficulty: (state) => state.difficulty === difficultyList[difficultyList.length - 1],
		formatedTime: (state) => {
			const minutes = Math.floor(state.time / 60)
			const seconds = state.time % 60
			return minutes > 0 ? `${minutes}M ${seconds}S` : `${seconds}S` 
		},
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
    },
    startTimer() {
			console.log('start timer');
      this.time = 0
      this.timer = window.setInterval(() => {
        this.time++
      }, 1000)
    },
		stopTimer() {
			clearInterval(this.timer)
		}
  }
})
