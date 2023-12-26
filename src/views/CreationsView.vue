<script setup lang="ts">
import {CreationService} from "@/net/service/creation-service";
import type {Result} from "@/net/result";
import {AssetsSize, Creation} from "@/net/object/server-vo";
import {computed, Ref, ref} from "vue";
import SiteFooter from "@/components/SiteFooter.vue";
import store from "@/store";
import {storeToRefs} from "pinia";
import {setTitle} from "@/js/universal-utils";

const service = new CreationService()

const creations: Ref<Array<Creation>> = ref([])

function refreshData() {
  service.getAllCreations({
    onSuccess(message: string, data: Result<Array<Creation>>): void {
      creations.value = data.data
    }
  })
}

refreshData()

// Banner
const bannerContainer = ref()

const maxBannerDisplayCount = ref(3)

const currentBannerIndex = ref(0)
function adjustBannerIndex(isForward: boolean) {
  let newIndex = currentBannerIndex.value + (isForward ? 1 : -1)
  if (newIndex < 0) {
    newIndex = maxBannerDisplayCount.value - 1
  }
  if (newIndex > maxBannerDisplayCount.value - 1) {
    newIndex = 0
  }
  currentBannerIndex.value = newIndex
}

const computedBannerData = computed(() => {
  return creations.value.slice(0, 3)
})

const computedBannerStyle = computed(() => {
  return 'width: ' + (maxBannerDisplayCount.value * 100) + '%; transform: translateX(-' + (100 / maxBannerDisplayCount.value * currentBannerIndex.value) + '%)'
})

setInterval(() => adjustBannerIndex(true), 3000)


// Creation
function cardClickEvent(creation: Creation) {
 window.open('/creation/' + creation.id, '_blank')
}


// Header
const { isBackgroundBlur, isBackground } = storeToRefs(store.navHeaderStore)
isBackgroundBlur.value = false
isBackground.value = false

window.onscroll = () => {
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
  let bannerHeight = bannerContainer.value?.clientHeight
  const percentage = scrollTop / bannerHeight
  isBackgroundBlur.value = percentage > 0.4
  isBackground.value = percentage > 0.4
}

// Title
setTitle("影视作品")
</script>

<template>
  <div class="lo-creation-container">
    <div class="lo-creation-banner-container" ref="bannerContainer">
      <div class="lo-creation-banner-action">
        <div class="lo-creation-banner-action__btn-wrapper lo-creation-banner-action__btn-wrapper--left">
          <div class="lo-creation-banner-action__btn lo-creation-banner-action__pre" @click.stop="adjustBannerIndex(false)">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="7072" width="200" height="200"><path d="M872.4 556.6s-0.1 0 0 0l-719.9-0.6c-24.6 0-44.6-20-44.6-44.7 0-24.6 20-44.6 44.6-44.6l719.8 0.7c24.6 0 44.6 20 44.6 44.7 0.1 24.6-19.9 44.5-44.5 44.5z" fill="#ffffff" p-id="7073"></path><path d="M456.8 924.1c-11.4 0-22.8-4.4-31.5-13.1L167.7 653.5c-78.4-78.4-78.4-205.9 0-284.3l257.5-257.5c17.4-17.4 45.7-17.4 63.1 0s17.4 45.7 0 63.1L230.8 432.3c-43.6 43.6-43.6 114.5 0 158.1l257.5 257.5c17.4 17.4 17.4 45.7 0 63.1-8.6 8.7-20.1 13.1-31.5 13.1z" fill="#ffffff" p-id="7074"></path></svg>
          </div>
        </div>

        <div style="flex-grow: 1"></div>

        <div class="lo-creation-banner-action__btn-wrapper lo-creation-banner-action__btn-wrapper--right">
          <div class="lo-creation-banner-action__btn lo-creation-banner-action__next" @click.stop="adjustBannerIndex(true)">
            <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="7279" width="200" height="200"><path d="M874.9 558.1s-0.1 0 0 0l-723.8-0.7c-24.8 0-44.8-20.1-44.8-44.9 0-24.8 20.1-44.8 44.9-44.8l723.7 0.7c24.8 0 44.8 20.1 44.8 44.9 0 24.7-20.1 44.8-44.8 44.8z" fill="#ffffff" p-id="7280"></path><path d="M568.9 928.2c-11.5 0-23-4.4-31.7-13.1-17.5-17.5-17.5-45.9 0-63.4l258.9-258.9c43.8-43.8 43.8-115.2 0-159l-258.9-259c-17.5-17.5-17.5-45.9 0-63.4s45.9-17.5 63.4 0l258.9 258.9c78.8 78.8 78.8 207.1 0 285.9L600.7 915.1c-8.8 8.7-20.3 13.1-31.8 13.1z" fill="#ffffff" p-id="7281"></path></svg>
          </div>
        </div>
      </div>

      <div class="lo-creation-banner" :style="computedBannerStyle">
        <div class="lo-creation-banner__item" v-for="(item, index) in computedBannerData" :style="'background: url(' + Creation.getFeatureUrl(item, AssetsSize.MEDIUM) + ') center no-repeat; background-size: cover;'"></div>
      </div>
    </div>

    <div class="lo-section">
      <h1 class="lo-section__title">作品</h1>
    </div>

    <div class="lo-creation-view">
      <div class="lo-creation-card" v-for="(creation, index) in creations" @click="cardClickEvent(creation)">
        <header class="lo-creation-card__header">
          <img class="lo-creation-card__feature" :src="Creation.getFeatureUrl(creation, AssetsSize.MEDIUM)" :alt="creation.name" />
        </header>
        <div class="lo-creation-card__content">
          <p class="lo-creation-card__name">{{ creation.name }}</p>
          <p class="lo-creation-card__description">{{ creation.descriptionShort }}</p>
        </div>
      </div>
    </div>

    <SiteFooter style="margin-top: calc(var(--margin-giant) * 2)" />
  </div>
