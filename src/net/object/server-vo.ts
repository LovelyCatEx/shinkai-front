export interface User {

}

export function getOSSImageUrl(originUrl: string, size: AssetsSize) {
    if (originUrl == undefined || originUrl == "") return ""
    const extPointIndex = originUrl.lastIndexOf('.')
    const fileFullPath = originUrl.substring(0, extPointIndex)
    const ext = originUrl.substring(extPointIndex, originUrl.length)
    return fileFullPath + size + ext
}

export class Creation {
    public id: number = 0
    public name: string = ""
    public originName: string = ""
    public description: string = ""
    public descriptionShort: string = ""
    public publishedTime: string = ""
    public feature: string = ""
    public featureVertical: string = ""

    public static getFeatureUrl(creation: Creation, size: AssetsSize) {
        return getOSSImageUrl(creation.feature, size)
    }
}

export enum AssetsSize {
    ORIGIN = "",
    MEDIUM = "-medium",
    SMALL = "-small",
    TINY = "-tiny"
}

export interface CreationCharacter {
    id: number,
    cid: number,
    name: string,
    originName: string,
    description: string,
    avatar: string,
    performer: string
}

export interface CreationSection {
    id: number,
    cid: number,
    title: string,
    subtitle: string,
    type: number,
    feature: string,
    content: string
}

export interface Comment {
    id: number | null,
    cid: number,
    nickname: string,
    email: string,
    content: string,
    rates: number,
    publishedTime: string,
    published: boolean
}