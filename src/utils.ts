export const updateElementInList = (list: any[], newEl: any) => {
    return list.map(el => {
        if (el.id === newEl.id) return newEl
        return el
    })
}

export const deleteElementFromList = (list: any[], id: string) => {
    const newList: any[] = [];
    list.forEach(el => {
        if (el.id !== id) {
            newList.push(el)
        }
    })
    return newList
}
