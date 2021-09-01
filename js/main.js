// ? *****      GLOBAL VARIABLES DECLARATIONS *****
// ? Dummy Data here
let datas = [
    {
        id: 1,
        name: "Tunji Olawale",
        state: "Ogun",
        lga: "Abeokuta",
        approved: false,
        date: new Date()
    },
    {
        id: 2,
        name: "James Ward",
        state: "Oyo",
        lga: "Ibadan",
        approved: true,
        date: new Date()
    },
    {
        id: 3,
        name: "Akeem Agbede",
        state: "Ogun",
        lga: "Ijebu-Ode",
        approved: false,
        date: new Date()
    },
    {
        id: 4,
        name: "Isaac Smith",
        state: "Abia",
        lga: "Ogbunike",
        approved: false,
        date: new Date()
    },
    {
        id: 5,
        name: "Billy Johnson",
        state: "FCT",
        lga: "Gwagwalada",
        approved: true,
        date: new Date()
    },
    {
        id: 6,
        name: "Sola Ogunjimi",
        state: "Oyo",
        lga: "Ibadan",
        approved: true,
        date: new Date()
    },
    {
        id: 10,
        name: "Praise Hassani",
        state: "Kaduna",
        lga: "Kamalu",
        approved: true,
        date: new Date()
    },
    {
        id: 7,
        name: "Harry Jones",
        state: "FCT",
        lga: "Garki",
        approved: false,
        date: new Date()
    },
    {
        id: 8,
        name: "Mohammed Hassan",
        state: "Kano",
        lga: "Kano",
        approved: true,
        date: new Date()
    },
    {
        id: 9,
        name: "Akeem Adetunji",
        state: "Ogun",
        lga: "Abeokuta",
        approved: true,
        date: new Date()
    }
]

let states = [
    {
        state: "Abia",
        lgas: ["Ogbunike"]
    },
    {
        state: "FCT",
        lgas: ["Gwagwalada", "Garki"]
    },
    {
        state: "Kaduna",
        lgas: ["Kamalu"]
    },
    {
        state: "Kano",
        lgas: ["Kano"]
    },
    {
        state: "Ogun",
        lgas: ["Abeokuta", "Ijebu-Ode"]
    },
    {
        state: "Oyo",
        lgas: ["Ibadan"]
    }
]
let filterSubmitBtn = document.querySelector("#filter_submit")
let stateSelect = document.querySelector("#stateSelect")
let lgaSelect = document.querySelector("#lgaSelect")
let dataTable = document.querySelector("#dataTable")

// ? Arranges data based on id in ascending order
datas = datas.sort((a, b) => a.id - b.id)
let stateSorted = states.sort((a, b) => (a.state > b.state ? 1 : -1))

// ? Append empty option to state and lga
stateSelect.innerHTML = ""
let e = document.createElement("option")
e.text = "Select a state or leave blank"
e.value = ""
stateSelect.append(e)

lgaSelect.innerHTML = ""
let empty = document.createElement("option")
empty.text = "Select an LGA or leave blank"
empty.value = ""
lgaSelect.append(empty)

populateTable(datas) // ? Populates table on first load

// ? Loads filter state options on load
stateSorted.forEach((item) => {
    let op = document.createElement("option")
    op.value = item.state
    op.text = item.state
    document.querySelector("#stateSelect").append(op)
})

// ? *****      EVENTS      ******
// ? Populates the LGA options
stateSelect.addEventListener("change", function (e) {
    let selectedState = stateSelect.value
    for (let state of states) {
        if (state.state == selectedState) {
            let lgas = state.lgas.sort()
            let lgaSelect = document.querySelector("#lgaSelect")
            lgaSelect.innerHTML = ""
            let empty = document.createElement("option")
            empty.text = "Select an LGA or leave blank"
            empty.value = ""
            lgaSelect.append(empty)
            for (let lga of lgas) {
                let op = document.createElement("option")
                op.value = lga
                op.text = lga
                lgaSelect.append(op)
            }
        }
    }
})

// ? Filters the table
filterSubmitBtn.addEventListener("click", function (e) {
    e.preventDefault()
    let selectedState = document.querySelector("#stateSelect").value,
        selectedLga = document.querySelector("#lgaSelect").value,
        approvedChk = document.querySelector("[name='approvalCheck']:checked").value,
        newDatas = []
    console.log(`${selectedState} ${selectedLga} ${approvedChk}`)
    if (selectedLga == "" && selectedState == "") {
        if (approvedChk == "not-approved") {
            newDatas = datas.filter((item) => item.approved == false)
        } else if (approvedChk == "approved") {
            newDatas = datas.filter((item) => item.approved == true)
        } else {
            newDatas = datas
        }
    } else {
        if (selectedState != "" && selectedLga == "") {
            newDatas = datas.filter((item) => item.state == selectedState)
        } else if (selectedState == "" && selectedLga != "") {
            newDatas = datas.filter((item) => selectedLga == item.lga)
        } else {
            newDatas = datas.filter((item) => item.state == selectedState)
            newDatas = newDatas.filter((item) => selectedLga == item.lga)
        }

        if (approvedChk == "approved") {
            newDatas = newDatas.filter((item) => item.approved == true)
        } else if (approvedChk == "not-approved") {
            newDatas = newDatas.filter((item) => item.approved == false)
        }
    }

    console.log(newDatas)
    populateTable(newDatas)
})

// ? *****      EVENT/STATIC FUNCTIONS *******
// ? Populates the data table UI
function populateTable(datas) {
    let thead = document.querySelector("thead")
    dataTable.innerHTML = ""
    let body = document.createElement("tbody")
    datas.forEach((item) => {
        let row = document.createElement("tr")
        for (let key in item) {
            let cell = document.createElement("td")
            if (key.toString() == "approved") {
                let bool = item[key]
                if (bool) {
                    cell.innerHTML = "<i class='fas fa-check'></i>"
                } else {
                    cell.textContent = "-"
                }
            } else if (key.toString() == "date") {
                cell.textContent = item[key].toLocaleString("en-US", {
                    weekday: "short", // long, short, narrow
                    day: "numeric", // numeric, 2-digit
                    year: "numeric", // numeric, 2-digit
                    month: "long", // numeric, 2-digit, long, short, narrow
                    hour: "numeric", // numeric, 2-digit
                    minute: "numeric", // numeric, 2-digit
                    second: "numeric" // numeric, 2-digit
                })
            } else {
                cell.textContent = item[key]
            }
            row.append(cell)
        }
        body.append(row)
    })
    dataTable.append(thead)
    dataTable.append(body)
}
