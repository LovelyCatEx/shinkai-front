<script setup lang="ts">
import {getCurrentInstance, Ref, ref} from "vue";
import {CreationService} from "@/net/service/creation-service";
import type {Result} from "@/net/result";
import type {Creation} from "@/net/object/server-vo";
import router from "@/router";
import SiteFooter from "@/components/SiteFooter.vue";

const service = new CreationService()

const { proxy } = getCurrentInstance()
const creationId = proxy.$route.params.id

const creation: Ref<Creation> = ref({})

function refreshData() {
  service.getCreation(creationId, {
    onSuccess(message: string, data: Result<Creation>): void {
      data.data.publishedTime = data.data.publishedTime.split(" ")[0]
      creation.value = data.data
    }
  })
}

refreshData()

</script>

<template>
  <div class="lo-details-container">
    <div class="lo-details-banner-container">
      <div class="lo-details-banner-container__background" :style="'background: url(' + creation.feature + ') center no-repeat;'"></div>
      <div class="lo-details-banner-container__btn-back" @click="router.back()">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="7072" width="200" height="200"><path d="M872.4 556.6s-0.1 0 0 0l-719.9-0.6c-24.6 0-44.6-20-44.6-44.7 0-24.6 20-44.6 44.6-44.6l719.8 0.7c24.6 0 44.6 20 44.6 44.7 0.1 24.6-19.9 44.5-44.5 44.5z" fill="#ffffff" p-id="7073"></path><path d="M456.8 924.1c-11.4 0-22.8-4.4-31.5-13.1L167.7 653.5c-78.4-78.4-78.4-205.9 0-284.3l257.5-257.5c17.4-17.4 45.7-17.4 63.1 0s17.4 45.7 0 63.1L230.8 432.3c-43.6 43.6-43.6 114.5 0 158.1l257.5 257.5c17.4 17.4 17.4 45.7 0 63.1-8.6 8.7-20.1 13.1-31.5 13.1z" fill="#ffffff" p-id="7074"></path></svg>
      </div>
      <div class="lo-details-banner">
        <div class="lo-details-banner__feature">
          <img :src="creation.featureVertical" :alt="creation.name" />
        </div>
        <div class="lo-details-banner__details-container">
          <p class="lo-details__name">
            {{ creation.name }}
            <span class="lo-details__name--origin">{{ creation.originName }}</span>
          </p>
          <p class="lo-details__published">上映时间：{{ creation.publishedTime }}</p>
          <p class="lo-details__description">{{ creation.description }}</p>
        </div>
      </div>
    </div>

    <div class="lo-section">
      <div class="lo-section__header">
        <h1 class="lo-section__title">人物简介</h1>
      </div>
    </div>

    <SiteFooter />

  </div>
</template>

<style scoped lang="scss">
@include b("section") {
  margin: var(--margin-giant) 0;
  width: 100%;

  @include e("header") {
    text-align: center;
  }

  @include e("title") {
    font-size: 2rem;
  }
}
</style>

<style scoped lang="scss">
@include b("details-container") {
  width: 100%;
  height: 100vh;
}

@include b("details-banner-container") {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @include e("background") {
    width: 100%;
    height: 100vh;
    background-size: cover;
    filter: blur(128px);
  }

  @include e("btn-back") {
    $width: 3rem;
    width: $width;
    height: $width;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: calc($width / 2);
    position: absolute;
    top: calc(64px + var(--margin-large));
    left: var(--margin-large);
    background: rgba(0,0,0,.5);
    cursor: pointer;

    svg {
      width: calc($width / 2);
      height: calc($width / 2);
    }
  }
}

@include b("details-banner") {
  max-width: 1200px;
  position: absolute;
  display: grid;
  grid-template-columns: 1fr 3fr;
  padding: 0 calc(var(--padding-giant) * 2);
  color: white;

  @include e("feature") {
    width: 24rem;
    height: 32rem;
    justify-self: center;
    align-self: center;
    margin: var(--margin-normal);
    box-shadow: 0 0 4rem rgba(0,0,0,.25);
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @include e("details-container") {
    margin: 0 calc(var(--margin-giant) * 1.5);

    p {
      margin: var(--margin-normal) 0;
    }
  }
}

@include b("details") {
  $sub-text-color: #efefef;
  margin: var(--margin-normal) 0;

  @include e("name") {
    font-size: 3rem;

    @include m("origin") {
      font-size: 2rem;
      color: $sub-text-color;
    }
  }

  @include e("published") {
    font-size: 1.2rem;
    color: $sub-text-color;
  }

  @include e("description") {
    $size: 1.2rem;
    font-size: $size;
    line-height: calc($size * 1.5);
  }
}


</style>

<style scoped lang="scss">
@media screen and (max-width: 1200px) {
  @include b("details-banner") {
    grid-template-columns: 1fr;
  }
}
</style>