const fetchData = async (endpoint) => {
    const response = await fetch(`https://basi-go-ke.herokuapp.com/api/${endpoint}`);
    const data = await response.json();
    return data;
}

const getLeads = async () => {
    let leads = await fetchData('leads');
    return leads;
}

const getCustomers = async () => {
    let customers = await fetchData('customers');
    return customers;
}

const loginAdmin = async (email, password) => {
    const response = await fetch(`https://basi-go-ke.herokuapp.com/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password
        })
    });
    return response.json();
}

const register = async (email, password, role) => {
    const response = await fetch(`https://basi-go-ke.herokuapp.com/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email,
            password,
            role
        })
    });
    return response.json();

}

loginAdmin('new@gmail.com', '12345678').then(data => {console.log(data)})

const loadDataInTable = async (table, data) => {
    let tableBody = document.getElementById(table).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = '';
    data.forEach(item => {
        let row = tableBody.insertRow();
        Object.keys(item).forEach(key => {
            let cell = row.insertCell();
            cell.innerHTML = item[key];
        } )
    } )
}

// loadDataInTable('leads-table', await getLeads());
console.log(await getLeads());
console.log(await getCustomers());

// loadDataInTable('customers-table', await getCustomers()); 









// fetchData('customers').then(data => {
//     console.log(data)
//     for(let i =0; i < data.length; i++){
//         console.log(data[i].firstName)
//     }
// })

