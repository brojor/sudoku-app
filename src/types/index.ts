export type Digit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 0

export interface SudokuCell {
  value: Digit
  isGiven: boolean
  possibleValues?: Omit<Digit, 0>[]
}