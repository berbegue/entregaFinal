console.log('Entrega Final Bernardo Begue');
let ingreso = 0
let plazo = 0
let TNA = 0
let monto = 0;
let Credito = [];
let Credito1 = [];
let info = 0;
let C = 0;
let nuevop = 0;
let Datos = {};
let flag1 = true;
let validar = 0;
const inputs = document.querySelectorAll('input');
//Definicion de estados de inputs en onFocus y onBlur 
inputs.forEach(input => {
    input.onfocus = () => {
        input.previousElementSibling.classList.add('top');
        input.previousElementSibling.classList.add('focus');
        input.parentNode.classList.add('focus');
    }
    input.onblur = () => {
        input.value = input.value.trim();
        if (input.value.trim().length == 0) {
            input.previousElementSibling.classList.remove('top');
        }
        input.previousElementSibling.classList.remove('focus');
        input.parentNode.classList.remove('focus');
    }
});
//Funcion para tomar datos de inputs almacenarlos en un objeto, calcular credito y almacenarlos en un array 
function calculoCredito(TNA, ingreso, plazo) {
    let j = TNA / 12;
    C = (monto * j * (1 + j) ** plazo) / ((1 + j) ** plazo - 1);
    let Tp = 0;
    let tpi = 0;
    let Si = 0;
    let ip = 0;
    let Si0 = monto;
    const in3 = document.getElementById('name');
    const in4 = document.getElementById('last');
    const in5 = document.getElementById('dni');
    const in6 = document.getElementById('email');
    const in7 = document.getElementById('phone');
    const in8 = document.getElementById('DoB');
    nom = in3.value;
    ape = in4.value;
    dni = in5.value;
    email = in6.value;
    tel = in7.value;
    nac = in8.value;
    Datos = { Nombre: nom, Apellido: ape, DNI: dni, email: email, Telefono: tel, FechaNac: nac };

    for (i = 1; i <= plazo; i++) {
        tpi = C - Si0 * j - Si * j;
        Tp = Tp + tpi;
        Si = monto - Tp;
        ip = C - tpi;
        Si0 = 0
        Credito.push({ Periodo: i.toFixed(0), Capital: tpi.toFixed(2), Interes: ip.toFixed(2), Saldo: Si.toFixed(2) });

    }
}
//Funcion para visualizar el credito pre-aprobado a traves de la manipulacion del DOM
function visualizar() {
    let data = document.createElement('p')
    data.innerText = `${Datos1["Nombre"] + ' ' + Datos1["Apellido"]} tiene un credito preaprobado de $${monto} con una TNA de: ${TNA * 100}% `
    document.body.append(data)
    let table = document.createElement('table');
    let thead = document.createElement('thead');
    let tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);
    document.body.appendChild(table);
    let row_1 = document.createElement('tr');
    let heading_1 = document.createElement('th');
    heading_1.innerHTML = "Periodo";
    let heading_2 = document.createElement('th');
    heading_2.innerHTML = "Capitál";
    let heading_3 = document.createElement('th');
    heading_3.innerHTML = "Interes";
    let heading_4 = document.createElement('th');
    heading_4.innerHTML = "Saldo";
    row_1.appendChild(heading_1);
    row_1.appendChild(heading_2);
    row_1.appendChild(heading_3);
    row_1.appendChild(heading_4);
    thead.appendChild(row_1);
    Credito1.forEach(e => {
        let fila = document.createElement('tr');
        let fila_col1 = document.createElement('td');
        fila_col1.innerHTML = e.Periodo;
        let fila_col2 = document.createElement('td');
        fila_col2.innerHTML = `$${e.Capital}`;
        let fila_col3 = document.createElement('td');
        fila_col3.innerHTML = `$${e.Interes}`;
        let fila_col4 = document.createElement('td');
        fila_col4.innerHTML = `$${e.Saldo}`;
        fila.appendChild(fila_col1);
        fila.appendChild(fila_col2);
        fila.appendChild(fila_col3);
        fila.appendChild(fila_col4);
        tbody.appendChild(fila);
    })
}
//Función asincrona para verificar el mail - En caso de estar OK se visualiza el credito 
async function chequeoMail() {
    checkmail();
    setTimeout(() => {
        if (validar == "invalid") {
            let flag1 = true;
            Swal.fire({
                icon: 'error',
                text: 'Correo electronico invalido',
                showConfirmButton: true,
                
            });
        } else {
            flag1 = false;
            Swal.fire({
                icon: 'success',
                text: 'TENEMOS TU CREDITO Nos pondremos en contacto para brindarte mas información',
                showConfirmButton: true,
            });
            visualizar();



        }
    }, 1000);

}
//funcion para almacenar datos en localStorage
function guardar(Credito, Datos) {
    localStorage.setItem("Credito1", JSON.stringify(Credito));
    localStorage.setItem("Datos1", JSON.stringify(Datos));
}
//función para extraer datos del localStorage
function extraer() {
    Credito1 = JSON.parse(localStorage.getItem("Credito1"))
    Datos1 = JSON.parse(localStorage.getItem("Datos1"))
    console.log(Datos1);
}
//funcion principal que ejecuta las funciones para calcular el credito
function ejecucion() {
    localStorage.clear
    const in1 = document.getElementById('ingreso');
    ingreso = in1.value;
    const in2 = document.getElementById('plazo');
    plazo = parseInt(in2.value);
    monto = (ingreso * .2 * plazo);
    TNA = 10000 / (ingreso / plazo);
    TNA = TNA.toFixed(2);
    calculoCredito(TNA, monto, plazo);
    guardar(Credito, Datos);
    extraer();
    Credito = [];

}


//acción de presionar el boton OK
form.addEventListener('submit', function(evt){
    evt.preventDefault();
    ejecucion();
    flag1 ? chequeoMail() : Swal.fire({
        icon: 'error',
        text: 'PRESIONA RESET PARA INGRESAR VALORES',
        showConfirmButton: false,
        timer: 1500
    });
    

})
//accion de presionar el boton RESET
boton2.addEventListener('click', () => {
    location.reload();
})
//funcion que utiliza un API para valizar el email ingresado
function checkmail() {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com',
            'X-RapidAPI-Key': '4bccf7cca9mshadb9863d5ea3d21p16372cjsn2d135610c6b8'
        }
    };

    fetch(`https://zerobounce1.p.rapidapi.com/v2/validate?ip_address=replace_the_IP_address_the_email_signed_up_from&email=${Datos1["email"]}`, options)
        .then(response => response.json())
        .then(response => {
            console.log(response.status);
            validar = (response.status);
        })
        .catch(err => console.error(err));

}