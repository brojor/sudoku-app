<script setup lang="ts">
import { usePuzzleStore, type Cell } from '@/stores/puzzle';
import { computed } from 'vue';
import PossibleDigits from '@/components/PossibleDigits.vue';

const props = defineProps<{
  cellId: string
  cell: Cell
}>()

const puzzle = usePuzzleStore()

const selected = computed(() => puzzle.selectedCell === props.cellId)

const highlightedValue = computed(() => puzzle.highlightedDigit && puzzle.highlightedDigit === props.cell.value)
const highlightedPossible = computed(()=>props.cell.possibleValues?.includes(puzzle.highlightedDigit))
const highlighted = computed(() => highlightedValue.value || highlightedPossible.value)

</script>

<template>
  <div class="circle" :class="{selected, highlighted, given: cell.isGiven}">
    <PossibleDigits v-if="cell.possibleValues?.length" :possible-values="cell.possibleValues"/>
    <template v-else>{{ cell.value || "" }}</template>
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
}

.given {
  background-color: rgba(255, 255, 255, 0.15);
  color: var(--color-text);
}

.highlighted {
  background-color:rgba(0, 255, 0, 0.2);
  color: white;
}

.selected {
  background-color: green;
}
</style>