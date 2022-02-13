export const toGetIds = (urlArr: Array<string>) => {
   const id = urlArr.map((el) => {
        const arr = el.split('/')
        return +arr[arr.length - 1]
    })
    return id;
}