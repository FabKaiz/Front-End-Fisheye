async function getPhotographers() {
  // Fetch photographer data
  const response = await fetch('data/photographers.json')

  // Throw error if response is not ok
  if (!response.ok) {
    throw new Error('HTTP error ' + response.status)
  }

  // Return json data
  return await response.json()
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section')

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer)
    const userCardDOM = photographerModel.getUserCardDOM()
    photographersSection.appendChild(userCardDOM)
  })
}

async function init() {
  // get photographers data from json file
  const { photographers } = await getPhotographers()

  // display photographers data
  await displayData(photographers)
}

init()
