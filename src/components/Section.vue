<script setup lang="ts">

const props = defineProps<{
  title: string,
  subtitle?: string
}>()

</script>

<template>
  <div class="lo-section">
    <div class="lo-section__header">
      <h1 class="lo-section__title">{{ props.title }}</h1>
      <h1 class="lo-section__subtitle" v-show="props.subtitle != undefined && props.subtitle != ''">{{ props.subtitle }}</h1>
    </div>
    <div class="lo-section__content">
      <slot name="default" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/section";
</style>