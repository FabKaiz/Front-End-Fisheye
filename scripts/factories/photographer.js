function photographerFactory(data) {
  const { city, country, id, name, portrait, price, tagline } = data

  const picture = `assets/images/ID_pic/${portrait}`

  function getUserCardDOM() {
    // Create DOM elements
    const article = document.createElement('article')
    const photographerImg = document.createElement('img')
    const nameH2 = document.createElement('h2')
    const cityH3 = document.createElement('h3')
    const taglineP = document.createElement('p')
    const priceP = document.createElement('p')
    const link = document.createElement('a')

    // Set attributes
    // Link
    link.setAttribute('href', `photographer.html?id=${id}`)
    link.setAttribute('class', 'photographer_link')
    link.setAttribute('tabindex', '0')
    link.setAttribute('aria-label', `Voir la page de ${name}`)
    link.setAttribute('role', 'link')
    link.setAttribute('alt', `${name}`)

    // link clicked event handler
    link.addEventListener('click', (e) => {
      e.preventDefault()
      // check if ctrl key is pressed
      if (e.ctrlKey) {
        window.open(`photographer.html?id=${id}`, '_blank')
        return
      }
      window.location.href = `photographer.html?id=${id}`
    })

    // Article
    article.setAttribute('class', 'photographer_card')
    article.setAttribute('id', id)

    // img
    photographerImg.setAttribute('src', picture)
    photographerImg.setAttribute('alt', '')
    photographerImg.setAttribute('class', 'photographer_img')

    // Name
    nameH2.textContent = name
    nameH2.setAttribute('class', 'photographer_name')

    // City
    cityH3.textContent = `${city}, ${country}`
    cityH3.setAttribute('class', 'photographer_city')

    // Tagline
    taglineP.textContent = tagline
    taglineP.setAttribute('class', 'photographer_tagline')

    // Price
    priceP.textContent = `${price}€/jour`
    priceP.setAttribute('class', 'photographer_price')

    // Append elements
    link.appendChild(photographerImg)
    link.appendChild(nameH2)
    article.appendChild(link)
    article.appendChild(cityH3)
    article.appendChild(taglineP)
    article.appendChild(priceP)

    return article
  }

  function getPhotographerHeader() {
    // Create DOM elements
    const photographerContainer = document.createElement('section')
    const containerColInfo = document.createElement('div')
    const containerColBtn = document.createElement('div')
    const containerColImg = document.createElement('div')
    const nameH1 = document.createElement('h1')
    const cityH2 = document.createElement('h2')
    const taglineP = document.createElement('p')
    const contactBtn = document.createElement('button')
    const photographerImg = document.createElement('img')

    // Set attributes
    // Container
    photographerContainer.setAttribute('class', 'photographer_container')

    // Container col
    containerColInfo.setAttribute('class', 'photographer_container_col-info')
    containerColBtn.setAttribute('class', 'photographer_container_col-btn')
    containerColImg.setAttribute('class', 'photographer_container_col-img')

    // Name
    nameH1.textContent = name
    nameH1.setAttribute('class', 'photographer_name')

    // City
    cityH2.textContent = `${city}, ${country}`
    cityH2.setAttribute('class', 'photographer_city')

    // Tagline
    taglineP.textContent = tagline
    taglineP.setAttribute('class', 'photographer_tagline')

    // Contact button
    contactBtn.textContent = 'Contactez-moi'
    contactBtn.setAttribute('class', 'contact_button')
    contactBtn.setAttribute('tabindex', '0')
    contactBtn.setAttribute('aria-label', `Contactez-moi`)
    contactBtn.setAttribute('role', 'button')
    contactBtn.addEventListener('click', () => displayModal())

    // img
    photographerImg.setAttribute('src', picture)
    photographerImg.setAttribute('alt', name)
    photographerImg.setAttribute('class', 'photographer_img')

    // Append elements
    containerColInfo.appendChild(nameH1)
    containerColInfo.appendChild(cityH2)
    containerColInfo.appendChild(taglineP)

    containerColBtn.appendChild(contactBtn)

    containerColImg.appendChild(photographerImg)

    photographerContainer.appendChild(containerColInfo)
    photographerContainer.appendChild(containerColBtn)
    photographerContainer.appendChild(containerColImg)

    return photographerContainer
  }

  return { getUserCardDOM, getPhotographerHeader }
}
