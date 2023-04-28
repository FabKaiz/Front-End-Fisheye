const focusTrapHandler = (e, firstFocusableElement, lastFocusableElement) => {
  let isTabPressed = e.key === 'Tab' || e.keyCode === 9

  if (!isTabPressed) {
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

function displayModal() {
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
