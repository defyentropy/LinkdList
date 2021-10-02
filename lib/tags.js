export const tagsToArray = (tags) => {

    tags = tags.split(",")
            .map(tag => tag.toLowerCase())
            .filter((tag, index, array) => {
                return array.indexOf(tag) === index;
            })
    
            return tags
}

export const tagsToString = (tags) => {
    return tags.reduce((prev, next) => prev + "," + next)
}