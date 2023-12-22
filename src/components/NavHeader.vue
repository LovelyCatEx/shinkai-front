<script setup lang="ts">

import {computed, ref} from "vue";
import store from "@/store";
import {storeToRefs} from "pinia";
import router from "@/router";

const props = defineProps<{

}>()

// Store
const { isBackground, isBackgroundBlur, isShowingIndicatorAndActiveItem } = storeToRefs(store.navHeaderStore)

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
    children: [
      {
        title: '铃芽之旅',
        uri: '/creation/8',
        blank: true,
        children: []
      },
      {
        title: '天气之子',
        uri: '/creation/7',
        blank: true,
        children: []
      },
      {
        title: '你的名字',
        uri: '/creation/6',
        blank: true,
        children: []
      }
    ]
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
const currentMouseIndex = ref(-1)
const computedIndicatorOffsetX = computed(() => {
  return menuLogo.value?.clientWidth + headerMenu.value?.getElementsByClassName("lo-uni-header__menu--item")[currentDividerIndex.value].clientWidth * currentDividerIndex.value + (indicator.value?.clientWidth / 2)
})

// Drawer
const isDrawerShowing = ref(false)
</script>

<template>
  <div
      :class="{'lo-uni-header-wrapper': true, 'white': absolutePos, 'black-background-5': isBackground && absolutePos, 'back-blur-16': isBackgroundBlur}"
      :style="'position: ' + (absolutePos ? 'fixed' : 'static')">
    <div class="lo-uni-header">
      <div class="indicator" ref="indicator" :style="'transform: translateX(' + (computedIndicatorOffsetX) + 'px)'" v-show="isShowingIndicatorAndActiveItem"></div>
      <a class="lo-uni-header__logo" ref="menuLogo" href="/">
        新海诚影集
      </a>
      <ul class="lo-uni-header__menu" ref="headerMenu">
        <li v-for="(menu, index) in menus"
            class="lo-uni-header__menu--item"
            :class="{'menu-item--active': isShowingIndicatorAndActiveItem && (currentIndex == index || currentDividerIndex == index)}"
            @mouseover="currentDividerIndex = index; currentMouseIndex = index"
            @mouseleave="currentDividerIndex = currentIndex; currentMouseIndex = -1">
          <a :href="menu.uri" :target="menu.blank ? '_blank' : '_self'">{{ menu.title }}</a>
          <ul v-if="menu.children.length != 0"
              class="lo-uni-header__menu--sub"
              :class="{'lo-uni-header__menu--sub--active': currentMouseIndex == index}"
             >
            <li v-for="(sub, k) in menu.children!">
              <a :href="sub.uri" :target="sub.blank ? '_blank' : '_self'">{{ sub.title }}</a>
            </li>
          </ul>
        </li>
      </ul>
      <div style="flex-grow: 1"></div>
      <div class="lo-uni-header-menu-mobile">
        <div class="drawer-btn" @click="isDrawerShowing = true">
          <svg class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7072" width="200" height="200"><path d="M883.2 224.5H144.3c-24.7 0-44.8-20.1-44.8-44.8s20.1-44.8 44.8-44.8h738.9c24.7 0 44.8 20.1 44.8 44.8s-20.1 44.8-44.8 44.8zM883.2 549.2H144.3c-24.7 0-44.8-20.1-44.8-44.8 0-24.7 20.1-44.8 44.8-44.8h738.9c24.7 0 44.8 20.1 44.8 44.8 0 24.7-20.1 44.8-44.8 44.8zM883.2 873.8H144.3c-24.7 0-44.8-20.1-44.8-44.8s20.1-44.8 44.8-44.8h738.9c24.7 0 44.8 20.1 44.8 44.8s-20.1 44.8-44.8 44.8z" fill="#ffffff" p-id="7073"></path></svg>
        </div>
      </div>
    </div>
  </div>

  <div class="lo-drawer-container" :style="'display: ' + (isDrawerShowing ? 'flex' : 'none')">
    <div class="lo-drawer-container__placeholder"  @click="isDrawerShowing = false"></div>
    <div class="lo-drawer">
      <div class="lo-uni-header-menu-drawer-container">
        <div class="lo-uni-header-menu-drawer">
          <div class="lo-uni-header-menu-drawer__closer">
            <svg @click="isDrawerShowing = false" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7278" width="200" height="200"><path d="M806.2 281.8L281.9 806.2c-17.5 17.5-46 17.5-63.6 0-17.5-17.5-17.5-46 0-63.6l524.3-524.3c17.5-17.5 46-17.5 63.6 0s17.6 46 0 63.5z" fill="#ffffff" p-id="7279"></path><path d="M806.2 806.2c-17.5 17.5-46 17.5-63.6 0L218.3 281.8c-17.5-17.5-17.5-46 0-63.6s46-17.5 63.6 0l524.3 524.3c17.6 17.7 17.6 46.1 0 63.7z" fill="#ffffff" p-id="7280"></path></svg>
          </div>
          <ul class="lo-uni-header-menu-drawer-menu">
            <li class="lo-uni-header-menu-drawer-menu__item" v-for="(item, index) in menus">
              <a :href="item.uri" :target="item.blank ? '_blank' : '_self'">{{ item.title }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "@/styles/drawer";

@include b("uni-header-menu-drawer-container") {
  width: 100%;
  height: 100%;
  background: white;
}

@include b("uni-header-menu-drawer") {

  @include e("closer") {
    $height: 64px;
    width: 100%;
    height: $height;
    background: #393b40;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;

    svg {
      margin-right: var(--margin-normal);
      width: calc($height / 2);
      height: calc($height / 2);
      cursor: pointer;
    }
  }
}

@include b("uni-header-menu-drawer-menu") {
  width: 100%;
  height: 100%;

  @include e("item") {
    display: block;
    font-size: 2rem;
    padding: var(--padding-giant) calc(var(--padding-giant) * 1.25);
    cursor: pointer;
    background: white;
    color: #393b40;
    border-bottom: 1px solid #eee;
  }
}
</style>

<style scoped lang="scss">
@include b("uni-header-menu-mobile") {
  $drawer-btn-width: 2rem;
  width: calc($drawer-btn-width * 1.25);
  height: calc($drawer-btn-width * 1.25);
  display: none;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .drawer-btn {
    svg {
      width: $drawer-btn-width;
      height: $drawer-btn-width;
    }
  }
}
</style>

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
  align-items: center;

  $nav-item-width: 88px;
  .indicator {
    width: calc($nav-item-width / 2);
    height: 5px;
    background: rgb(105, 224, 255);
    position: absolute;
    top: 0;
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

    @include m("item"){
      width: $nav-item-width;
      text-align: center;
      display: inline-block;
      position: relative;
      padding: var(--padding-tiny) var(--padding-normal);
      word-break: keep-all;
    }

    &--sub--active {
      opacity: 1!important;
      transition-duration: var(--transition-duration-default)!important;
    }

    @include m("sub") {
      background-color: var(--secondary-color);
      border-radius: var(--radius-normal);
      box-shadow: 0 0 4px rgba(0,0,0,.5);
      margin-top: var(--margin-lite);
      position: absolute;
      opacity: 0;
      overflow: hidden;

      li {
        padding: var(--padding-normal) var(--padding-normal);
        color: var(--default-text-color);
        text-shadow: none;
        font-size: 1rem;
        cursor: pointer;

        &:hover {
          background: var(--secondary-light-color);
        }
      }
    }
  }

}
</style>

<style scoped lang="scss">
@media screen and (max-width: 768px){
  @include b("uni-header") {
    .indicator {
      display: none;
    }
    @include e("menu") {
      display: none;
    }
  }

  @include b("uni-header-menu-mobile") {
    display: flex;
  }
}

</style>