
const createId = (idType) => {
    return `${idType}-${Date.now()}-${Math.random().toString(36).substr(2,16)}`
}

export default createId;