<script setup lang="ts">

import VerticalScrollBanner from "@/components/VerticalScrollBanner.vue";

let fullBlockScrollData = {
  backgroundImages: [
      '/src/assets/suzume/suzume-feature.jpg',
      '/src/assets/suzume/suzume-kanameishi.png',
      '/src/assets/suzume/suzume-ushirodoru.png',
      '/src/assets/suzume/suzume-nimizu.png'
  ],
  asideData: ['铃芽之旅', '要石' ,'往门', '蚓厄'],
  showAside: true,
  isMobile: false
};

</script>

<template>
  <main class="lo-home-container">
    <VerticalScrollBanner name="abc" :component-data="fullBlockScrollData">
      <template v-slot:slot0>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main">
            <p class="lo-banner-main__title">铃芽之旅</p>
            <img class="divider" src="@/assets/universal/divider.png" alt="" />
            <p class="lo-banner-main__subtitle">
              门的另一边，有着所有的时间——
            </p>
            <p class="lo-banner-main__description">
              铃芽是一位生活在九州的一个宁静小镇上的17岁少女，某天她遇到了“正在找门”的旅行青年草太。跟随着他的脚步，铃芽来到了山上的废墟之地，她发现有一扇古老的门孤零零地伫立在那。铃芽仿佛被什么吸引了一般，将手伸向了那扇门……
            </p>
          </div>
          <div class="lo-banner-author">
            <p class="lo-banner-author__name">新海诚（Makoto Shinkai）</p>
            <p class="lo-banner-author__description">原名新津诚（Makoto Niitsu），1973年2月9日出生于日本长野县南佐久郡小海町，日本动画导演、编剧、漫画作家，毕业于日本长野县野泽北高等学校、日本中央大学文学部日本文学系。</p>
          </div>
        </section>
      </template>

      <template v-slot:slot1>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main banner-negative-top">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/kanameishi.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">要石</h1>
            <p class="lo-banner-main__description">
              要石，是封印土地主人、防范灾难发生的角色，其位置会随着时代与日本土地的变迁而改变，可透过交接的方式转移给被选定者。若是“要石”被拔出来，将会导致封印被解开。
            </p>
          </div>
        </section>
      </template>

      <template v-slot:slot2>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main banner-negative-top">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/ushirodoru.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">往门</h1>
            <p class="lo-banner-main__description">
              往门，是连结往生者世界“常世”与人类所处的“现世”的门扉，平常依赖人们心中的重量和思绪镇定土地和门。若是人心的重量消失，等于从人们的记忆中消失或思绪减少，将会导致后门被打开。一个人一生中最多只能通过一道后门。
            </p>
          </div>
        </section>
      </template>

      <template v-slot:slot3>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main banner-negative-top">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/nimizu.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">蚓厄</h1>
            <p class="lo-banner-main__description">
              古代日本人认为日本群岛地下有长长的、巨大的生物运动，引发了地震。到300年前的江户时代，人们都认为那是一条鲶鱼
            </p>
          </div>
        </section>
      </template>
    </VerticalScrollBanner>
  </main>
</template>

<style lang="scss" scoped>
.banner-negative-top {
  margin-top: -15%;
}

@include b("home-container") {
  width: 100%;
  height: 100%;
}

@include b("banner-wrapper") {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: brightness(95%);
}

$banner-font-size-title: 4.5rem;
$banner-font-size-in-divider-title: 3.8rem;
$banner-font-size-subtitle: 1.8rem;
$banner-font-size-normal: 1.2rem;

@mixin description-text {
  text-shadow: 0 0 8px var(--shadow-normal), 0 0 4px var(--shadow-normal);
  line-height: 1.5;
  word-break: break-all;
  white-space: pre-wrap;
  padding: 0 4rem;
  max-width: 800px;
}

@include b("banner-main") {
  width: 100%;
  color: white;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .divider {
    margin: var(--margin-giant) 0;
  }

  @include e("title") {
    font-size: $banner-font-size-title;
    text-shadow: 0 0 12px var(--shadow-normal), 0 0 4px var(--shadow-normal);

    @include m("in-divider") {
      $in-divider-font-size: $banner-font-size-in-divider-title;
      position: relative;
      font-size: $in-divider-font-size;
      text-shadow: 0 0 12px var(--shadow-normal), 0 0 4px var(--shadow-normal);
      margin: var(--margin-giant) 0 calc(var(--margin-giant) * 2) 0;

      $in-divider-width: 36vh;
      &::before {
        content: '';
        width: $in-divider-width;
        height: 1.3vh;
        position: absolute;
        left: 0;
        background: url("src/assets/universal/divider-before.png") center no-repeat;
        transform: translate(-$in-divider-width * 1.05, calc($in-divider-font-size / 2));
        background-size: cover;
      }

      &::after {
        content: '';
        width: $in-divider-width;
        height: 1.3vh;
        position: absolute;
        right: 0;
        background: url("src/assets/universal/divider-before.png") center no-repeat;
        transform: translate($in-divider-width * 1.05, calc($in-divider-font-size / 2)) rotateY(180deg);
        background-size: cover;
      }
    }
  }

  @include e("subtitle") {
    font-size: $banner-font-size-subtitle;
    text-shadow: 0 0 8px var(--shadow-normal), 0 0 4px var(--shadow-normal);
  }

  @include e("description") {
    margin-top: var(--margin-giant);
    font-size: $banner-font-size-normal;
    @include description-text;
  }

  @include e("icon") {
    width: 154px;
    height: 154px;
  }
}

@include b("banner-author") {
  color: white;
  margin-top: calc(var(--margin-giant) * 2);
  position: absolute;
  z-index: 999;
  bottom: 10%;
  text-align: center;

  @include e("name") {
    font-size: $banner-font-size-subtitle;
    margin-bottom: var(--margin-lite);
  }

  @include e("description") {
    font-size: $banner-font-size-normal;
  }

  p {
    @include description-text;
  }
}
</style>