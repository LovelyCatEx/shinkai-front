import {navHeaderStore} from "@/store/nav-header-store";

const store: any = {}

export const registerStore = () => {
    store.navHeaderStore = navHeaderStore()
}

export default store