<template>
	<div class="color-picker" :class="{ expanded: isOpen, border: hasBorder }">
		<div class="colors">
			<ColoredDot v-for="(color, i) in colors" :key="i" :foreground="color.foreground" :background="color.background"
				:is-active="i === activeColor" @click="setActiveColor(i)" />
		</div>
		<div class="button">
			<i class="i-ic:baseline-palette" @click="toggleColorPicker()"></i>
		</div>
	</div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import ColoredDot from './ColoredDot.vue'

const isOpen = ref(false)
const hasBorder = ref(false)
const activeColor = ref(4)
let timeout = 0

const closeWithDelay = () => {
	timeout = setTimeout(() => {
			isOpen.value = !isOpen.value
			setTimeout(() => {
				hasBorder.value = !hasBorder.value
			}, 600)
		}, 5000)
}

const restartTimeout = () => {
	clearTimeout(timeout)
	closeWithDelay()
}

const toggleColorPicker = () => {
	setTimeout(() => {
		hasBorder.value = !hasBorder.value
	}, 600)
	
	if (!isOpen.value) {
		closeWithDelay()
	} else {
		clearTimeout(timeout)
	}
	isOpen.value = !isOpen.value
}

const setActiveColor = (index: number) => {
	activeColor.value = index
	const el = document.body as HTMLElement
	el.style.setProperty('--foreground', colors[index].foreground)
	el.style.setProperty('--background', colors[index].background)

	restartTimeout()
}

const colors = [
	{
		foreground: '130, 119, 67',
		background: '25, 25, 25'
	},
	{
		foreground: '64, 118, 150',
		background: '31, 31, 31'
	},
	{
		foreground: '190, 99, 106',
		background: '27, 27, 27'
	},
	{
		foreground: '3, 102, 157',
		background: '13, 22, 29'
	},
	{
		foreground: '22, 146, 30',
		background: '17, 17, 17'
	},
	{
		foreground: '182, 109, 255',
		background: '10, 0, 20'
	},
]

</script>


<style scoped>
.color-picker {
	width: 9vw;
	height: 9vw;
	border-radius: 5vw;
	position: absolute;
	right: 1.5vw;
	border: 1px solid transparent;
	transition: width 400ms;
	background-color: rgba(var(--background), 1);
	overflow: hidden;
}

i {
	font-size: 7vw;
	margin-left: 2px;
}

.color-picker.expanded {
	width: calc(100% - 3vw);
	border: 1px solid rgba(var(--foreground), 1);
}

.color-picker.expanded .button {
	background-color: rgba(var(--foreground), 1);
}

.color-picker.expanded i {
	color: rgba(var(--background), 1);
}

.button {
	position: absolute;
	height: calc(100% + 2px);
	aspect-ratio: 1/1;
	border-radius: 100%;
	right: 0;
	top: -1px;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba(var(--background), 1);
}

.border {
	border: 1px solid rgba(var(--foreground), 1);
}

.colors {
	width: 87vw;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>