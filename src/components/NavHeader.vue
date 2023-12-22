<script setup lang="ts">

import {computed, ref} from "vue";
import store from "@/store";
import {storeToRefs} from "pinia";
import router from "@/router";

const props = defineProps<{

}>()

// Store
const { isBackground, isBackgroundBlur } = storeToRefs(store.navHeaderStore)

interface NavHeaderMenu {
  title: string,
  uri: string,
  blank: boolean,
  children: Array<NavHeaderMenu>
}

const menus: Array<NavHeaderMenu> = [
  {
    title: '首页',
    uri: '/',
    blank: false,
    children: []
  },
  {
    title: '影视作品',
    uri: '/creations',
    blank: false,
    children: []
  },
  {
    title: '精彩图集',
    uri: '/gallery',
    blank: false,
    children: []
  }
];

const headerMenu = ref()
const indicator = ref()
const menuLogo = ref()

const absolutePos = ref(true)

const currentIndex = ref(0)
const currentDividerIndex = ref(0)

// Index Refresh
for(let i = 0; i < menus.length; i++) {
  const navItem = menus[i]
  if (navItem.uri === window.location.pathname) {
    currentIndex.value = i
    currentDividerIndex.value = i
  }
}

// Indicator
const computedIndicatorOffsetX = computed(() => {
  return menuLogo.value?.clientWidth + headerMenu.value?.getElementsByTagName("li")[currentDividerIndex.value].clientWidth * currentDividerIndex.value + (indicator.value?.clientWidth / 2)
})
</script>

<template>
  <div
      :class="{'lo-uni-header-wrapper': true, 'white': absolutePos, 'black-background-5': isBackground && absolutePos, 'back-blur-16': isBackgroundBlur}"
      :style="'position: ' + (absolutePos ? 'fixed' : 'static')">
    <div class="lo-uni-header">
      <div class="indicator" ref="indicator" :style="'transform: translateX(' + (computedIndicatorOffsetX) + 'px)'"></div>
      <a class="lo-uni-header__logo" ref="menuLogo" href="/">
        新海诚影集
      </a>
      <ul class="lo-uni-header__menu" ref="headerMenu">
        <li v-for="(menu, index) in menus" :class="{'menu-item--active': currentIndex == index || currentDividerIndex == index}" @mouseover="currentDividerIndex = index" @mouseleave="currentDividerIndex = currentIndex">
          <a :href="menu.uri" :target="menu.blank ? '_blank' : '_self'">{{ menu.title }}</a>
          <ul class="lo-uni-header__menu--sub" v-if="menu.children.length != 0">
            <li v-for="(sub, k) in menu.children!">
              <a :href="sub.uri" :target="sub.blank ? '_blank' : '_self'">{{ sub.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.white {
  color: white;
}

.black {
  color: black;
}

.black-background-5 {
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 0 8px rgba(0,0,0,.5), 0 0 4px rgba(0,0,0,.6);
}

.back-blur-16 {
  backdrop-filter: blur(16px);
}

.menu-item--active {
  text-shadow: 0 0 10px #69e0ff, 0 0 20px #69e0ff, 0 0 40px #69e0ff;
}

$nav-height: 64px;
$btn-back-width: 32px;

@include b("uni-header-wrapper") {
  width: 100%;
  height: $nav-height;
  z-index: 999;
  transition-duration: var(--transition-duration-slow);
}

@include b("uni-header") {
  width: 100%;
  height: 100%;
  padding: 0 var(--padding-giant);
  display: flex;

  $nav-item-width: 88px;
  .indicator {
    width: calc($nav-item-width / 2);
    height: 5px;
    background: rgb(105, 224, 255);
    transition-duration: var(--transition-duration-default);
    position: absolute;
  }

  @include e("logo") {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.2rem;
  }

  @include e("menu") {
    height: $nav-height;
    display: flex;
    align-items: center;
    font-size: 16px;

    li {
      width: $nav-item-width;
      text-align: center;
      display: inline-block;
      position: relative;
      padding: var(--padding-tiny) var(--padding-normal);
      word-break: keep-all;
    }

    &:hover &--sub {
      opacity: 1;
      transition-duration: var(--transition-duration-default);
    }

    @include m("sub") {
      background-color: var(--secondary-color);
      border-radius: var(--radius-normal);
      box-shadow: 0 0 4px rgba(0,0,0,.5);
      margin-top: var(--margin-lite);
      position: absolute;
      opacity: 0;
      transition-duration: var(--transition-duration-default);

      li {
        padding: var(--padding-lite) var(--padding-normal);
      }
    }
  }


}
</style>