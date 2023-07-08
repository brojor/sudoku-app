<template>
  <div class="wrapper">
    <div class="row" v-for="row in rows" :key="`row-${row}`">{{row}}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  possibleValues: {
    type: Array,
    default: () => []
  },
})

const rows = computed(()=>[
  props.possibleValues.slice(0,2).join(" "),
  props.possibleValues.slice(2,6).join(" "),
  props.possibleValues.slice(6).join(" "),
].reverse())
</script>

<style scoped>
.wrapper{
  color: #fff;
  font-size: 2.7vw;
  line-height: 1;
  letter-spacing: -1px;
  display: flex;
  flex-direction: column;
  justify-content: center;
	height: 100%;
}

.row {
  display: flex;
  justify-content: center;
	height: 30%;
}

.active {
  background-color: rgba(0, 255, 0, 0.2);
}
</style>
