<script setup lang="ts">

import VerticalScrollBanner from "@/components/VerticalScrollBanner.vue";

let fullBlockScrollData = {
  backgroundImages: ['https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg',
    'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg',
    'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
    'https://uploadstatic.mihoyo.com/contentweb/20210719/2021071918001232800.jpg',
    'https://webstatic.mihoyo.com/upload/contentweb/2022/08/15/8969f683b92839ac427c875d0d742be2_4825576482548821743.jpg'],
  asideData: ['蒙德', '璃月', '稻妻', '须弥', '枫丹'],
  showAside: true,
  isMobile: false
};

</script>

<template>
  <main class="lo-home-container">
    <VerticalScrollBanner name="abc" :component-data="fullBlockScrollData">
      <template v-slot:slot0>

      </template>
    </VerticalScrollBanner>
  </main>
</template>

<style lang="scss" scoped>
@include b("home-container") {
  width: 100%;
  height: 100%;
}
</style>