import { defineConfig } from 'unocss'
import presetIcons from '@unocss/preset-icons'

const icons = ['refresh', 'check', 'edit', 'undo']

export default defineConfig({
  presets: [
    presetIcons({}),
  ],
  safelist: [
    ...icons.map(i=> `i-ic:baseline-${i}`)
  ]
})