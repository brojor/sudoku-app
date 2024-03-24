import { defineStore } from 'pinia'
import { difficultyList } from '@/sudoku'

let timer: NodeJS.Timeout

export const useGameState = defineStore('gameState', {
  state: () => ({
    difficulty: difficultyList[0] as (typeof difficultyList)[number],
    times: {
      beginner: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      extreme: 0
    },
    isPaused: false,
    isSolved: false
  }),
  getters: {
    lowestDifficulty: (state) => state.difficulty === difficultyList[0],
    highestDifficulty: (state) => state.difficulty === difficultyList[difficultyList.length - 1],
    formatedTime: (state) => {
      const time = state.times[state.difficulty]
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      return minutes > 0 ? `${minutes}M ${seconds}S` : `${seconds}S`
    }
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
      clearInterval(timer)
      this.isPaused = false
      this.times[this.difficulty] = 0
      timer = setInterval(() => {
        if (!this.isPaused) {
          this.times[this.difficulty]++
        }
      }, 1000)
    },
    pauseTimer() {
      this.isPaused = true
    },
    resumeTimer() {
      this.isPaused= false
    },
    stopTimer() {
      clearInterval(timer)
    }
  }
})
