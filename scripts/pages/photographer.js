async function fetchPhotographerAndMedia() {
  // Fetch photographer data
  const response = await fetch('data/photographers.json')

  // Throw error if response is not ok
  if (!response.ok) {
    throw new Error('HTTP error ' + response.status)
  }

  // Return json data
  return await response.json()
}

const getParamsId = () => {
  const params = new URLSearchParams(window.location.search)
  return Number(params.get('id'))
}

async function displayPhotographer(photographer) {
  const photographerHeaderSection = document.querySelector('.photograph-header')

  const photographerModel = photographerFactory(photographer)
  const photographerHeader = photographerModel.getPhotographerHeader()
  photographerHeaderSection.appendChild(photographerHeader)
}

async function displayMedia(media, photographerName) {
  const mainSection = document.querySelector('main')
  const mediaContainer = document.createElement('section')
  mediaContainer.setAttribute('class', 'media_container')
  mainSection.appendChild(mediaContainer)

  media.forEach((media) => {
    const mediaModel = mediaFactory(media, photographerName)
    const mediaCard = mediaModel.getMediaCard()
    mediaContainer.appendChild(mediaCard)
  })
}

async function displayLikes(mediaFromThePhotographer, photographer) {
  const photographerModel = photographerFactory(photographer)
  const likes = photographerModel.getPhotographerLikes(mediaFromThePhotographer)
  const createLikesHTML = photographerModel.createLikesHTML(likes)

  document
    .querySelector('.likes_and_price_container')
    .appendChild(createLikesHTML)
}

async function displayPrice(photographer) {
  const photographerModel = photographerFactory(photographer)
  const createPriceHTML = photographerModel.createPriceHTML(photographer.price)

  document
    .querySelector('.likes_and_price_container')
    .appendChild(createPriceHTML)
}

async function displayFilters(mediaFromPhotographer, photographerName) {
  const filtersContainer = document.querySelector('.filters_container')
  const filtersModel = filtersFactory(mediaFromPhotographer, photographerName)
  const filters = filtersModel.getFilters()
  filtersContainer.appendChild(filters)
}

async function getPhotographerAndMedia(paramsId) {
  const { photographers, media } = await fetchPhotographerAndMedia()

  // get photographer from the id in the url
  const photographer = photographers.find(
    (photographer) => photographer.id === paramsId
  )

  // display photographer header
  await displayPhotographer(photographer)

  // get media from the id in the url
  const mediaFromPhotographer = media.filter(
    (media) => media.photographerId === paramsId
  )

  await displayFilters(mediaFromPhotographer, photographer.name)

  // display media from the photographer
  await displayMedia(mediaFromPhotographer, photographer.name)

  // display likes
  await displayLikes(mediaFromPhotographer, photographer)

  // display price
  await displayPrice(photographer)
}

getPhotographerAndMedia(getParamsId())
