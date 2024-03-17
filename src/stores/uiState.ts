import { defineStore } from 'pinia'
import type { SudokuCell, Digit, Candidate } from '@/types'

export const useUiState = defineStore('uiState', {
  state: () => ({
    selectedCell: null as SudokuCell | null,
    selectedDigit: null as Digit | null,
    highlightedDigit: null as Candidate | null,
    pencilMode: false,
  }),

  actions: {
    selectCell(cell: SudokuCell) {
      this.selectedCell = this.selectedCell === cell ? null : cell
      this.highlightDigit(cell.value)
    },

    selectDigit(digit: Digit) {
      this.selectedDigit = this.selectedDigit === digit ? null : digit
    },

    highlightDigit(digit: Digit) {
      this.highlightedDigit = this.highlightedDigit === digit || !digit ? null : digit
    },

    togglePencilMode() {
      this.pencilMode = !this.pencilMode
    },

    reset() {
      this.selectedCell = null
      this.selectedDigit = null
      this.highlightedDigit = null
      this.pencilMode = false
      // this.snapshots = []
    }
  }
})
