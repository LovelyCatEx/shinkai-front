<script setup lang="ts">
import type {Ref} from 'vue';
import {getCurrentInstance, ref, watchEffect} from "vue";
import {CreationService} from "@/net/service/creation-service";
import type {Result} from "@/net/result";
import type {CreationCharacter, CreationSection} from "@/net/object/server-vo"
import {AssetsSize, Comment, Creation, getOSSImageUrl} from "@/net/object/server-vo";
import SiteFooter from "@/components/SiteFooter.vue";
import {setTitle} from "@/js/universal-utils";
import {storeToRefs} from "pinia";
import store from "@/store";
import Section from "@/components/Section.vue";
import {CommentService} from "@/net/service/comment-service";
import Comments from "@/components/Comments.vue";

const service = new CreationService()
const commentService = new CommentService()

const { proxy } = getCurrentInstance()
const creationId = proxy.$route.params.id

const creation: Ref<Creation> = ref({})
const characters: Ref<Array<CreationCharacter>> = ref([])
const sections: Ref<Array<CreationSection>> = ref([])
const creationComments: Ref<Array<Comment>> = ref([])

const { isShowingIndicatorAndActiveItem } = storeToRefs(store.navHeaderStore)
isShowingIndicatorAndActiveItem.value = false

function refreshComments() {
  commentService.getCreationComments(creationId, {
    onSuccess(message: string, data: Result<Array<Comment>>): void {
      creationComments.value = data.data
    }
  })
}

function refreshData() {
  // Base
  service.getCreation(creationId, {
    onSuccess(message: string, data: Result<Creation>): void {
      data.data.publishedTime = data.data.publishedTime.split(" ")[0]
      creation.value = data.data
    }
  })

  // Characters
  service.getCharacters(creationId, {
    onSuccess(message: string, data: Result<Array<CreationCharacter>>): void {
      characters.value = data.data
    }
  })

  // Sections
  service.getSections(creationId, {
    onSuccess(message: string, data: Result<Array<CreationSection>>): void {
      sections.value = data.data
      console.log(sections.value)
    }
  })

  refreshComments()
}

refreshData()

// Scroll to top
scrollTo(0,0)

// Title
watchEffect(() => {
  setTitle(creation.value.name)
})

// Comment
const inputComment: Ref<Comment> = ref({
  id: null,
  cid: parseInt(creationId),
  nickname: "",
  email: "",
  rates: 0,
  published: true,
  publishedTime: "",
  content: ""
})

function setCommentRating(num: number) {
  inputComment.value.rates = num * 10
}

function submitComment() {
  if (inputComment.value.content == "") {
    alert("请输入评论内容")
    return
  }
  if (inputComment.value.nickname == "") {
    alert("请输入昵称")
    return
  }
  if (inputComment.value.email == "" || !/^[\w-\.]+@[\w-]+(\.[\w-]+)*\.[a-z]{2,}$/i.test(inputComment.value.email)) {
    alert("邮箱格式不正确")
    return
  }
  if (inputComment.value.rates == 0) {
    alert(`给《${creation.value.originName}》打个分吧~`)
    return
  }
  commentService.postNewComment(inputComment.value, {
    onSuccess(message: string, data: Result<any>): void {
      refreshComments()
    }
  })
}

</script>

