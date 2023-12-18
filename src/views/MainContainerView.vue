<script setup lang="ts">

import NavHeader from "@/components/NavHeader.vue";


</script>

<template>
  <div class="lo-container">
    <NavHeader :transparent="false"/>
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