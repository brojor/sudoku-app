<script setup lang="ts">

</script>

<template>
	<div class="num-buttons">
		<div class="button" v-for="num in 9" :key="num">{{ num }}
		</div>
		<div class="button">X</div>
	</div>
</template>

<style scoped >
.num-buttons {
	display: flex;
	justify-content: center;
	gap: 2vw;
	flex-wrap: wrap;
	margin: 46px auto 0;
	width: calc(100% - 20vw);
}

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	cursor: pointer;
	font-size: 7vw;
	font-weight: 700;
	width: calc((100% - 4 * 2vw) / 5);
	aspect-ratio: 1;
	border: 0.5px solid rgba(0, 255, 0, 0.5);
	border-radius: 100%;
}
</style>
