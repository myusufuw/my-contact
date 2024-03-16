const contactForm = document.getElementById('contact-form')
const cancelButton = document.getElementById('cancel-button')

const handleCreateNewContact = () => {
  contactForm.style.display = 'block'
  contactForm.style.opacity = 1
}

const handleCancelButtonClick = () => {
  contactForm.style.display = 'none'
}
