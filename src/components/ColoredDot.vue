<template>

	<div class="background-color" :class="{ isActive: isActive }" :style="{ backgroundColor: props.background }">
		<div class="foreground-color" :style="{ backgroundColor: props.foreground }">
			<div class="center" :style="{ backgroundColor: props.background }"/>
		</div>
	</div>

</template>


<script setup lang="ts">
const props = defineProps<{
	foreground: string
	background: string
	isActive: boolean
}>()

</script>


<style scoped>
.background-color {
	width: 5vw;
	height: 5vw;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 300ms;
}

.foreground-color {
	width: 2.5vw;
	height: 2.5vw;
	border-radius: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: all 300ms;
}

.center {
	width: 0;
	height: 0;
	border-radius: 100%;
	transition: all 500ms;
}

.isActive .center {
	width: 5vw;
	height: 5vw;
}

.isActive .foreground-color,
.isActive {
	width: 7vw;
	height: 7vw;
}
</style>