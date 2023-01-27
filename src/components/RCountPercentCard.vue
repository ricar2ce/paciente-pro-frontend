<template>
  <q-card :class="`bg-${bgColor} text-${textColor} shadow-4 br-5 `" >
    <q-item>
      <q-item-section>
        <q-item-label class="text-h5 text-weight-bold">{{ value }}</q-item-label>
        <q-item-label class="text-teal-2">{{label}}</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-circular-progress
          show-value
          :font-size="fontSize"
          :value="percent"
          :size="size"
          :color="color"
          :track-color="trackColor"
          class="q-ma-md"
        >
          {{ percent }}%
        </q-circular-progress>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  value: {
    type: Number,
    default: 0
  },
  percent: {
    type: Number,
    default: 0
  },
  label: {
    type: String,
    default: 'Texto'
  },
  textColor: {
    type: String,
    default: 'white'
  },
  bgColor: {
    type: String,
    default: 'secondary'
  },
  color: {
    type: String,
    default: 'white'
  },
  trackColor: {
    type: String,
    default: 'teal-8'
  },
  size: {
    type: String,
    default: '60px'
  },
  fontSize: {
    type: String,
    default: '18px'
  }
})
</script>

<style scoped>

</style>
