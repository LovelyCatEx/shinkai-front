export interface User {

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
        const feature = creation.feature
        if (feature == undefined || feature == "") return ""
        const extPointIndex = feature.lastIndexOf('.')
        const fileFullPath = feature.substring(0, extPointIndex)
        const ext = feature.substring(extPointIndex, feature.length)
        return fileFullPath + size + ext
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