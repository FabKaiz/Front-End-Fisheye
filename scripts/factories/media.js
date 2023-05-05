function mediaFactory(data, photographerName) {
  const { date, id, image, video, likes, photographerId, price, title } = data

  // Define media type
  const mediaType = video ? video : image

  // Format media path name to match folder name
  const mediaPathNameFormatted = photographerName.split(' ')[0]

  // Create media url
  let mediaUrl = `assets/images/${mediaPathNameFormatted}/${mediaType}`

  // Create media card
  function createMediaCardHTML(title, likes, mediaUrl, video) {
    const videoHTML = `
      <div class='media_play_icon'></div>
      <video class='media_video' tabindex='0' src='${mediaUrl}' aria-label='${title}' role='link'>
            <source src='${mediaUrl}' type='video/mp4'>
      </video>`

    const imageHTML = `<img class='media_img' tabindex='0' src='${mediaUrl}' alt='${title}' aria-label='${title}' role='link'>`

    return `
    <article class='media_card'>
      <div class='media_card_container'>
      ${video ? videoHTML : imageHTML}
      </div>
      <div class='media_description_container'>
        <h2 class='media_title'>${title}</h2>
        <div class='media_like_container'>
          <p class='media_likes'>${likes}</p>
          <img src='assets/icons/like.svg' alt='likes' class='media_like_icon'>
        </div>
      </div>
    </article>
  `
  }

  function getMediaCard() {
    const mediaCard = createMediaCardHTML(title, likes, mediaUrl, video)

    // Convert media card to HTML and add event listener
    const parser = new DOMParser()
    const mediaCardHTML = parser.parseFromString(mediaCard, 'text/html')
    const media = mediaCardHTML.querySelector('img, video')

    media.addEventListener('click', () => openLightbox(mediaUrl, title))
    media.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') openLightbox(mediaUrl, title)
    })

    return mediaCardHTML.body.firstChild
  }

  function closeWithEscapeKey(e) {
    if (e.key === 'Escape') closeLightbox(e)
  }

  function closeLightbox() {
    const lightbox = document.querySelector('.lightbox')

    //animate lightbox before removing
    lightbox.classList.add('lightbox_close')

    setTimeout(() => {
      // remove event listeners
      document.removeEventListener('keyup', closeWithEscapeKey)
      lightbox.remove()
    }, 300)

    // make body scrollable
    document.body.style.overflow = 'visible'

    // body aria-hidden false
    document.body.setAttribute('aria-hidden', 'false')
  }

  function createLightboxHTML(title, mediaUrl) {
    return `
    <div class='lightbox' role='dialog' aria-label='image gros plan' aria-hidden='false'>
      <div class='lightbox_container'>
        <button role='link' class='lightbox_btn lightbox_btn_prev' aria-label='Image précédente' tabindex='0'>
          Précédent
        </button>
        <button role='link' class='lightbox_btn lightbox_btn_next' aria-label='Image suivante' tabindex='0'>
          Suivant
        </button>
        ${
          video
            ? `<video class='lightbox_media' controls autoplay muted title='${title}' data-src='${mediaUrl}' >
                <source src='${mediaUrl}' type='video/mp4'>
              </video>`
            : `<img class='lightbox_media' role='img' src='${mediaUrl}' alt='${title}' />`
        }
        <h2 role='heading' class='lightbox_title'>${title}</h2>
        <button role='button' class='lightbox_btn_close' aria-label='Fermer la popup' tabindex='0'>
          <img src='assets/icons/close-red.svg' alt='' />
        </button>
      </div>
    </div>
    `
  }

  function handleChangeMedia(direction) {
    const mediaContainer = document.querySelector('.media_container')
    const lightboxBtnNext = document.querySelector('.lightbox_btn_next')
    const lightboxBtnPrev = document.querySelector('.lightbox_btn_prev')
    const lightbox = document.querySelector('.lightbox')
    const lightboxMedia = lightbox.querySelector('.lightbox_media')
    const lightboxTitle = lightbox.querySelector('.lightbox_title')
    const mediaList = mediaContainer.querySelectorAll(
      '.media_card .media_card_container img,.media_card .media_card_container video'
    )

    // focus on next or previous button
    direction === 'prev' ? lightboxBtnPrev.focus() : lightboxBtnNext.focus()

    // Get current media index
    const currentMediaIndex = Array.from(mediaList).findIndex((media) => {
      return (
        media.attributes.src.value === lightboxMedia.dataset.src ||
        media.src === lightboxMedia.src
      )
    })

    let selectedDirectionMedia

    switch (direction) {
      case 'prev':
        // Get previous media, if first media, get last media
        selectedDirectionMedia =
          currentMediaIndex === 0
            ? mediaList[mediaList.length - 1]
            : mediaList[currentMediaIndex - 1]
        break
      case 'next':
        // Get next media, if last media, get first media
        selectedDirectionMedia =
          currentMediaIndex >= mediaList.length - 1
            ? mediaList[0]
            : mediaList[currentMediaIndex + 1]
        break

      default:
        break
    }

    // get media title from alt or aria-label
    const mediaTitle =
      selectedDirectionMedia.getAttribute('aria-label') ||
      selectedDirectionMedia.alt

    // Check if media is a video
    const video = selectedDirectionMedia.classList.contains('media_video')

    let mediaHTML
    // if video, remove img and add video
    if (video) {
      mediaHTML = `<video class='lightbox_media' src='${selectedDirectionMedia.src}' controls autoplay muted title='${mediaTitle}'  />`
    } else {
      mediaHTML = `<img class='lightbox_media' role='img' src='${selectedDirectionMedia.src}' alt='${selectedDirectionMedia.alt}' />`
    }

    // Add fadeOut class to current media and remove it and show new media
    lightboxMedia.classList.add('fadeOut')
    lightboxTitle.classList.add('fadeOut')
    setTimeout(() => {
      lightboxTitle.classList.remove('fadeOut')
      lightboxMedia.remove()

      lightboxBtnNext.insertAdjacentHTML('afterend', mediaHTML)
      // Update lightbox title
      lightboxTitle.textContent = mediaTitle
    }, 500)
  }

  function openLightbox(mediaUrl, title) {
    const lightbox = createLightboxHTML(title, mediaUrl)

    // make body not scrollable
    document.body.style.overflow = 'hidden'

    // make other elements not focusable

    document.body.setAttribute('aria-hidden', 'true')

    // insert lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightbox)

    // Get Lightbox elements
    const lightboxModal = document.querySelector('.lightbox')
    const btnClose = document.querySelector('.lightbox_btn_close')
    const btnPrev = document.querySelector('.lightbox_btn_prev')
    const btnNext = document.querySelector('.lightbox_btn_next')

    // Add event listeners
    btnPrev.addEventListener('click', () => handleChangeMedia('prev'))
    btnNext.addEventListener('click', () => handleChangeMedia('next'))
    btnClose.addEventListener('click', () => closeLightbox())

    // Lightbox default focus trap
    btnPrev.focus()

    // handle media change with arrow keys
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') handleChangeMedia('prev')
      if (e.key === 'ArrowRight') handleChangeMedia('next')
    })

    // close modal on escape key
    document.addEventListener('keyup', closeWithEscapeKey)

    lightboxModal.addEventListener('keydown', (e) =>
      focusTrapHandler(e, btnPrev, btnClose)
    )
  }

  return { getMediaCard }
}
