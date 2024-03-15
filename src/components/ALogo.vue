<template>
	<div class="logo">
		<div class="bar horizontal top"></div>
		<div class="bar horizontal bottom"></div>
		<div class="bar vertical left"></div>
		<div class="bar vertical right"></div>
	</div>
</template>

<style scoped>
.logo {
	width: 33vw;
	height: 33vw;
	background: rgba(var(--foreground), 1);
	border-radius: 50%;
	margin: 0 auto;
}

.bar {
	width: 70%;
	height: 5%;
	background: rgb(0, 0, 0);
	position: absolute;
	border-radius: 10px;
}

.horizontal {
	transform: translate(-50%, -50%);
	left: 50%;
}

.top {
	top: 38%;
}

.bottom {
	top: 62%;
}

.vertical {
	transform: translate(-50%, -50%) rotate(90deg);
	top: 50%;
}

.left {
	left: 38%;
}

.right {
	left: 62%;
}
</style>