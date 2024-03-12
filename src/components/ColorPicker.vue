<template>
	<div class="color-picker" :class="{ expanded: isOpen, border: hasBorder }">
		<div class="colors">
			<ColoredDot v-for="(color, i) in colors" :key="i" :foreground="color.foreground" :background="color.background"
				:is-active="i === activeColor" @click="setActiveColor(i)" />
		</div>
		<div class="button">
			<i class="i-ic:baseline-palette" @click="expandColorPicker()"></i>
		</div>
	</div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import ColoredDot from './ColoredDot.vue'

const isOpen = ref(false)
const hasBorder = ref(false)
const activeColor = ref(0)

const expandColorPicker = () => {
	isOpen.value = !isOpen.value
	setTimeout(() => {
		hasBorder.value = !hasBorder.value
	}, 600)
}

const setActiveColor = (index: number) => {
	activeColor.value = index
}

const colors = [
	{
		foreground: '#827743',
		background: '#191919'
	},
	{
		foreground: '#407696',
		background: '#1F1F1F'
	},
	{
		foreground: '#BE636A',
		background: '#1B1B1B'
	},
	{
		foreground: '#03669D',
		background: '#0D161D'
	},
	{
		foreground: '#16921E',
		background: '#111111'
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
	background-color: #181818;
	overflow: hidden;
}

i {
	font-size: 5vw;
	margin-left: 2px;
}

.color-picker.expanded {
	width: calc(100% - 3vw);
	border: 1px solid green;
}

.color-picker.expanded .button {
	background-color: green;
}

.color-picker.expanded i {
	color: black;
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
	background-color: #181818;
}

.border {
	border: 1px solid green;
}

.colors {
	width: 87vw;
	height: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
}
</style>