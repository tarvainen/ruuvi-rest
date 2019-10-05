const store = {
  tags: [],
  entries: {}
}

const addTag = tag => store.tags.push(tag)
const getTags = () => store.tags

const updateEntryByTagId = (entry, tagId) => {
  store.entries[tagId] = entry
}

const getLastEntryByTagId = tagId => store.entries[tagId]

module.exports = { addTag, getTags, updateEntryByTagId, getLastEntryByTagId }
