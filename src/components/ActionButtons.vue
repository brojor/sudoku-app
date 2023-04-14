<script setup lang="ts">
const actionButtons = [
	{ icon: 'refresh', action: 'restart' },
	{ icon: 'check', action: 'validate' },
	{ icon: 'edit', action: 'togglePencil' },
	{ icon: 'undo', action: 'undo' },
]
</script>

<template>
	<div class="action-buttons">
		<div class="button" v-for="button in actionButtons" :key="button.action">
			<div :class="`i-ic:baseline-${button.icon}`"></div>
		</div>
	</div>
</template>

<style scoped >
.action-buttons {
	display: flex;
	margin: 10px auto;
	justify-content: center;
	gap: 5px;
	width: calc(100% - 14vw);
}

.button {
	display: flex;
	align-items: center;
	justify-content: center;
	color: white;
	cursor: pointer;
	flex-grow: 1;
	font-size: 5.5vw;
	padding: 3px;
	border-radius: 20px;
}

.digit-controls .button {
	font-size: 1.4rem;
	font-weight: 700;
	width: 15.3%;
	aspect-ratio: 1;
	border: 0.5px solid rgba(0, 255, 0, 0.5);
	border-radius: 100%;
}

</style>
