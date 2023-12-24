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
              <svg t="1703423752804" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="7072" width="200" height="200"><path d="M722 927.3c-14.8 0-29.6-3.6-43.3-10.8l-162-85.2c-2.3-1.2-5.1-1.2-7.4 0l-162 85.2c-31.6 16.6-69.1 13.9-97.9-7.1-28.8-21-43-55.8-36.9-90.9l30.9-180.4c0.5-2.6-0.4-5.2-2.3-7L110 503.3c-25.5-24.9-34.5-61.4-23.5-95.3s39.8-58.2 75-63.3l181.2-26.3c2.6-0.4 4.8-2 5.9-4.3l81-164.1c15.8-32 47.7-51.8 83.4-51.8 35.6 0 67.6 19.9 83.3 51.8l81 164.1c1.2 2.3 3.4 4 6 4.3l181.1 26.3c35.3 5.1 64 29.4 75 63.3s2 70.4-23.5 95.3l-131 127.8c-1.9 1.8-2.7 4.4-2.3 7l30.9 180.4c6 35.1-8.2 70-37 90.9-16.2 11.8-35.3 17.9-54.5 17.9z m-209-182c14.9 0 29.7 3.6 43.3 10.7l162 85.2c1.1 0.6 4.3 2.3 8.3-0.6 2.6-1.9 3.7-4.5 3.1-7.7l-30.9-180.4c-5.2-30.2 4.8-60.9 26.7-82.3l131.1-127.8c2.3-2.3 3-5 2-8.1-1.5-4.7-5.2-5.2-6.4-5.4l-181.1-26.3c-30.3-4.4-56.5-23.4-70-50.9l-81-164.1c-0.5-1.1-2.2-4.4-7.1-4.4-4.9 0-6.6 3.3-7.1 4.4l-81 164.1c-13.5 27.4-39.7 46.5-70 50.8l-181.2 26.3c-3.2 0.5-5.4 2.3-6.4 5.4-1.5 4.7 1.1 7.2 2 8.1l131.1 127.8c21.9 21.4 31.9 52.1 26.7 82.3l-30.9 180.4c-0.2 1.2-0.9 4.8 3.1 7.7 2.6 1.9 5.4 2.1 8.3 0.6l162-85.2c13.7-7 28.5-10.6 43.4-10.6z" fill="#707070" p-id="7073"></path></svg>
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