<template>
  <div class="lo-details-container">
    <div class="lo-details-banner-container">
      <div class="lo-details-banner-container__background" :style="'background: url(' + Creation.getFeatureUrl(creation, AssetsSize.TINY) + ') center no-repeat; background-size: cover;'"></div>
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

    <Section title="角色介绍">
      <template #default>
        <div class="lo-character-container">
          <div class="lo-character-card" v-for="(character, index) in characters">
            <div class="lo-character-card__feature">
              <img :src="getOSSImageUrl(character.avatar, AssetsSize.MEDIUM)" :alt="character.name" />
            </div>
            <div class="lo-character-card__details-container">
              <p class="lo-character-card-details__name">{{ character.name }}</p>
              <p class="lo-character-card-details__description">{{ character.description }}</p>
            </div>
          </div>
        </div>
      </template>
    </Section>

    <Section v-for="(section, index) in sections" :title="section.title" :subtitle="section.subtitle">
      <template #default>
        <div class="lo-section-0-container">
          <div class="lo-section-0">
            <img class="lo-section-0__feature" :src="section.feature" :alt="section.title">
            <div class="lo-section-0__content-container">
              <p class="lo-section-0__content">
                {{section.content}}
              </p>
            </div>
          </div>
        </div>
      </template>
    </Section>

    <Section :title="'评论 ' + creationComments.length">
      <template #default>
        <Comments :data="creationComments" />
      </template>
    </Section>

    <Section title="发表评论">
      <template #default>
        <div class="lo-comment-pub-container">
          <div class="lo-comment-pub">
            <div class="lo-comment-pub__rating">
              <span class="lo-comment-pub__rating-tips">给《{{ creation.originName }}》打个分吧~</span>
              <div class="flex-horizontal" v-for="(item, index) in 5">
                <svg v-show="inputComment.rates / 10 < index + 1" @click="setCommentRating(index + 1)" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M512.73613 151.4l103 208.7c11.7 23.6 34.2 40 60.2 43.8l230.3 33.5-166.6 162.4c-18.9 18.4-27.5 44.9-23 70.8L755.93613 900l-206-108.3c-11.4-6-24.3-9.2-37.2-9.2-12.9 0-25.8 3.2-37.2 9.2L269.53613 900l39.3-229.4c4.5-26-4.2-52.4-23-70.8L119.23613 437.3l230.3-33.5c26.1-3.8 48.6-20.1 60.2-43.8l103-208.6M512.73613 27c-5.7 0-11.4 3-14.3 8.9l-146 295.9c-2.3 4.7-6.8 8-12 8.8L13.73613 388c-13.1 1.9-18.4 18-8.9 27.3l236.3 230.3c3.8 3.7 5.5 9 4.6 14.2L190.03613 985c-1.8 10.3 6.4 18.7 15.8 18.7 2.5 0 5-0.6 7.4-1.9l292.1-153.5c2.3-1.2 4.9-1.8 7.4-1.8s5.1 0.6 7.4 1.8l292.1 153.5c2.5 1.3 5 1.9 7.4 1.9 9.3 0 17.5-8.4 15.8-18.7l-55.8-325.2c-0.9-5.2 0.8-10.5 4.6-14.2l236.3-230.3c9.5-9.3 4.3-25.4-8.9-27.3l-326.5-47.4c-5.2-0.8-9.7-4-12-8.8l-146-295.9c-3-6-8.7-8.9-14.4-8.9z" p-id="8178" fill="#707070"></path>
                </svg>
                <svg v-show="inputComment.rates / 10 >= index + 1" @click="setCommentRating(index + 1)" viewBox="0 0 1025 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <path d="M784.16441 645.6c-3.8 3.7-5.5 9-4.6 14.2L835.36441 985c1.8 10.3-6.4 18.7-15.8 18.7-2.5 0-5-0.6-7.5-1.9L520.16441 848.3c-2.3-1.2-4.9-1.8-7.5-1.8s-5.1 0.6-7.5 1.8l-292.1 153.5c-2.5 1.3-5 1.9-7.5 1.9-9.3 0-17.5-8.4-15.8-18.7L245.66441 659.8c0.9-5.2-0.8-10.5-4.6-14.2L4.86441 415.3C-4.63559 406 0.56441 389.9 13.66441 388l326.5-47.5c5.2-0.8 9.7-4 12-8.8l146-295.9c2.9-5.9 8.6-8.9 14.3-8.9s11.4 3 14.3 8.9l146 295.9c2.3 4.7 6.8 8 12 8.8L1011.66441 388c13.1 1.9 18.4 18 8.9 27.3L784.16441 645.6z" p-id="8820" fill="#f2cb51"></path>
                </svg>
              </div>
              <span class="lo-comment-pub__rating-num">{{ inputComment.rates / 10 }}</span>
            </div>
            <textarea class="lo-comment-pub__content input-base" placeholder="你猜我的评论区在等谁?" v-model="inputComment.content" />
            <div class="flex-horizontal">
              <input class="input-base" placeholder="昵称" v-model="inputComment.nickname" />
              <div style="margin: 0 var(--margin-normal)"></div>
              <input class="input-base" placeholder="邮箱" v-model="inputComment.email" />
            </div>
            <button class="comment-submit-btn" @click="submitComment()">发表评论</button>
          </div>
        </div>
      </template>
    </Section>

    <div style="margin: calc(var(--margin-giant) * 4) 0"></div>

    <SiteFooter />

  </div>
</template>

<!--Comment-->
<style scoped lang="scss">
.input-base {
  width: 100%;
  border-radius: var(--radius-normal);
  border: 0;
  box-shadow: 0 1px 3px rgba(50,50,93,.15), 0 1px 0 rgba(0,0,0,.02);
  font-weight: 400;
  line-height: 1.5;
  background: var(--secondary-light-color);
  padding: var(--padding-normal);
}

.comment-submit-btn {
  width: 8rem;
  background: var(--primary-color);
  border: none;
  padding: var(--padding-lite) var(--padding-normal);
  color: white;
  border-radius: var(--radius-normal);
  margin-top: var(--margin-normal);
  align-self: end;
  cursor: pointer;

  &:hover {
    background: var(--primary-light-color);
  }
}

@include b("comment-pub-container") {
  width: 100%;
  max-width: 1400px;
  padding: 2rem;
}

@include b("comment-pub") {
  display: flex;
  flex-direction: column;

  @include e("content") {
    transition: height 0.15s ease, box-shadow 0.3s ease;
    overflow: hidden;
    min-height: 80px;
    resize: none;
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-bottom: 18px;
    margin-top: 20px;
  }

  @include e("rating") {
    display: flex;
    align-items: center;

    svg {
      width: 1.25rem;
      height: 1.25rem;
    }
  }

  @include e("rating-num") {
    margin-left: var(--margin-lite);
    margin-top: .1rem;
    font-size: 1.2rem;
  }

  @include e("rating-tips") {
    margin-right: var(--margin-lite);
    margin-top: .1rem;
    font-size: 1.2rem;
  }
}
</style>

