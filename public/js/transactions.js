const myModal = new bootstrap.Modal("#transaction-modal");
let logged = sessionStorage.getItem("logged");
const session = localStorage.getItem("session");
let data = {
    transaction: []
}
document.getElementById("logout-button").addEventListener("click", logout)

//ADICIONAR UM LANÇAMENTO
document.getElementById("transaction-form").addEventListener("submit", function(e) {
    e.preventDefault()

    const date = document.getElementById("date-input").value;
    const value = parseFloat(document.getElementById("value-input").value);
    const description = document.getElementById("description-input").value;
    const type = document.querySelector('input[name="type-input"]:checked').value;

    data.transaction.unshift({
        date: date, value: value, description: description, type: type
    });

    saveData(data)
    e.target.reset()
    myModal.hide()

    getTransaction()
})

ckeckLogged()

function ckeckLogged(){
    if(session) {
        sessionStorage.setItem("logged", session)
        logged = session
    }

    if(!logged) {
        window.location.href = "index.html";
        return
    }

    const dataUser = localStorage.getItem(logged)
    if (dataUser) {
        data = JSON.parse(dataUser)
    }

    getTransaction()
}

function logout() {
    sessionStorage.removeItem("logged")
    localStorage.removeItem("session")

    window.location.href = "index.html";
}

function getTransaction() {
    const transaction = data.transaction
    let transactionHtml = ``

    if (transaction.length) {
        transaction.forEach((item) => {
            let type = "Entrada"

            if (item.type === "2"){
                type = "Saída"
            }

            transactionHtml += `
                <tr>
                    <th scope="row">${item.date}</th>
                    <td>${item.value.toFixed(2)}</td>
                    <td>${type}</td>
                    <td>${item.description}</td>
                </tr>
            `
        })
        document.getElementById("transactionList").innerHTML = transactionHtml
    }
}

function saveData(data) {
    localStorage.setItem(data.login, JSON.stringify(data))
}