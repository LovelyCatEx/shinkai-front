<script setup lang="ts">
import {getCurrentInstance, Ref, ref, watchEffect} from "vue";
import {CreationService} from "@/net/service/creation-service";
import type {Result} from "@/net/result";
import {AssetsSize, Comment, Creation, CreationCharacter, CreationSection} from "@/net/object/server-vo";
import SiteFooter from "@/components/SiteFooter.vue";
import {setTitle} from "@/js/universal-utils";
import {storeToRefs} from "pinia";
import store from "@/store";
import Section from "@/components/Section.vue";
import Comments from "@/components/Comments.vue";
import {CommentService} from "@/net/service/comment-service";

const service = new CreationService()
const commentService = new CommentService()

const { proxy } = getCurrentInstance()
const creationId = proxy.$route.params.id

const creation: Ref<Creation> = ref({})
const characters: Ref<Array<CreationCharacter>> = ref([])
const sections: Ref<Array<CreationSection>> = ref([])
const comments: Ref<Array<Comment>> = ref([])

const { isShowingIndicatorAndActiveItem } = storeToRefs(store.navHeaderStore)
isShowingIndicatorAndActiveItem.value = false

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

  // Comments
  commentService.getCreationComments(creationId, {
    onSuccess(message: string, data: Result<Array<Comment>>): void {
      comments.value = data.data
    }
  })
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
  id: 0,
  cid: parseInt(creationId),
  nickname: "LovelyCat",
  email: "no-reply@lovelycatv.com",
  rates: 48,
  published: true,
  publishedTime: "",
  content: "test content"
})

function submitComment() {
  if (inputComment.value.nickname == "") {
    return
  }
  if (inputComment.value.email == "") {
    return
  }
  if (inputComment.value.content == "") {
    return
  }
  inputComment.value.rates = 48
  commentService.postNewComment(inputComment.value, {
    onSuccess(message: string, data: Result<any>): void {
      console.error(message)
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

    <Section title="人物简介">
      <template #default>
        <div class="lo-character-container">
          <div class="lo-character-card" v-for="(character, index) in characters">
            <div class="lo-character-card__feature">
              <img :src="character.avatar" :alt="character.name" />
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

    <Section :title="'评论 ' + comments.length">
      <template #default>
        <Comments :data="comments" />
      </template>
    </Section>

    <Section title="发表评论">
      <template #default>
        <div class="lo-comment-pub-container">
          <div class="lo-comment-pub">
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

  @include e("sumbit") {

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
    border-radius: 4rem;
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

  @include b("character-container") {
    grid-template-columns: 1fr;
  }
}
</style>