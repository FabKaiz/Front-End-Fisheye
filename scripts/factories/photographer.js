function photographerFactory(data) {
  const {city, country, id, name, portrait, price, tagline} = data;

  const picture = `assets/images/ID_pic/${portrait}`;

  function getUserCardDOM() {
    // Create DOM elements
    const article = document.createElement('article');
    const photographerImg = document.createElement('img');
    const nameH2 = document.createElement('h2');
    const cityH3 = document.createElement('h3');
    const taglineP = document.createElement('p');
    const priceP = document.createElement('p');
    const link = document.createElement('a');


    // Set attributes
    // Link
    link.setAttribute("href", `photographer.html?id=${id}`)
    link.setAttribute("class", "photographer_link")
    link.setAttribute("tabindex", "0")
    link.setAttribute("aria-label", `Voir la page de ${name}`)
    link.setAttribute("role", "link")
    link.setAttribute("alt", `${name}`)

    // link clicked event handler
    link.addEventListener("click", (e) => {
      e.preventDefault();
      // check if ctrl key is pressed
      if (e.ctrlKey) {
        window.open(`photographer.html?id=${id}`, '_blank');
        return;
      }
      window.location.href = `photographer.html?id=${id}`;
    })

    // Article
    article.setAttribute("class", "photographer_card")
    article.setAttribute("id", id)

    // img
    photographerImg.setAttribute("src", picture)
    photographerImg.setAttribute("alt", "")
    photographerImg.setAttribute("class", "photographer_img")

    // Name
    nameH2.textContent = name;
    nameH2.setAttribute("class", "photographer_name")

    // City
    cityH3.textContent = `${city}, ${country}`;
    cityH3.setAttribute("class", "photographer_city")

    // Tagline
    taglineP.textContent = tagline;
    taglineP.setAttribute("class", "photographer_tagline")

    // Price
    priceP.textContent = `${price}€/jour`;
    priceP.setAttribute("class", "photographer_price")

    // Append elements
    link.appendChild(photographerImg);
    link.appendChild(nameH2);
    article.appendChild(link);
    article.appendChild(cityH3);
    article.appendChild(taglineP);
    article.appendChild(priceP);

    return (article);
  }

  return {getUserCardDOM}
}