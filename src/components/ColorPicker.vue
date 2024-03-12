<template>
	<div class="color-picker" :class="{ expanded: isOpen, border: hasBorder }">
		<div class="button">
			<i class="i-ic:baseline-palette" @click="expandColorPicker()"></i>
		</div>
	</div>
</template>


<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)
const hasBorder = ref(false)

const expandColorPicker = () => {
	isOpen.value = !isOpen.value
	setTimeout(() => {
		hasBorder.value = !hasBorder.value
	}, 500)
}

</script>


<style scoped>
.color-picker {
	width: 9vw;
	height: 9vw;
	border-radius: 5vw;
	position: absolute;
	right: 1.5vw;
	border: 1px solid transparent;
	transition: width 300ms;
	background-color: #181818;
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
}

.border {
	border: 1px solid green;
}
</style>