<script setup lang="ts">

import type {Comment} from "@/net/object/server-vo";

const props = defineProps<{
  data: Array<Comment>
}>()

</script>

<template>
  <div class="lo-comments-view-container">
    <p class="lo-comments-view-container__empty" v-show="props.data.length == 0">还没有人发表过评论...</p>
    <div class="lo-comment-container" v-for="(comment, index) in props.data">
      <div class="lo-comment-container__left">
        <div class="comment-avatar">
          <img src="@/assets/akarin.webp" :alt="comment.nickname" />
        </div>
      </div>

      <div class="lo-comment-container__right">
        <div class="lo-comment-content">
          <div class="flex-horizontal">
            <div class="lo-comment-content__element--name">{{ comment.nickname }}</div>
            <div class="lo-comment-content__element--rates">
              <svg viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" v-for="(item, index) in Math.round(comment.rates / 10)">
                <path d="M784.16441 645.6c-3.8 3.7-5.5 9-4.6 14.2L835.36441 985c1.8 10.3-6.4 18.7-15.8 18.7-2.5 0-5-0.6-7.5-1.9L520.16441 848.3c-2.3-1.2-4.9-1.8-7.5-1.8s-5.1 0.6-7.5 1.8l-292.1 153.5c-2.5 1.3-5 1.9-7.5 1.9-9.3 0-17.5-8.4-15.8-18.7L245.66441 659.8c0.9-5.2-0.8-10.5-4.6-14.2L4.86441 415.3C-4.63559 406 0.56441 389.9 13.66441 388l326.5-47.5c5.2-0.8 9.7-4 12-8.8l146-295.9c2.9-5.9 8.6-8.9 14.3-8.9s11.4 3 14.3 8.9l146 295.9c2.3 4.7 6.8 8 12 8.8L1011.66441 388c13.1 1.9 18.4 18 8.9 27.3L784.16441 645.6z" p-id="8820" fill="#f2cb51"></path>
              </svg>
              {{ comment.rates / 10 }}
            </div>
            <div class="flex-grow-1"></div>
            <div class="lo-comment-content__element--published-time">{{ comment.publishedTime }}</div>
          </div>
          <div style="margin-top: var(--margin-normal)"></div>
          <div class="lo-comment-content__element--content">{{ comment.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.comment-avatar {
  $avatar-width: 6rem;
  width: $avatar-width;
  height: $avatar-width;
  border-radius: calc($avatar-width / 2);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@include b("comments-view-container") {
  width: 100%;
  padding: 2rem;
  max-width: 1400px;

  @include e("empty") {
    width: 100%;
    text-align: center;
    font-size: 2rem;
  }
}

@include b("comment-container") {
  width: 100%;
  display: flex;
  background-color: var(--secondary-light-color);
  padding: var(--padding-giant);
  border-radius: var(--radius-normal);
  box-shadow: 0 0 16px rgba(0,0,0,.1);
  margin-bottom: var(--margin-giant);

  &:hover {
    box-shadow: 0 0 16px rgba(0,0,0,.18);
  }

  @include e("left") {
    flex-shrink: 0;
  }

  @include e("right") {
    flex-grow: 1;
    margin: 0 var(--margin-giant);
  }
}

@include b("comment-content") {
  @include e("element") {
    @include m("name") {
      font-size: 1.1rem;
    }

    @include m("rates") {
      margin-left: var(--margin-lite);
      font-size: 1.1rem;
      display: flex;
      align-items: center;

      svg {
        width: 1.2rem;
        height: 1.2rem;
        margin-top: -.2rem;
        margin-right: .2rem;
      }
    }

    @include m("published-time") {
      font-size: 1rem;
    }

    @include m("content") {
      font-size: 1.25rem;
    }

  }
}


</style>