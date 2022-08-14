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
    )
}

document.getElementById('lead-submit').addEventListener('click', async (e) => {
    e.preventDefault()
    let response = await submitNewLead()
    console.log(response)
})

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

// console.log(await createLead('Jane', 'Doe', 'Wakandugu', 'female', 'Nairobi', 'lead', '83f84f0f-980f-485c-ae44-e550beb213e1'))

// loginAdmin('new@gmail.com', '12345678').then((data) => {
//     console.log(data)
// })

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

// loadDataInTable('leads-table', await getLeads());
// console.log(await getLeads())
// console.log(await getCustomers())

// loadDataInTable('customers-table', await getCustomers());

// fetchData('leads').then(data => {
//     console.log(data)
//     for(let i =0; i < data.length; i++){
//         console.log(data[i].firstName)
//     }
// })
