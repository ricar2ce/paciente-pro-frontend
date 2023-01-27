<template>
  <q-item v-for="link in links" :key="link.text" v-ripple clickable :to="link.to" :class="[classes]" :active-class="activeClass">
    <q-item-section avatar>
      <q-icon :name="link.icon" />
    </q-item-section>
    <q-item-section>
      <q-item-label >{{ link.text }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
export default {
  name: "RMenuItems",
  props: {
    links: {
      type: Array,
      default: () => []
    },
    classes: {
      type: String,
      default: ""
    },
    activeClass: {
      type: String,
      default: "text-white"
    },
    textColor: {
      type: String,
      default: "grey-8"
    }
  },
}
</script>

<style scoped>

</style>