<style scoped lang="scss">
@include b("section-0-container") {
  max-width: 1400px;
  padding: 0 var(--padding-giant);
}

@include b("section-0") {
  display: grid;
  grid-template-columns: 1fr 3fr;
  box-shadow: 0 0 32px rgba(0,0,0,.1);
  border-radius: var(--radius-normal);
  overflow: hidden;

  &:hover {
    box-shadow: 0 0 32px rgba(0,0,0,.2);
  }

  @include e("feature") {
    width: 32rem;
    height: 18rem;
    object-fit: cover;
    justify-self: center;
  }

  @include e("content-container") {
    height: 100%;
    display: flex;
    padding: var(--padding-large) var(--padding-giant);
  }

  @include e("content") {
    $font-size: 1.5rem;
    font-size: $font-size;
    align-self: center;
    line-height: calc($font-size * 1.5);
  }
}

$feature-width: 48rem;
$feature-height: 27rem;
$media-width-arr: 300px, 500px, 680px, 900px, 1200px;
$media-scale-arr: 0.6, 0.7, 0.8, 0.9, 1.2;

@mixin section-0-grid-flexible($i) {
  @include b("section-0") {
    width: calc($feature-width * nth($media-scale-arr, $i));
    grid-template-columns: 1fr!important;

    @include e("feature") {
      width: calc($feature-width * nth($media-scale-arr, $i));
      height: calc($feature-height * nth($media-scale-arr, $i));
      object-fit: cover;
      justify-self: center;
    }
  }
}

@media screen and (max-width: 300px) {
  @include section-0-grid-flexible(1);
}

@media screen and (min-width: 300px) and (max-width: 500px) {
  @include section-0-grid-flexible(2);
}

@media screen and (min-width: 500px) and (max-width: 680px) {
  @include section-0-grid-flexible(3);
}

@media screen and (min-width: 680px) and (max-width: 900px){
  @include section-0-grid-flexible(4);
}

@media screen and (min-width: 900px) and (max-width: 1200px){
  @include section-0-grid-flexible(5);
}

</style>



<style scoped lang="scss">
@include b("character-container") {
  max-width: 1400px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  padding: 0 2rem;
}

@include b("character-card") {
  display: flex;
  align-items: center;
  background: var(--secondary-light-color);
  padding: var(--padding-normal) var(--padding-giant);
  border-radius: var(--radius-normal);
  box-shadow: 0 0 16px rgba(0,0,0,.1);

  &:hover {
    box-shadow: 0 0 16px rgba(0,0,0,.2);
  }

  @include e("feature") {
    width: 8rem;
    height: 8rem;
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
    box-shadow:  0 0 8px rgba(0,0,0,.15);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  @include e("details-container") {
    padding: var(--padding-normal) 0 var(--padding-normal) var(--padding-giant);
  }

}

@include b("character-card-details") {

  @include e("name") {
    font-size: 1.5rem;
  }

  @include e("description") {
    font-size: 1.2rem;
    margin-top: var(--margin-lite);
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
  overflow: hidden;

  @include e("background") {
    width: 100%;
    height: 100vh;
    transform: scale(1.25);
    filter: blur(64px);
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
      margin: var(--margin-lite) 0;
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
@media screen and (max-width: 420px) {
  // Details
  @include b("details-banner") {
    grid-template-columns: 1fr;
    padding: 0 var(--padding-giant);

    @include e("feature") {
      width: calc(24rem * 0.6);
      height: calc(32rem * 0.6);
    }
  }

  @include b("character-container") {
    grid-template-columns: 1fr;
  }

  // Character card
  @include b("character-card") {
    padding: var(--padding-lite) var(--padding-normal);

    @include e("feature") {
      width: 6rem;
      height: 6rem;
    }

    @include e("details-container") {
      padding: var(--padding-tiny) 0 var(--padding-tiny) var(--padding-normal);
    }

  }
}

@media screen and (min-width: 420px) and (max-width: 768px) {
  // Details
  @include b("details-banner") {
    grid-template-columns: 1fr;
    padding: 0 var(--padding-giant);

    @include e("feature") {
      width: calc(24rem * 0.8);
      height: calc(32rem * 0.8);
    }
  }

  @include b("character-container") {
    grid-template-columns: 1fr;
  }

  // Character card
  @include b("character-card") {
    @include e("feature") {
      width: 7rem;
      height: 7rem;
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 1200px) {
  @include b("details-banner") {
    grid-template-columns: 1fr;
    padding: 0 var(--padding-giant);

    @include e("feature") {
      width: 24rem;
      height: 32rem;
    }
  }

  @include b("character-container") {
    grid-template-columns: 1fr;
  }
}
</style>