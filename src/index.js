// const cloudinary = require('cloudinary').v2

// cloudinary.config({
//     cloud_name: 'headhuntx',
//     api_key: '129328131255213',
//     api_secret: 'AoV3fLNwAm3-Ug-NakAWveGuBcQ',
// })
const fetchData = async (endpoint) => {
    const response = await fetch(
        `https://basi-go-ke.herokuapp.com/api/${endpoint}`
    )
    const data = await response.json()
    return data
}

const getLeads = async () => {
    let leads = await fetchData('leads')
    return leads
}

const getCustomers = async () => {
    let customers = await fetchData('customers')
    return customers
}

const loginAdmin = async (email, password) => {
    const response = await fetch(
        `https://basi-go-ke.herokuapp.com/api/auth/login`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        }
    )
    return response.json()
}

const register = async (email, password, role) => {
    const response = await fetch(
        `https://basi-go-ke.herokuapp.com/api/auth/register`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
                role,
            }),
        }
    )
    return response.json()
}

const submitNewLead = async () => {
    let firstName = document.getElementById('lead-first-name').value
    let middleName = document.getElementById('lead-middle-name').value
    let lastName = document.getElementById('lead-last-name').value
    let email = document.getElementById('lead-email').value
    let password = document.getElementById('lead-password').value
    let genderGroup = document.getElementsByName('gender')
    let gender = ''
    for (i = 0; i < genderGroup.length; i++) {
        if (genderGroup[i].checked) {
            gender = genderGroup[i].value
        }
    }
    let role = document.getElementById('lead-role').value
    let location = document.getElementById('lead-location').value

    return await createLead(
        firstName,
        middleName,
        lastName,
        gender,
        location,
        role,
        email,
        password
    )
}

const submitNewCustomer = async () => {
    let firstName = document.getElementById('customer-first-name').value
    let middleName = document.getElementById('customer-middle-name').value
    let lastName = document.getElementById('customer-last-name').value
    let genderGroup = document.getElementsByName('customer-gender')
    let gender = ''
    for (i = 0; i < genderGroup.length; i++) {
        if (genderGroup[i].checked) {
            gender = genderGroup[i].value
        }
    }
    let location = document.getElementById('customer-location').value
    let annualEarning = document.getElementById('annual-earning').value
    let photoUrl = document.getElementById('photo-url').value

    return await createCustomer(
        firstName,
        middleName,
        lastName,
        gender,
        location,
        annualEarning,
        photoUrl
    )
}

document.getElementById('lead-submit').addEventListener('click', async (e) => {
    e.preventDefault()
    let response = await submitNewLead()
    console.log(response)
})

document
    .getElementById('customer-submit')
    .addEventListener('click', async (e) => {
        e.preventDefault()
        let response = await submitNewCustomer()
        console.log(response)
    })

let photoUrl = ''

// IMAGE UPLOAD
// const cloudName = 'headhuntx' // replace with your own cloud name
// const uploadPreset = 'hudrun8x' // replace with your own upload preset

// const myWidget = cloudinary.createUploadWidget(
//     {
//         cloudName: cloudName,
//         uploadPreset: uploadPreset,
//     },
//     (error, result) => {
//         if (!error && result && result.event === 'success') {
//             console.log('Done! Here is the image info: ', result.info)
//             photoUrl = result.info.secure_url
//         }
//     }
// )

// document.getElementById('upload_widget').addEventListener(
//     'click',
//     function () {
//         myWidget.open()
//     },
//     false
// )

const createCustomer = async (
    firstName,
    middleName,
    lastName,
    gender,
    location,
    annualEarning,
    photo
) => {
    const response = await fetch(
        `https://basi-go-ke.herokuapp.com/api/leads/4ff1cd5c-4db1-4409-a23a-a23231c191af/customers`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                gender,
                location,
                annualEarning,
                photo
            }),
        }
    )
    return response.json()
}

const createLead = async (
    firstName,
    middleName,
    lastName,
    gender,
    location,
    role,
    email,
    password
) => {
    const response = await fetch(
        `https://basi-go-ke.herokuapp.com/api/leads/83f84f0f-980f-485c-ae44-e550beb213e1`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                middleName,
                lastName,
                gender,
                location,
                role,
                email,
                password,
            }),
        }
    )
    return response.json()
}

const loadDataInTable = async (table, data) => {
    let tableBody = document
        .getElementById(table)
        .getElementsByTagName('tbody')[0]
    tableBody.innerHTML = ''
    data.forEach((item) => {
        let row = tableBody.insertRow()
        Object.keys(item).forEach((key) => {
            let cell = row.insertCell()
            cell.innerHTML = item[key]
        })
    })
}

// Get the modal
let modal = document.getElementById('leadModal')
let customerModal = document.getElementById('customerModal')

// Get the button that opens the modal
let btn = document.getElementById('leadBtn')
let customerBtn = document.getElementById('customerBtn')

// Get the <span> element that closes the modal
let span = document.getElementsByClassName('close')[0]

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = 'block'
}
customerBtn.onclick = function () {
    customerModal.style.display = 'block'
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = 'none'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    }
}
