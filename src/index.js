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
// I would have setup cloudinary for the image upload or use AWS S3 to store images 
// and populate the photo url field with the image url gotten from the third party service..
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
        `https://basi-go-ke.herokuapp.com/api/leads/c6957afb-e62d-4f66-9d66-8d5db86921de/customers`,
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
                photo,
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
    const tbody = table.querySelector('tbody')
    const newData = await data

    // Clear Table
    tbody.innerHTML = ''

    // Load Data
    for (const item of newData) {
        const row = document.createElement('tr')

        for (const key in item) {
            const cellEl = document.createElement('td')
            cellEl.textContent = item[key]

            row.appendChild(cellEl)
        }

        tbody.appendChild(row)
    }
}

const leadsTable = document.getElementById('leads-table')
const customersTable = document.getElementById('customers-table')

loadDataInTable(leadsTable, getLeads())
loadDataInTable(customersTable, getCustomers())

// Get the modal
let modal = document.getElementById('leadModal')
let customerModal = document.getElementById('customerModal')

// Get the button that opens the modal
let btn = document.getElementById('leadBtn')
let customerBtn = document.getElementById('customerBtn')

// Get the <span> element that closes the modal
let spans = document.querySelectorAll('.close')
spans.forEach((span) => {
    span.addEventListener('click', () => {
        modal.style.display = 'none'
        customerModal.style.display = 'none'
    })
})

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = 'block'
}
customerBtn.onclick = function () {
    customerModal.style.display = 'block'
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none'
    } else if (event.target == customerModal) {
        customerModal.style.display = 'none'
    }
}
