import {defineStore} from "pinia";
import {ref} from "vue";

export const navHeaderStore = defineStore('navHeaderStore', () => {
    const isBackground = ref(true)
    const isBackgroundBlur = ref(true)

    return { isBackground, isBackgroundBlur }
})