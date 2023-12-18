<script setup lang="ts">

const props = defineProps<{
  absolutePos: boolean
}>()

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
    uri: 'creations',
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

</script>

<template>
  <div class="lo-uni-header-wrapper" :style="'position: ' + (absolutePos ? 'absolute' : 'static')">
    <div class="lo-uni-header">
      <ul class="lo-uni-header__menu">
        <li>
          <a>
            Logo
          </a>
        </li>
        <li v-for="(menu, index) in menus">
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
$nav-height: 64px;

@include b("uni-header-wrapper") {
  width: 100vw;
  height: $nav-height;
  z-index: 999;
  color: white;
}

@include b("uni-header") {
  width: 100%;
  height: 100%;
  padding: 0 var(--padding-giant);

  @include e("menu") {
    height: $nav-height;
    display: flex;
    align-items: center;
    font-size: .9rem;


    li {
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