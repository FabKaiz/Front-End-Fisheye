function mediaFactory(data, photographerName) {
  const { date, id, image, video, likes, photographerId, price, title } = data

  // Define media type
  const mediaType = video ? video : image

  // Format media path name to match folder name
  const mediaPathNameFormatted = photographerName.split(' ')[0]

  // Create media url
  const mediaUrl = `assets/images/${mediaPathNameFormatted}/${mediaType}`

  function getMediaCard() {
    // Create DOM elements
    const mediaCard = document.createElement('article')
    const mediaTitle = document.createElement('h2')
    const mediaLikes = document.createElement('p')
    const likeIcon = document.createElement('img')
    const likeContainer = document.createElement('div')
    const descriptionContainer = document.createElement('div')

    // check if media is a video
    let media
    if (video) {
      media = document.createElement('video')
      media.setAttribute('class', 'media_video')
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

    // Append elements
    likeContainer.appendChild(mediaLikes)
    likeContainer.appendChild(likeIcon)
    descriptionContainer.appendChild(mediaTitle)
    descriptionContainer.appendChild(likeContainer)
    mediaCard.appendChild(media)
    mediaCard.appendChild(descriptionContainer)

    return mediaCard
  }

  return { getMediaCard }
}
