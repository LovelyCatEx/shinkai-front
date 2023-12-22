<script setup lang="ts">

import VerticalScrollBanner from "@/components/VerticalScrollBanner.vue";
import store from "@/store";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import {setTitle} from "@/js/universal-utils";

const {isBackground, isBackgroundBlur} = storeToRefs(store.navHeaderStore)

let scrollData = {
  backgroundImages: [
      'https://oss.lovelycatv.cn/assets-oss-v1/suzume/8ZwsrEf3sNOvl1.jpg',
      'https://oss.lovelycatv.cn/assets-oss-v1/suzume/Pz5gUx0pBZPsgqHb1-medium.png',
      'https://oss.lovelycatv.cn/assets-oss-v1/suzume/U025xfDvYqkrWDLBS-medium.png',
      'https://oss.lovelycatv.cn/assets-oss-v1/suzume/OGYqHAmksXTG9-medium.png'
  ],
  asideData: ['铃芽之旅', '要石' ,'往门', '蚓厄'],
  showAside: true,
  isMobile: false
};

const scrollEvent = (newIndex) => {
  isBackground.value = newIndex != 0
  isBackgroundBlur.value = newIndex != 0
}

// Title
setTitle("")
</script>

<template>
  <main class="lo-home-container">
    <VerticalScrollBanner name="abc" :component-data="scrollData" @scroll-event="scrollEvent">
      <template v-slot:slot0>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main">
            <p class="lo-banner-main__title">铃芽之旅</p>
            <img class="divider" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjsAAAASCAYAAAC96h+MAAAEkUlEQVR4nO2dS4wUVRSGvypngBAnRAY0AVHCKBNBZeFWEhLiQoImGjcmGkQFjUYhkaV7Vy6MLxSBGBYuJCG+xoSNj+jWBBIniGhUHgbUsABkEKbLxbmdLu7cqq6qrmpCz/8lnalz7rm3Tz3n1LmPjpIkQQghGmIFcBH4M8dmCXAjcLQvHgkhZh3xtXZACDGwjAJbgc3AUIbNHGAT8LSzF0KI2lGwI4RogqXADuAm4HZgCzMDniEsyFnu7Ha4ekIIUSuRurGEEDWzGsvozAPOYV1UEXAI2AVcBoaxAGgNkADngRFgCngf+LHvXgshBhYFO0KIuoiBjcAGLLg5BbwBjANPufIvgK+AF7DxPAmwDwtutmHjdxJgAvgcaPVzB4QQg4mCHSFEHYxiAc1KJx8G9gL/OnkN1kX1E/AssBC4AuwGfnA287HxPfc6+WfXxj/Nui6EGHQU7AgheiEC7gcew7qtWsBnwJdYhiZttx54FLgB697aCRwLtPcg8BCWCZoC9gPfee0JIURhFOwIIaqyDHgcGHPyGSxT85tndwvwJHCnk38H3gXuBu4DPgJOe3WWA88Ai538q7M7XpfzQojZQ5QkyQLsbQrvr7+d1sWefVqOM/R5n252cRe7OKfNUFnIz27+5dkWaSNUp4gudE7Ss+iigJy28dtI//XLq9j75Vn1QnJoNqBvk6XL03cr8+3K2MLMjEVSoo1QW+02/LLrhRZwEBtjc9npImz8zTos8xNj+3gQ+AQLfLY7uyvA98C3wEk6x2IYy/A8QD3HpNc3u1B9/9yX/Y4qPrXrZH2v32boui3jR9Z+F5Gz2s3yN287VFZG7/sUsvV1WTJ0xpOFbLLqFi1rl7cK2BX5tNsqap/1vWl93na3fWkx068qx8rXh+wAkjhVWJXQQ6ipG75Mu91utlBZkRszJOc9iP0bpJtPRaj7wVQnZf4pZfla9bxUpcz1lxAORHvxp8nz0Q9aWHfTdEqXYDOsztEJgMDG30TAPSndtLO7yNXHYtrprsUg5aLnpJ+BaejeqOpHmWsufa3n+dAUvT6/2vZFj1Fe+92e9Vm66/0eT5PkbFfdz6oBeeFrQ91YQoiqjGHdWMuc/AfwIXDCs1sIPIEFLp/SWVsHbBbWPuCsV+dWbLHB25x8HOvG+qU274UQswYFO0KIXoiwrqpHgLlYNmbCffyMzArgeWAB1nX1MfANV7+NxdjU9Q3YQOZLwAHgawbr7VgI0UcU7Agh6mARlolpTz2fBPZg3VNga+28iAVEZ7GZWHdgv5nVXkBwBMv6rHLyUSxT9HfDvgshBhwFO0KIuoiwjMxGLENzBngTuBnL6AxjM7XeBtYCD2MZng+wgckvY7OvWthg5wmUzRFC1ICCHSFE3awEnsN+JuICls0ZAo4A72BdU/OwVZTHsYBnytmfB95Dv4AuhKgRBTtCiCZYDLyErbEDtnLyW8B/KZs5WDanvf7OaSwT9FeffBRCzBIU7AghmmIEeAXrvnoNy9r4zAdexYKg1+mM8RFCiNpQsCOEaJJRLLszmWNzFza+R7+BJYRohP8BTD15sibeHVwAAAAASUVORK5CYII="  alt=""/>
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
          <div class="lo-banner-main">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/kanameishi.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">要石</h1>
            <p class="lo-banner-main__description">
              要石，是封印土地主人、防范灾难发生的角色，其位置会随着时代与日本土地的变迁而改变，可透过交接的方式转移给被选定者。若是“要石”被拔出来，将会导致封印被解开。
            </p>
            <button class="lo-banner-main__btn-details">
              <p>查看详情</p>
            </button>
          </div>
        </section>
      </template>

      <template v-slot:slot2>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/ushirodoru.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">往门</h1>
            <p class="lo-banner-main__description">
              往门，是连结往生者世界“常世”与人类所处的“现世”的门扉，平常依赖人们心中的重量和思绪镇定土地和门。若是人心的重量消失，等于从人们的记忆中消失或思绪减少，将会导致后门被打开。一个人一生中最多只能通过一道后门。
            </p>
            <button class="lo-banner-main__btn-details">
              <p>查看详情</p>
            </button>
          </div>
        </section>
      </template>

      <template v-slot:slot3>
        <section class="lo-banner-wrapper">
          <div class="lo-banner-main">
            <img class="lo-banner-main__icon" src="../assets/suzume/icon/nimizu.png" alt="" />
            <h1 class="lo-banner-main__title--in-divider">蚓厄</h1>
            <p class="lo-banner-main__description">
              古代日本人认为日本群岛地下有长长的、巨大的生物运动，引发了地震。到300年前的江户时代，人们都认为那是一条鲶鱼。
            </p>
            <button class="lo-banner-main__btn-details">
              <p>查看详情</p>
            </button>
          </div>
        </section>
      </template>
    </VerticalScrollBanner>
  </main>
