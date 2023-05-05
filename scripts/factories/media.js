function mediaFactory(data, photographerName) {
  const { date, id, image, video, likes, photographerId, price, title } = data

  // Define media type
  const mediaType = video ? video : image

  // Format media path name to match folder name
  const mediaPathNameFormatted = photographerName.split(' ')[0]

  // Create media url
  let mediaUrl = `assets/images/${mediaPathNameFormatted}/${mediaType}`

  function getMediaCard() {
    // Create DOM elements
    const mediaCard = document.createElement('article')
    const mediaTitle = document.createElement('h2')
    const mediaLikes = document.createElement('p')
    const likeIcon = document.createElement('img')
    const likeContainer = document.createElement('div')
    const descriptionContainer = document.createElement('div')
    const mediaContainer = document.createElement('div')

    // check if media is a video
    let media
    if (video) {
      media = document.createElement('video')
      media.setAttribute('class', 'media_video')
      // Add video play icon
      const playIcon = document.createElement('div')
      playIcon.setAttribute('class', 'media_play_icon')
      mediaContainer.appendChild(playIcon)
    } else {
      media = document.createElement('img')
      media.setAttribute('class', 'media_img')
    }

    // Img or video
    media.setAttribute('tabindex', '0')
    media.setAttribute('src', mediaUrl)
    media.setAttribute('alt', title)
    media.setAttribute('aria-label', title)
    media.setAttribute('role', 'link')

    // Add event listener to open lightbox
    media.addEventListener('click', () => openLightbox(mediaUrl, title))

    // Article
    mediaCard.setAttribute('class', 'media_card')

    // Title
    mediaTitle.textContent = title
    mediaTitle.setAttribute('class', 'media_title')

    // Likes
    mediaLikes.textContent = likes
    mediaLikes.setAttribute('class', 'media_likes')

    // Like icon
    likeIcon.setAttribute('src', 'assets/icons/like.svg')
    likeIcon.setAttribute('alt', 'likes')
    likeIcon.setAttribute('class', 'media_like_icon')

    // Like container
    likeContainer.setAttribute('class', 'media_like_container')

    // Description container
    descriptionContainer.setAttribute('class', 'media_description_container')

    // Media container
    mediaContainer.setAttribute('class', 'media_card_container')

    // Append elements
    likeContainer.appendChild(mediaLikes)
    likeContainer.appendChild(likeIcon)
    descriptionContainer.appendChild(mediaTitle)
    descriptionContainer.appendChild(likeContainer)
    mediaContainer.appendChild(media)
    mediaCard.appendChild(mediaContainer)
    mediaCard.appendChild(descriptionContainer)

    return mediaCard
  }

  function closeWithEscapeKey(e) {
    if (e.key === 'Escape') closeLightbox(e)
  }

  function closeLightbox() {
    // remove lightbox
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
        <button role='button' class='lightbox_btn_close' aria-label='Fermer la popup' tabindex='0'>
          <img src='assets/icons/close-red.svg' alt='' />
        </button>

        <button role='link' class='lightbox_btn lightbox_btn_prev' aria-label='Image précédente' tabindex='0'>
          Précédent
        </button>
        <button role='link' class='lightbox_btn lightbox_btn_next' aria-label='Image suivante' tabindex='0'>
          Suivant
        </button>
        ${
          video
            ? `<video class='lightbox_media' controls autoplay muted title='${title}' >
                <source src='${mediaUrl}' type='video/mp4'>
              </video>`
            : `<img class='lightbox_media' role='img' src='${mediaUrl}' alt='${title}' />`
        }
        <h2 role='heading' class='lightbox_title'>${title}</h2>
      </div>
    </div>
    `
  }

  function prevNextMedia(direction) {
    const mediaContainer = document.querySelector('.media_container')
    const lightboxBtnNext = document.querySelector('.lightbox_btn_next')
    const lightbox = document.querySelector('.lightbox')
    const lightboxMedia = lightbox.querySelector('.lightbox_media')
    const lightboxTitle = lightbox.querySelector('.lightbox_title')
    const mediaList = mediaContainer.querySelectorAll(
      '.media_card .media_card_container img,.media_card .media_card_container video'
    )

    // Get current media index
    const currentMediaIndex = Array.from(mediaList).findIndex(
      (media) => media.src === lightboxMedia.src
    )

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
          currentMediaIndex === mediaList.length - 1
            ? mediaList[0]
            : mediaList[currentMediaIndex + 1]
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
      lightboxMedia.classList.remove('fadeOut')
      lightboxTitle.classList.remove('fadeOut')
      lightboxMedia.remove()

      lightboxBtnNext.insertAdjacentHTML('afterend', mediaHTML)
      // Update lightbox title
      lightboxTitle.textContent = mediaTitle
    }, 500)
  }

  function openLightbox(mediaUrl, title) {
    const lightbox = createLightboxHTML(title, mediaUrl)
    console.log(lightbox)

    // make body not scrollable
    document.body.style.overflow = 'hidden'

    // body aria-hidden true
    document.body.setAttribute('aria-hidden', 'true')

    // insert lightbox to body
    document.body.insertAdjacentHTML('beforeend', lightbox)

    // Get Lightbox elements
    const lightboxModal = document.querySelector('.lightbox')
    const btnClose = document.querySelector('.lightbox_btn_close')
    const btnPrev = document.querySelector('.lightbox_btn_prev')
    const btnNext = document.querySelector('.lightbox_btn_next')

    // Add event listeners
    btnPrev.addEventListener('click', () => prevNextMedia('prev'))
    btnNext.addEventListener('click', () => prevNextMedia('next'))
    btnClose.addEventListener('click', () => closeLightbox())

    // close modal on escape key
    document.addEventListener('keyup', closeWithEscapeKey)

    // Lightbox focus trap
    const focusableElementsString = 'button, video'
    const focusableElements = lightboxModal.querySelectorAll(
      focusableElementsString
    )
    const firstFocusableElement = focusableElements[0]
    const lastFocusableElement = focusableElements[focusableElements.length - 1]
    btnNext.focus()

    lightboxModal.addEventListener('keydown', (e) =>
      focusTrapHandler(e, firstFocusableElement, lastFocusableElement)
    )
  }

  return { getMediaCard }
}

// TODO: handle focus trap of videos
// TODO: handle media change with arrow keys
// TODO: add aria-hidden to elements
// TODO: add aria-label to elements
