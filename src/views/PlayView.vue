<script setup lang="ts">
import ABoard from '@/components/ABoard.vue';
import ANavbar from '@/components/ANavbar.vue';
import ActionButtons from '@/components/ActionButtons.vue';
import NumButtons from '@/components/NumButtons.vue';
import { usePuzzleStore } from '@/stores/puzzle';

const puzzle = usePuzzleStore();
</script>

<template>
  <main :class="{ 'is-solved': puzzle.isSolved }">
    <ANavbar />
    <ABoard />
    <NumButtons />
		<ActionButtons />
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;;
  height: 100vh;
}
</style>