</template>

<style lang="scss" scoped>
$base64-divider-full: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAjsAAAASCAYAAAC96h+MAAAEkUlEQVR4nO2dS4wUVRSGvypngBAnRAY0AVHCKBNBZeFWEhLiQoImGjcmGkQFjUYhkaV7Vy6MLxSBGBYuJCG+xoSNj+jWBBIniGhUHgbUsABkEKbLxbmdLu7cqq6qrmpCz/8lnalz7rm3Tz3n1LmPjpIkQQghGmIFcBH4M8dmCXAjcLQvHgkhZh3xtXZACDGwjAJbgc3AUIbNHGAT8LSzF0KI2lGwI4RogqXADuAm4HZgCzMDniEsyFnu7Ha4ekIIUSuRurGEEDWzGsvozAPOYV1UEXAI2AVcBoaxAGgNkADngRFgCngf+LHvXgshBhYFO0KIuoiBjcAGLLg5BbwBjANPufIvgK+AF7DxPAmwDwtutmHjdxJgAvgcaPVzB4QQg4mCHSFEHYxiAc1KJx8G9gL/OnkN1kX1E/AssBC4AuwGfnA287HxPfc6+WfXxj/Nui6EGHQU7AgheiEC7gcew7qtWsBnwJdYhiZttx54FLgB697aCRwLtPcg8BCWCZoC9gPfee0JIURhFOwIIaqyDHgcGHPyGSxT85tndwvwJHCnk38H3gXuBu4DPgJOe3WWA88Ai538q7M7XpfzQojZQ5QkyQLsbQrvr7+d1sWefVqOM/R5n252cRe7OKfNUFnIz27+5dkWaSNUp4gudE7Ss+iigJy28dtI//XLq9j75Vn1QnJoNqBvk6XL03cr8+3K2MLMjEVSoo1QW+02/LLrhRZwEBtjc9npImz8zTos8xNj+3gQ+AQLfLY7uyvA98C3wEk6x2IYy/A8QD3HpNc3u1B9/9yX/Y4qPrXrZH2v32boui3jR9Z+F5Gz2s3yN287VFZG7/sUsvV1WTJ0xpOFbLLqFi1rl7cK2BX5tNsqap/1vWl93na3fWkx068qx8rXh+wAkjhVWJXQQ6ipG75Mu91utlBZkRszJOc9iP0bpJtPRaj7wVQnZf4pZfla9bxUpcz1lxAORHvxp8nz0Q9aWHfTdEqXYDOsztEJgMDG30TAPSndtLO7yNXHYtrprsUg5aLnpJ+BaejeqOpHmWsufa3n+dAUvT6/2vZFj1Fe+92e9Vm66/0eT5PkbFfdz6oBeeFrQ91YQoiqjGHdWMuc/AfwIXDCs1sIPIEFLp/SWVsHbBbWPuCsV+dWbLHB25x8HOvG+qU274UQswYFO0KIXoiwrqpHgLlYNmbCffyMzArgeWAB1nX1MfANV7+NxdjU9Q3YQOZLwAHgawbr7VgI0UcU7Agh6mARlolpTz2fBPZg3VNga+28iAVEZ7GZWHdgv5nVXkBwBMv6rHLyUSxT9HfDvgshBhwFO0KIuoiwjMxGLENzBngTuBnL6AxjM7XeBtYCD2MZng+wgckvY7OvWthg5wmUzRFC1ICCHSFE3awEnsN+JuICls0ZAo4A72BdU/OwVZTHsYBnytmfB95Dv4AuhKgRBTtCiCZYDLyErbEDtnLyW8B/KZs5WDanvf7OaSwT9FeffBRCzBIU7AghmmIEeAXrvnoNy9r4zAdexYKg1+mM8RFCiNpQsCOEaJJRLLszmWNzFza+R7+BJYRohP8BTD15sibeHVwAAAAASUVORK5CYII=';
$base64-divider: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUIAAAAOCAYAAABaQBU/AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjU0RjVENjE0MkJBMzExRUE5N0RBQTE1QTRBMDcyODJCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjU0RjVENjE1MkJBMzExRUE5N0RBQTE1QTRBMDcyODJCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NTRGNUQ2MTIyQkEzMTFFQTk3REFBMTVBNEEwNzI4MkIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NTRGNUQ2MTMyQkEzMTFFQTk3REFBMTVBNEEwNzI4MkIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kba4rAAACJUlEQVR42uybzStEURjGz3uNhYWPFNkoK6FsiIQ0Vij+Bf+eLTa+xUJCkiTsLFBYiOQ74znNOzl0Z+65DJnr+dUv7pz33HvnZp7Oh5FMJmMIISSBlMFOuBlVmOKzIoQkEIFDsBWWw7WCxRwREkJKlEp4D19CRoIjsAVmNBQP4Dx8ZhASQpIy5e2AXXAV7jttFXAMNoaMEC/gJLxhEBJCSpkmOABrnHCb0LYGOAqr9PgKzsB+7Wd5hCtw73MQSgnO/X+zv3yzRorUR754XvH4Pe6xeJ5XPF6TGP187qFQnU+fqNfcn0HIdfKdR2LUufcYRJwv8HgPUfdgYtSYPNePenaBM00Vj78J8fg8nMINeAZ7dIRYpu0ncBo+6HE37DPZfRHb9xjOwev/GITyQ32kiG3yzVrfICxGaIpnrcQITN9riceHSGKGpIkRBKZIASMRgR3EDDef2sDj+QSeQSVfaI969oX6GQ2+DQ27WjgM6512u0u8rsHrUg0HYbMe27XFHWsqpPivw7k8IcROjdOw3RkF3sJZDch8uAH/arKbJ09cIySElCI2/OxaoF0XbIN3cNlk1wBzlGvQiU6b3anxEVzS8ORmCSEkkXTraNFulvSa7GaJDUC7ZrgADz+svzAICSEJow6O5zLOvG/SnMMpE/LvMwGfGSEkYVzqNNk4YWhHgBNhIWgMv2JHCEkmOzrQS8NduFiomEFICEkq2xqGW1GFbwIMAD6gYaK7UVFBAAAAAElFTkSuQmCC';
$base64-btn-details: 'data:image/png;base64,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';
$base64-btn-details-animation: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABiCAYAAACrpQYOAAADGElEQVR4nO3cSXbCQAwE0IofN+D+R+QMZEE6CcZDDxpKbdUmj2SBVH8B2B2+ns8nguf+8/PhOsVgbt4DDOaOPwggMMbiPcBA1gjrx6ESFWKv9LAYESHOyg6JEQ2ituRwGJEgWssNhREForfUMBgRIEbLDIHBDiFVIj0GM4R0edQYrBBapdFiMEJol0WJwQZhVRIdBhOEdTlUGCwQXqXQYDBAeJfh/fwA/CEoSgDBHJ4Q7suv4jqPFwQbQonbXB4QrAglLvNZQ7AjlJjPaQkRBaHEdF4riGgIJWZzW0BERSgxmV8bIjpCifoemhCzIJSo7qMFMRtCidpeGhCzIpSo7CcNMTtCifiekhBXQSgR3VcK4moIJWJ7S0BcFaFEZP9RiKsjlAz3MAKRCO8Z6qMXIhG2091LD0QiHKern1aIRKhLc08tEInQlqa+aiESoS/VvdVAJMJYqvo7g0gEmZz2eASRCLI57HMPIhF0stvrFkQi6Gaz3zVEItjko+fl6I8Z1bz1vWz9MmOW395vSATv3AH//4/I/GTB68umwn7h1AR5AHgs/x84DnPV/Pa+bP0yY5K3vtevEYlhk4+et16sE0M3m/3uvWtKDJ3s9nr09jUxZHPY59nniMSQyWmPNR/oEmMsVf3VfrJOjL5U99ZyiSMx2tLUV+u1psSoS3NPPRf9EuM4Xf30Xn1NjO109zJyGTwx3jPUx+j9iMR4ZbgHiRtDV8cQ2V/qDt1VMcT2lrxVejUM0X2l71lfBUN8T43DA7NjqOyndYpjVgy1vTSP08yGobqP9rmmWTDU97A4YBYdw2R+q5N+UTHM5rY8chkNw3Re67OvUTDM5/Q4hMyO4TKf12lwVgy3uTyP5bNhuM7j/f8RLBjuc3hDAP4leD8/AA4IwK8MCgSABwKwL4UGAeCCAOzKoUIA+CAA/ZLoEABOCECvLEoEgBcCkC+NFgHghgDkyqNGAPghgPES6RGAGBBAf5khEIA4EEB7qWEQgFgQQH25oRCAeBDAecnhEICYEMB+2SERgLgQwGfpYRGA1xdnRc4aImy+AR6Dw6HJ07l+AAAAAElFTkSuQmCC';

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

  button {
    border: none;
    background: transparent;
    cursor: pointer;
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
        background: url($base64-divider) center no-repeat;
        transform: translate(-$in-divider-width * 1.05, calc($in-divider-font-size / 2));
        background-size: cover;
      }

      &::after {
        content: '';
        width: $in-divider-width;
        height: 1.3vh;
        position: absolute;
        right: 0;
        background: url($base64-divider) center no-repeat;
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

  @include e("btn-details") {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 90px;
    margin-top: 9vh;

    &::before {
      z-index: 2;
      display: block;
      content: '';
      width: 54px;
      height: 54px;
      transform-origin: center;
      background: url($base64-btn-details) center no-repeat;
      background-size: 100% auto;
    }

    &::after {
      content: '';
      position: absolute;
      top: 28px;
      left: 50%;
      width: 98px;
      height: 98px;
      background: url($base64-btn-details-animation) center no-repeat;
      background-size: cover;
      transform-origin: center;
      -webkit-animation: wave 1s linear infinite;
      animation: wave 1s linear infinite;
    }
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