</template>

<style scoped lang="scss">
@include b("section") {
  margin: calc(var(--margin-giant) * 2);

  @include e("title") {
    font-size: 2rem;
  }
}
</style>

<style scoped lang="scss">
@include b("creation-view") {
  width: 80vw;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 24px;
}

@include b("creation-card") {
  width: auto;
  height: auto;
  border-radius: var(--radius-normal);
  overflow: hidden;
  box-shadow: 0 0 4px rgba(0,0,0,.35), 0 0 12px rgba(0,0,0,.2);
  cursor: pointer;

  &:hover &__feature {
    transform: scale(1.05);
    box-shadow: 0 0 8px rgba(0,0,0,.35);
  }

  $scale: 65%;
  @include e("header") {
    width: 100%;
    height: $scale;
    overflow: hidden;
  }

  @include e("feature") {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include e("content") {
    height: calc(100% - $scale);
    padding: var(--padding-lite) var(--padding-giant);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: var(--secondary-light-color);
  }

  @include e("name") {
    font-size: 1.5rem;
  }

  @include e("description") {
    margin-top: var(--margin-normal);
    height: 3.6rem;
    line-height: 1.2rem;
    font-size: 1.1rem;
    overflow: hidden;
  }
}
</style>

<style scoped lang="scss">
@include b("creation-container") {
  width: 100%;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@include b("creation-banner-container") {
  width: 100%;
  height: 80vh;
  position: relative;
  overflow: hidden;
}

@include b("creation-banner") {
  height: 100%;
  display: flex;
  transition: all ease-in-out var(--transition-duration-slow);

  @include e("item") {
    flex-grow: 1;
  }
}

@include b("creation-banner-action") {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  position: absolute;
  z-index: 2;

  @include e("btn-wrapper") {
    height: 100%;
    display: inherit;
    justify-content: inherit;
    align-items: inherit;

    $gradient-from: #00000040;
    @include m("left") {
      background: linear-gradient(to right, $gradient-from, #00000000);
    }

    @include m("right") {
      background: linear-gradient(to left, $gradient-from, #00000000);
    }
  }

  @include e("btn") {
    $width: 3rem;
    width: $width;
    height: $width;
    cursor: pointer;
    background: rgba(0,0,0,.2);
    border-radius: calc($width / 2);
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    margin: var(--margin-giant);

    &:hover {
      background: rgba(0,0,0,.3);
    }

    svg {
      width: calc($width / 2.5);
      height: calc($width / 2.5);
    }
  }

  @include e("pre") {
    margin-left: var(--padding-giant);
  }

  @include e("next") {
    margin-right: var(--padding-giant);
  }
}
</style>



<style scoped lang="scss">
@media screen and (max-width: 920px){
  @include b("creation-banner-container") {
    height: 40vh!important;
  }

  @include b("creation-view") {
    grid-template-columns: repeat(1, 1fr);
  }
}

@media screen and (min-width: 920px) and (max-width: 1400px) {
  @include b("creation-banner-container") {
    height: 50vh!important;
  }

  @include b("creation-view") {
    grid-template-columns: repeat(2, 1fr);
  }
}

</style>