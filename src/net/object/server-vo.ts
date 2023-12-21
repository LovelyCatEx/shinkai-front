export interface User {

}

export interface Creation {
    id: number,
    name: string,
    originName: string,
    description: string,
    descriptionShort: string,
    publishedTime: string,
    feature: string,
    featureVertical: string
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