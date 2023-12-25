<script setup lang="ts">
import {computed, ref, watchEffect, watch} from "vue";
// Hide Scroll Bar

document.getElementsByTagName("body")[0].style.overflow = "hidden";

// Data
export interface FullBlockScrollData {
  backgroundImages: string[],
  asideData: string[],
  showAside: boolean,
  isMobile: boolean
}

const props = defineProps<{
  name: string,
  componentData: FullBlockScrollData,
}>()

const emits = defineEmits(['scroll-event'])

// ELEMENT
const element = ref('element')

watchEffect(() => {
  if ((element.value as HTMLElement).style) {
    (element.value as HTMLElement).style.transform = transformScroll.value
  }
})

//HEIGHT
const { height } = useWindowSize()
import { useWindowSize } from '@vueuse/core'
const windowHeight = computed(() => {
  isCloseTransition.value = true
  return height.value
})
const transformScroll = computed(() => {
  return `translateY(-${$index.value * windowHeight.value}px)`
})

const isCloseTransition = ref(false)
const canRun = ref(true)
function mousewheel(e: WheelEvent) {
  isCloseTransition.value = false
  if (canRun.value) {
    canRun.value = false
    goScroll(e)
    setTimeout(() => {
      canRun.value = true
    }, 1000)
  }
}

function goScroll(e: WheelEvent) {
  if (e.wheelDelta < 0) {
    next()
  } else {
    last()
  }
}

// Record the current index of block
const $index = ref(0)

watch($index, () => {
  emits('scroll-event', $index.value)
})
emits('scroll-event', $index.value)

function next() {
  if ($index.value < props.componentData.backgroundImages.length - 1) {
    $index.value++
  }
}

function last() {
  if ($index.value > 1 || $index.value === 1) {
    $index.value--
  }
}

function changeBac(index: number) {
  isCloseTransition.value = false
  $index.value = index
}

// #region 移动端
const startY = ref(0) //记录开始位置
const endY = ref(0) //记录结束位置
const moveDistance = ref(0) //滑动距离

function handleTouchStart(e: TouchEvent) {
  startY.value = e.touches[0].pageY || e.changedTouches[0].pageY
}

function handleTouchEnd(e: TouchEvent) {
  isCloseTransition.value = false

  endY.value = e.changedTouches[0].pageY || e.touches[0].pageY
  moveDistance.value = endY.value - startY.value
  if (Math.abs(moveDistance.value) >= 60) {
    if ($index.value < props.componentData.backgroundImages.length - 1 && moveDistance.value < 0) {
      $index.value++
    }
    if ($index.value > 0 && moveDistance.value > 0) {
      $index.value--
    }
  } else {
    (element.value as HTMLElement).style.transform = `translateY(-${$index.value * windowHeight.value}px)`
  }
}

function handleTouchMove(e: TouchEvent) {
  e.preventDefault()
  isCloseTransition.value = true
  moveDistance.value = (e.changedTouches[0].pageY || e.touches[0].pageY) - startY.value

  const isCriticalPoint =
      ($index.value === props.componentData.backgroundImages.length - 1 && moveDistance.value < 0) || ($index.value === 0 && moveDistance.value > 0)

  if (isCriticalPoint) {
    return
  }

  (element.value as HTMLElement).style.transform = `translateY(-${$index.value * windowHeight.value + moveDistance.value * -1}px)`
}

//#endregion

</script>

<template>
  <div class="outer-box" ref="fullPage">
    <div
        ref="element"
        :class="{ activeTransition: isCloseTransition }"
        class="inner-box"
        @mousewheel.prevent.stop="mousewheel"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        @touchmove="handleTouchMove"
    >
      <div
          v-for="(item, index) in componentData.backgroundImages"
          :style="{ backgroundImage: `url(${item})`, height: windowHeight + 'px' }"
          class="scroll-element"
      >
        <slot :name="'slot' + index" />
      </div>
    </div>
    <ul class="lo-aside-guide" :style="{ display: componentData.showAside ? (componentData.isMobile ? 'none' :'block') : 'none', transform: `translateX(${$index === 0 ? 300 : 0}%) translateY(-50%)` }">
      <div class="lo-aside-guide__line"></div>
      <li v-for="(item, index) in componentData.asideData" @click="changeBac(index)" :class="{ 'lo-aside-guide__item--active': index === $index }" class="lo-aside-guide__item">
        <span :class="{ active: index === $index }"></span>
        <div :class="{'show-dec--active': index === $index}" class="show-dec">{{ item }}</div>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.activeTransition {
  transition: all 0ms ease 0s !important;
}

.active {
  display: inline-block;
  width: 6px !important;
  height: 6px !important;
}

.outer-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  position: absolute;

  .inner-box {
    width: 100%;
    transition: all ease-in-out 0.5s;
    .scroll-element {
      background-size: cover !important;
      background-position: center;
      background-repeat: no-repeat;
      position: relative;
    }
  }

  @include b("aside-guide") {
    $margin-li: 28px;
    transition: all ease-in-out .5s;
    list-style: none;
    position: fixed;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);

    @include e("line") {
      $width: 2px;
      width: $width;
      height: 256px;
      background: rgba(255,255,255,.2);
      position: absolute;
      transform: translateY(-48px);
      right: calc($margin-li + $width);
    }

    @include e("item") {
      cursor: pointer;
      height: 6px;
      width: 6px;
      margin: $margin-li;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      .show-dec {
        display: inline-block;
        text-align: right;
        position: absolute;
        width: 72px;
        right: 24px;
        padding: 4px;
        // opacity: 0;
        color: white;
        transition: all linear 0.1s;
        font-size: 12px;
      }

      .show-dec--active {
        color: black;
        background-color: #fff;
      }

      span {
        width: 6px;
        height: 6px;
        transform: rotate(45deg);
        display: inline-block;
        background-color: #fff;
        transition: all ease-in-out 0.2s;
      }

      &:hover span {
        width: 6px;
        height: 6px;
        background-color: #fff;
        cursor: pointer;
      }

      @include m("active") {
        &::before {
          content: '';
          position: absolute;
          display: block;
          width: 18px;
          height: 18px;
          background: rgba(0,0,0,.25);
          transform: rotate(45deg);
          border: 1px solid white;
          animation: fade-in var(--transition-duration-default) linear;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
@media screen and (max-width: 1024px) {
  @include b("aside-guide") {
    opacity: 0!important;
  }
}
</style>