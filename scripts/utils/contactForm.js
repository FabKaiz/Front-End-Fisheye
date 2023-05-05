const focusTrapHandler = (e, firstFocusableElement, lastFocusableElement) => {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9

  // if it's a video, do nothing to allow video controls
  if (!isTabPressed || document.activeElement.tagName === 'VIDEO') {
    return
  }

  if (e.shiftKey) {
    if (document.activeElement === firstFocusableElement) {
      lastFocusableElement.focus()
      e.preventDefault()
    }
  } else {
    if (document.activeElement === lastFocusableElement) {
      firstFocusableElement.focus()
      e.preventDefault()
    }
  }
}

function displayModal(name) {
  // Add photographer name to modal title
  const modalTitle = document.querySelector('#contact_name')
  modalTitle.textContent = `Contactez-moi ${name}`

  const modal = document.getElementById('contact_modal')
  modal.style.display = 'block'

  // Switch aria-hidden attribute on header
  const header = document.querySelector('header')
  header.setAttribute('aria-hidden', 'true')

  // Switch aria-hidden attribute on main
  const main = document.querySelector('main')
  main.setAttribute('aria-hidden', 'true')

  // Switch aria-hidden attribute on modal
  modal.setAttribute('aria-hidden', 'false')

  // Remove scroll on body when modal is open
  document.body.style.overflow = 'hidden'
  document.body.style.marginRight = '17px'

  // Focus trap Dom elements
  const focusableElementsString = 'input, textarea, button'
  const focusableElements = modal.querySelectorAll(focusableElementsString)
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  // Add event listeners for focus trap
  modal.addEventListener('keydown', (e) =>
    focusTrapHandler(e, firstFocusableElement, lastFocusableElement)
  )

  // Focus on first input
  const firstInput = document.querySelector('#contact_form input')
  firstInput.focus()
}

function closeModal() {
  event.preventDefault()

  const modal = document.getElementById('contact_modal')
  modal.style.display = 'none'

  // Switch aria-hidden attribute on header
  const header = document.querySelector('header')
  header.setAttribute('aria-hidden', 'false')

  // Switch aria-hidden attribute on main
  const main = document.querySelector('main')
  main.setAttribute('aria-hidden', 'false')

  // Switch aria-hidden attribute on modal
  modal.setAttribute('aria-hidden', 'true')

  // Add scroll on body when modal is closed
  document.body.style.overflow = 'auto'
  document.body.style.marginRight = '0px'

  // Focus trap Dom elements
  const focusableElementsString = 'input, textarea, button'
  const focusableElements = modal.querySelectorAll(focusableElementsString)
  const firstFocusableElement = focusableElements[0]
  const lastFocusableElement = focusableElements[focusableElements.length - 1]

  // Remove event listeners for focus trap
  modal.removeEventListener('keydown', (e) =>
    focusTrapHandler(e, firstFocusableElement, lastFocusableElement)
  )
}
// Display form data in console
function displayFormDataAndShowSuccessMessage() {
  event.preventDefault()

  const formData = new FormData(document.querySelector('#contact_form'))
  const data = Object.fromEntries(formData.entries())
  console.log(data)

  // Display success message with form data first name
  const successMessage = document.querySelector('#contact_success_message')
  successMessage.innerHTML = `Votre message a bien été envoyé ${data.first_name}.`
  successMessage.style.display = 'block'

  // Get modal height and set it before form is hidden
  const modal = document.querySelector('.modal')
  const modalHeight = modal.offsetHeight
  modal.style.height = `${modalHeight}px`

  // Hide form
  const form = document.querySelector('#contact_form')
  form.style.display = 'none'
}
