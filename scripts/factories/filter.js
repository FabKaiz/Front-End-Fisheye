function filtersFactory(mediaFromPhotographer, photographerName) {
  function createFiltersHTML() {
    const filters = `
      <form>
        <label for='filter_media'>Trier par :</label>
          <select id='filter_media' name='filter_media' aria-label='Trier par' tabindex='0'>
            <option value='popularity'>Popularité</option>
            <option value='date'>Date</option>
            <option value='title'>Titre</option>
          </select>
      </form>
`

    const parser = new DOMParser()
    const html = parser.parseFromString(filters, 'text/html')
    return html.body.firstChild
  }

  function filterBy(value) {
    const mediaContainer = document.querySelector('.media_container')
    const mediaCards = document.querySelectorAll('.media_card')
    const mediaCardsArray = Array.from(mediaCards)
    mediaCardsArray.forEach((mediaCard) =>
      mediaContainer.removeChild(mediaCard)
    )

    switch (value) {
      case 'popularity':
        mediaFromPhotographer.sort((a, b) => b.likes - a.likes)
        break
      case 'date':
        mediaFromPhotographer.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        )
        break
      case 'title':
        mediaFromPhotographer.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        break
    }

    // Create media cards
    mediaFromPhotographer.forEach((media) => {
      const mediaCard = mediaFactory(media, photographerName).getMediaCard()
      mediaContainer.appendChild(mediaCard)
    })
  }

  function getFilters() {
    const filtersHTML = createFiltersHTML()
    const select = filtersHTML.querySelector('#filter_media')

    // Add event listener to handle filter selected
    select.addEventListener('change', (e) => {
      filterBy(e.target.value)
    })

    return filtersHTML
  }

  return { getFilters }
}
