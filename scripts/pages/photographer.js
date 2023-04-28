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

async function getPhotographerAndMedia(paramsId) {
  const { photographers, media } = await fetchPhotographerAndMedia()

  // get photographer from the id in the url
  const photographer = photographers.find(
    (photographer) => photographer.id === paramsId
  )

  await displayPhotographer(photographer)

  // get media from the id in the url
  const mediaFromPhotographer = media.filter(
    (media) => media.photographerId === paramsId
  )
}

getPhotographerAndMedia(getParamsId())
