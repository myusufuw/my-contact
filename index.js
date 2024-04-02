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
let urlParams = new URLSearchParams(window.location.search)
let initialValue = urlParams.get("q")

// FUNCTION SHOW THE SNACKBAR
const showSnackbar = (message, backgroundColor) => {
  let snackbar = document.getElementById("snackbar")
  snackbar.className = "show"
  snackbar.style.backgroundColor = backgroundColor
  snackbar.innerText = message

  setTimeout(function () {
    snackbar.className = snackbar.className.replace("show", "")
  }, 3000)
}

// SEARCH INPUT EVENT LISTENER
searchInput.addEventListener("input", () => {
  renderContactList(searchInput.value.toLowerCase())
  let newUrl =
    window.location.origin + "?q=" + encodeURIComponent(searchInput.value)
  window.history.replaceState({}, "", newUrl)

  if (searchInput.value === "")
    window.history.replaceState({}, "", window.location.origin)
})

// HANDLE CREATE NEW CONTACT CLICK
const handleCreateNewContact = () => {
  contactFormContainer.style.display = "block"
  contactFormContainer.style.opacity = 1
}

// HANDLE CANCEL BUTTON CLICK
const handleCancelButtonClick = () => {
  contactFormContainer.style.display = "none"
  contactForm.reset()
}

// SAVE CONTACT TO LOCAL STORAGE
const saveContactsToLocalStorage = (contactList) => {
  localStorage.setItem("my-contact", JSON.stringify(contactList))
}

// HANDLE SAVE CONTACT
const handleSaveContact = () => {
  let fullName = document.getElementById("fullName").value
  let email = document.getElementById("email").value
  let phoneNumber = document.getElementById("phoneNumber").value
  let address = document.getElementById("address").value
  let birthday = document.getElementById("birthday").value
  let additionalNotes = document.getElementById("additionalNotes").value
  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  if (
    fullName === "" ||
    email === "" ||
    phoneNumber === "" ||
    address === "" ||
    birthday === ""
  )
    showSnackbar("Please fill out all mandatory fields!", "#d32f2f")
  else {
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
    showSnackbar("Successfully created a new contact.", "#36993b")
  }
}

// HANDLE UPDATE CONTACT
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

  if (
    fullName === "" ||
    email === "" ||
    phoneNumber === "" ||
    address === "" ||
    birthday === ""
  )
    showSnackbar("Please fill out all mandatory fields!", "#d32f2f")
  else {
    saveContactsToLocalStorage(updatedContactList)
    renderContactList()
    contactForm.reset()
    contactFormContainer.style.display = "none"
    editButton.style.display = "none"
    saveButton.style.display = "block"
    tempContactId = null
    showSnackbar("Successfully updated the contact.", "#36993b")
  }
}

// HANDLE EDIT CONTACT CLICK
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

// HANDLE DELETE CONTACT CLICK
const handleDeleteContact = (contactId) => {
  let contactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const newContactList = contactList.filter((item) => item.id !== +contactId)

  saveContactsToLocalStorage(newContactList)
  renderContactList()
  showSnackbar("Successfully deleted the contact.", "#36993b")
}

// RENDER CONTACT LIST
const renderContactList = (searchKeyword = "") => {
  let rawContactList = JSON.parse(localStorage.getItem("my-contact")) || []

  const contactList = rawContactList.map((item, index) => {
    return {
      ...item,
      isShown: item.fullName
        .toLowerCase()
        .includes(searchKeyword.toLowerCase()),
    }
  })

  contactListContainer.innerHTML = ""

  if (rawContactList.length === 0) {
    contactListContainer.innerHTML = `<div class='flex justify-center items-center w-full h-full'>
        <img src='./assets/contact.gif' width='80%' height='80%' style="opacity: 30%;" />
      </div>`
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
                onClick="event.stopPropagation(); handleEditContact('${
                  item.id
                }')"
              > 
                Edit 
              </button>

              <button 
                class="bg-red-500 py-1 px-3 rounded hover:bg-red-600"
                onClick="event.stopPropagation(); handleDeleteContact('${
                  item.id
                }')"
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
            <div class="flex p-3 justify-center items-center border border-x-0 border-slate-500">
              <div class="flex flex-row gap-5">
                <a href="mailto:${item.email}" target="_blank">
                  <img src="./assets/email.png" width="50px" height="50px"/>
                </a>
                <a href="https:wa.me//+${item.phoneNumber}" target="_blank">
                  <img src="./assets/whatsapp.png" width="50px" height="50px"/>
                </a>
                <a href="https:tele.me//+${item.phoneNumber}" target="_blank">
                  <img src="./assets/telegram.png" width="50px" height="50px"/>
                </a>
              </div>
            </div>
            <div class="py-3 px-[5%] sm:px-[5%] flex flex-col sm:items-center">
              <div>
                <div class="flex flex-col sm:flex-row border-b pb-2 mb-2 border-slate-500">
                  <p class="sm:text-lg min-w-[170px]">📧 Email:&nbsp;</p>
                  <p class="sm:text-lg">${item.email}</p>
                </div>
                <div class="flex flex-col sm:flex-row border-b pb-2 mb-2 border-slate-500">
                  <p class="sm:text-lg min-w-[170px]">☎ Phone Number:&nbsp;</p>
                  <p class="sm:text-lg">${item.phoneNumber}</p>
                </div>
                <div class="flex flex-col sm:flex-row border-b pb-2 mb-2 border-slate-500">
                  <p class="sm:text-lg min-w-[170px]">📍 Address:&nbsp;</p>
                  <p class="sm:text-lg">${item.address}</p>
                </div>
                <div class="flex flex-col sm:flex-row border-b pb-2 mb-2 border-slate-500">
                  <p class="sm:text-lg min-w-[170px]">📅 Birthday:&nbsp;</p>
                  <p class="sm:text-lg">${item.birthday}</p>
                </div>
                <div class="flex flex-col sm:flex-row border-b pb-2 mb-2 border-slate-500">
                  <p class="sm:text-lg min-w-[170px]">📝 Notes:&nbsp;</p>
                  <p class="sm:text-lg">${
                    item.additionalNotes !== "" ? item.additionalNotes : "-"
                  }</p>
                </div>
              </div>
            </div>
            
          </div>`
        : ""
    }
    `
    contactListContainer.innerHTML += cardTemplate
  })
}

// RENDER DETAIL CARD
const renderDetailCard = (id) => {
  const contactDetail = document.getElementById(id)

  let style = window.getComputedStyle(contactDetail)
  if (style.height === "0px") {
    contactDetail.style.height = window.innerWidth > 412 ? "500px" : "600px"
    contactDetail.style.marginBottom = "12px"
  } else {
    contactDetail.style.height = "0px"
    contactDetail.style.marginBottom = "0px"
  }
}

renderContactList(initialValue ?? "")

if (initialValue !== null) {
  searchInput.value = initialValue
}
