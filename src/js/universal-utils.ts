const siteTitle = "新海诚影集"
const titleDivider = " - "

export function setTitle(title: string) {
    window.document.title = (title != "" ? title + titleDivider : "") + siteTitle
}