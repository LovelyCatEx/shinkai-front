<script setup lang="ts">

import NavHeader from "@/components/NavHeader.vue";


</script>

<template>
  <div class="lo-container">
    <NavHeader :absolute-pos="true" />
    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@include b('container') {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>