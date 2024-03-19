// CONTACT LIST
let contactList = JSON.parse(localStorage.getItem('my-contact')) || []
// CONTACT ACTION BUTTONS
const contactFormContainer = document.getElementById('contactFormContainer')
const cancelButton = document.getElementById('cancelButton')
const contactForm = document.getElementById('contactForm')

const handleCreateNewContact = () => {
  contactFormContainer.style.display = 'block'
  contactFormContainer.style.opacity = 1
}

const handleCancelButtonClick = () => {
  contactFormContainer.style.display = 'none'
  contactForm.reset()
}

const saveContacts = () => {
  localStorage.setItem('my-contact', JSON.stringify(contactList))
}

const handleSaveContact = () => {
  const fullName = document.getElementById('fullName').value
  const email = document.getElementById('email').value
  const phoneNumber = document.getElementById('phoneNumber').value
  const address = document.getElementById('address').value
  const birthday = document.getElementById('birthday').value
  const additionalNotes = document.getElementById('additionalNotes').value

  contactList.push({
    fullName,
    email,
    phoneNumber,
    address,
    birthday,
    additionalNotes,
  })

  saveContacts()
  contactFormContainer.style.display = 'none'
  contactForm.reset()
}

console.log(contactList)
