<script setup lang="ts">
import { usePuzzleStore } from '@/stores/puzzle';
import { computed } from 'vue';

const props = defineProps<{
	cellId: string
}>()

const puzzle = usePuzzleStore()

const selected = computed(() => puzzle.selection === props.cellId)
</script>

<template>
	<div class="circle" :class="{selected}"></div>
</template>

<style scoped>
.circle {
  width: 85%;
  height: 85%;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.selected {
	background-color: green;
}

.given {
	background-color: rgba(255, 255, 255, 0.15);
  color: var(--color-text);
}

.highlighted {
  background-color:rgba(0, 255, 0, 0.2);
  color: white;
}
</style>