<script setup lang="ts">
import ABoard from '@/components/ABoard.vue';
import ANavbar from '@/components/ANavbar.vue';
import ActionButtons from '@/components/ActionButtons.vue';
import NumButtons from '@/components/NumButtons.vue';
import { useGameState } from '@/stores/gameState';

const gameState = useGameState()
</script>

<template>
  <main :class="{ 'is-solved': gameState.isSolved }">
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