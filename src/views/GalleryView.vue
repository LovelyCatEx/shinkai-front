<script setup lang="ts">
import {setTitle} from "@/js/universal-utils";
import {GalleryService} from "@/net/service/gallery-service";
import {Ref, ref} from "vue";
import type {GalleryImage} from "@/net/object/server-vo";
import {AssetsSize, getOSSImageUrl} from "@/net/object/server-vo";
import type {Result} from "@/net/result";
import Section from "@/components/Section.vue";
import SiteFooter from "@/components/SiteFooter.vue";

const service = new GalleryService()

const images: Ref<Array<GalleryImage>> = ref([])

function refreshData() {
  service.getCreationComments({
    onSuccess(message: string, data: Result<Array<GalleryImage>>): void {
      images.value = data.data
    }
  })
}

refreshData()

// Title
setTitle("精彩图集")
</script>

<template>
  <main>
    <div class="lo-gallery-container">
      <Section title="精选图集">
        <template #default>
          <div class="lo-waterfall-container">
            <div class="lo-waterfall-card" v-for="(image, index) in images">
              <img :src="getOSSImageUrl(image.feature, AssetsSize.SMALL)" :alt="image.title" />
            </div>
          </div>
        </template>
      </Section>
    </div>

    <SiteFooter />
  </main>

</template>

<style scoped lang="scss">
@include b("gallery-container") {
  width: 100%;
  height: 100%;
  padding: 4rem var(--padding-giant);
}

@include b("waterfall-container") {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

@include b("waterfall-card") {
  flex-grow: 1;
  border-radius: var(--radius-normal);
  overflow: hidden;
  box-shadow: 0 0 1rem rgba(0,0,0,.25);
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
  @include b("waterfall-container") {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  @include b("waterfall-container") {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>