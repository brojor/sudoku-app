<template>
<div class="timer">{{ time }}</div>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue';

const numOfSeconds = ref(0)

setInterval(() => {
	numOfSeconds.value++
}, 1000)

const time = computed(() => {
	const seconds = numOfSeconds.value % 60
	const minutes = Math.floor(numOfSeconds.value / 60)
	return minutes > 0 ? `${minutes}M:${seconds}S` : `${seconds}S` 
})
	
</script>

<style scoped>
.timer {
	margin-top: 1rem;
}
</style>