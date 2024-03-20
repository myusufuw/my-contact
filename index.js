// CONTACT LIST
let rawContactList = JSON.parse(localStorage.getItem('my-contact')) || []
const contactList = rawContactList.map((item, index) => {
  return {
    ...item,
    isShown: true,
  }
})
const contactListContainer = document.getElementById('contactListContainer')
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

const renderContactList = () => {
  contactListContainer.innerHTML = ''
  contactList.forEach((item, index) => {
    const cardTemplate = `
    ${
      item.isShown
        ? `<div
            class="bg-slate-800 p-3 rounded mb-3 flex flex-row justify-between items-center cursor-pointer"
            onClick="renderDetailCard('card${index}')"
          >
            <p class=' text-lg'>${item.fullName}</p>
            <div>
              <button class='bg-blue-500 py-1 px-3 rounded hover:bg-blue-600 mr-2'> 
                Edit 
              </button>

              <button class='bg-red-500 py-1 px-3 rounded hover:bg-red-600'> 
                Delete 
              </button>
            </div>
          </div>
          <div
            id="card${index}"
            class="h-0 bg-slate-800 rounded mb-3 transition-[height] duration-500 overflow-hidden"
          >
            <div class=' m-4'>Hello</div>
          </div>`
        : ''
    }
    `
    contactListContainer.innerHTML += cardTemplate
  })
}

renderContactList()

console.log(contactList)

const renderDetailCard = (id) => {
  const contactDetail = document.getElementById(id)

  var style = window.getComputedStyle(contactDetail)
  if (style.height === '0px') {
    contactDetail.style.height = '100px'
  } else {
    contactDetail.style.height = '0px'
  }
}
