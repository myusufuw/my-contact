// CONTACT LIST CONTAINER
const contactListContainer = document.getElementById("contactListContainer")
// CONTACT FORMS
const contactFormContainer = document.getElementById("contactFormContainer")
const contactForm = document.getElementById("contactForm")
// CONTACT ACTION BUTTONS
const cancelButton = document.getElementById("cancelButton")
const editButton = document.getElementById("editButton")
const saveButton = document.getElementById("saveButton")
// SEARCH BAR
const searchInput = document.getElementById("searchInput")
let tempContactId = null

searchInput.addEventListener("input", () => {
  renderContactList(searchInput.value.toLowerCase())
})

const handleCreateNewContact = () => {
  contactFormContainer.style.display = "block"
  contactFormContainer.style.opacity = 1
}

const handleCancelButtonClick = () => {
  contactFormContainer.style.display = "none"
  contactForm.reset()
}

const saveContactsToLocalStorage = (contactList) => {
  localStorage.setItem("my-contact", JSON.stringify(contactList))
}

const handleSaveContact = () => {
  let fullName = document.getElementById("fullName").value
  let email = document.getElementById("email").value
  let phoneNumber = document.getElementById("phoneNumber").value
  let address = document.getElementById("address").value
  let birthday = document.getElementById("birthday").value
  let additionalNotes = document.getElementById("additionalNotes").value
  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  contactList.push({
    id: Math.floor(Math.random() * (500 - 1 + 1)) + 1,
    fullName,
    email,
    phoneNumber,
    address,
    birthday,
    additionalNotes,
  })

  saveContactsToLocalStorage(contactList)
  contactFormContainer.style.display = "none"
  contactForm.reset()
  renderContactList()
}

const handleUpdateContact = () => {
  let fullName = document.getElementById("fullName").value
  let email = document.getElementById("email").value
  let phoneNumber = document.getElementById("phoneNumber").value
  let address = document.getElementById("address").value
  let birthday = document.getElementById("birthday").value
  let additionalNotes = document.getElementById("additionalNotes").value
  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const updatedContactList = contactList.map((item) => {
    if (item.id === +tempContactId) {
      item.fullName = fullName
      item.email = email
      item.phoneNumber = phoneNumber
      item.address = address
      item.birthday = birthday
      item.additionalNotes = additionalNotes
    }
    return item
  })

  saveContactsToLocalStorage(updatedContactList)
  renderContactList()
  contactForm.reset()
  contactFormContainer.style.display = "none"
  editButton.style.display = "none"
  saveButton.style.display = "block"
  tempContactId = null
}

const handleEditContact = (contactId) => {
  contactFormContainer.style.display = "block"
  contactFormContainer.style.opacity = 1

  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const contactDetails = contactList.find((item) => item.id === +contactId)

  document.getElementById("fullName").value = contactDetails.fullName
  document.getElementById("email").value = contactDetails.email
  document.getElementById("phoneNumber").value = contactDetails.phoneNumber
  document.getElementById("address").value = contactDetails.address
  document.getElementById("birthday").value = contactDetails.birthday
  document.getElementById("additionalNotes").value =
    contactDetails.additionalNotes
  tempContactId = contactId

  editButton.style.display = "block"
  saveButton.style.display = "none"
}

const handleDeleteContact = (contactId) => {
  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const newContactList = [...contactList].filter(
    (item) => item.id !== +contactId
  )

  saveContactsToLocalStorage(newContactList)
  renderContactList()
}

const renderContactList = (searchKeyword = "") => {
  let rawContactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const contactList = rawContactList.map((item, index) => {
    return {
      ...item,
      isShown: item.fullName.toLowerCase().includes(searchKeyword),
    }
  })

  contactListContainer.innerHTML = ""

  if (rawContactList.length === 0) {
    contactListContainer.innerHTML = ""
  }

  contactList.forEach((item, index) => {
    const cardTemplate = `
    ${
      item.isShown
        ? `<div
            class="bg-slate-800 p-3 rounded mb-3 flex flex-row justify-between items-center cursor-pointer"
            onClick="renderDetailCard('card${index}')"
          >
            <p class="text-lg">${item.fullName}</p>
            <div>
              <button 
                class="bg-blue-500 py-1 px-3 rounded hover:bg-blue-600 mr-2"
                onClick="event.stopPropagation(); handleEditContact('${item.id}')"
              > 
                Edit 
              </button>

              <button 
                class="bg-red-500 py-1 px-3 rounded hover:bg-red-600"
                onClick="event.stopPropagation(); handleDeleteContact('${item.id}')"
              > 
                Delete 
              </button>
            </div>
          </div>
          <div
            id="card${index}"
            class="h-0 bg-slate-800 rounded mb-0 transition-all duration-500 overflow-hidden"
          >
            <div class="m-4">
              <div class="w-full flex items-center justify-center flex-col p-1">
              <img src="./assets/user.png" width="100px" height="100px"/>
              <p class=" mt-2">${item.fullName}</p>
              </div>
            </div>
          </div>`
        : ""
    }
    `
    contactListContainer.innerHTML += cardTemplate
  })
}

const renderDetailCard = (id) => {
  const contactDetail = document.getElementById(id)

  var style = window.getComputedStyle(contactDetail)
  if (style.height === "0px") {
    contactDetail.style.height = "500px"
    contactDetail.style.marginBottom = "12px"
  } else {
    contactDetail.style.height = "0px"
    contactDetail.style.marginBottom = "0px"
  }
}

renderContactList()
