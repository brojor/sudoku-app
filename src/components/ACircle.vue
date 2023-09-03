<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import { computed } from 'vue';
import PossibleDigits from '@/components/PossibleDigits.vue';
import type { SudokuCell } from '@/types';

const props = defineProps<{
  cell: SudokuCell
  clicked: boolean
}>()

const puzzle = usePuzzleStore()

const selected = computed(() => puzzle.selectedCell === props.cell)

const highlightedValue = computed(() => puzzle.highlightedDigit && puzzle.highlightedDigit === props.cell.value)
const highlightedPossible = computed(() => puzzle.highlightedDigit && props.cell.possibleValues?.includes(puzzle.highlightedDigit))
const highlighted = computed(() => highlightedValue.value || highlightedPossible.value)
const indicatorActive = computed(() => (highlighted.value || props.cell.isInvalid) && !selected.value)

const animationDelay = computed(() => {
  if (props.clicked || puzzle.selectedCell) return '0ms'
  return `${Math.floor(Math.random() * 300)}ms`
})

</script>

<template>
  <div class="circle" :class="{ given: cell.isGiven, selected }">
    <Transition>
      <div class="indicator" v-if="indicatorActive" :class="{ invalid: cell.isInvalid, highlighted }"></div>
    </Transition>
    <PossibleDigits v-if="cell.possibleValues?.length" :possible-values="cell.possibleValues" />
    <p v-else>{{ cell.value || "" }}</p>
  </div>
</template>

<style scoped>
.circle {
  width: 85%;
  height: 85%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 6vw;
  font-weight: 500;
  cursor: pointer;
  position: relative;
}

.given {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

.selected {
  background-color: rgb(8, 156, 0);
}


.indicator {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 100%;
  color: white;
}

.indicator.selected {
  background-color: green;
}

.indicator.highlighted {
  background-color: rgb(42, 93, 42);
  animation-delay: v-bind(animationDelay);
  animation-fill-mode: both;
}

.indicator.invalid {
  background-color: rgb(255, 52, 68);
  animation-delay: v-bind(animationDelay);
  animation-fill-mode: both;
}

.v-enter-active {
  animation: bounce-in 0.3s;
}

.v-leave-active {
  animation: bounce-in 0.3s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }

  50% {
    transform: scale(1.2);
  }

  100% {
    transform: scale(1);
  }
}
</style>
