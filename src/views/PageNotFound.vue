<script setup lang="ts">

import router from "@/router";
</script>

<template>
  <main class="lo-npe-container">
    <div class="lo-npe">
      <p class="lo-npe__title">这里什么都没有</p>
      <button class="lo-npe__button-back" @click.stop="router.push('/')">返回主页</button>
    </div>
  </main>
</template>

<style scoped lang="scss">
@include b("npe-container") {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

@include b("npe") {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @include e("title") {
    font-size: 2rem;
    color: #707070;
  }

  @include e("button-back") {
    margin: var(--margin-giant);
    border: none;
    cursor: pointer;
    padding: var(--padding-tiny) var(--padding-normal);
    border-radius: var(--radius-normal);
    background: var(--primary-color);
    color: var(--primary-text-color);
    box-shadow: 0 0 4px rgba(0, 0, 0, .2);
    transition-duration: var(--transition-duration-default);

    &:hover {
      background: var(--primary-light-color);
      box-shadow: 0 0 4px var(--primary-light-color);
      transition-duration: var(--transition-duration-default);
    }
  }
}
</style>