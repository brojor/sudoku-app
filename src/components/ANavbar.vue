<template>
	<div class="wrapper">
		<i @click="$router.push('/')" class="i-ic:baseline-arrow-back"></i>
		<div class="timer">{{ time }}</div>
		<i class="i-ic:baseline-palette"></i>
	</div>
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
	return minutes > 0 ? `${minutes}M ${seconds}S` : `${seconds}S` 
})
	
</script>

<style scoped>
.wrapper {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	padding: 0.5rem 1rem;
}

i {
	display: block;
	font-size: 1.5rem;
}

.timer {
	font-size: 3.5vw;
}
</style>