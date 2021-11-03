import validator from "./validator.js";

const numIngresado = document.getElementById("inputNumero");
const verNumero = document.getElementById("numeroCod");

const nomIngresado = document.getElementById("inputNombre");
const verNombre = document.querySelector("#tarjeta .nombre");

const mesIngresado = document.getElementById("inputExp");
const verMes = document.querySelector("#tarjeta .expiracion");

const logoRed = document.querySelector("#logoRed");
const mensaje = document.getElementById("Mensaje");
const imgMensaje = document.getElementById("imgMensaje");
const bloqueMensaje = document.getElementById("contenedorMensaje");

const datosIngre = document.getElementById("DatosTarjeta");
const validar = document.getElementById("formulario");
const volver = document.getElementById("btnVolver");

let existeLogo;

//ocultar contenedor de mensaje al inicio
window.onload = function () {
    bloqueMensaje.style.display = "none";
}

// INPUT NUMERO DE TARJETA
numIngresado.addEventListener("keyup", (e) => {
    let valorInput = e.target.value
        .replace(/\s/g, "") // ELIMINAR ESPACIOS EN BLANCO - EXPRESIONES REGULARES
        .replace(/\D/g, "") // ELIMINAR LAS LETRAS
        .replace(/(.{4})/g, "$1 ")
        .trim(); //CADA 4 CARACTERES LE DA UN ESPACIO EN BLANCO Y ELIMINA EL ULTIMO ESPACIO EN BLANCO
    numIngresado.value = valorInput;
    verNumero.innerHTML = validator
        .maskify(valorInput)
        .replace(/(.{4})/g, "$1 ")
        .trim(); // USO DE MASKIFY

    //SI EL INPUT ESTA VACIO PONER #### #### #### ####
    if (valorInput == "") {
        numIngresado.textContent = "#### #### #### ####";
        logoRed.innerHTML = "";
    }

    if (valorInput[0] == 4) {
        existeLogo = true;
        logoRed.innerHTML = "";
        const imagen = document.createElement("img");
        imagen.id = "logo";
        imagen.src =
            "https://logos-marcas.com/wp-content/uploads/2020/04/Visa-Emblema.png";
        logoRed.appendChild(imagen);
    } else {
        if (valorInput[0] == 5) {
            existeLogo = true;
            logoRed.innerHTML = "";
            const imagen = document.createElement("img");
            imagen.id = "logo";
            imagen.src =
                "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b7/MasterCard_Logo.svg/2560px-MasterCard_Logo.svg.png";
            logoRed.appendChild(imagen);
        } else {
            if (valorInput[0] == 3) {
                existeLogo = true;
                logoRed.innerHTML = "";
                const imagen = document.createElement("img");
                imagen.id = "logo";
                imagen.src =
                    "https://www.pngkit.com/png/full/893-8931421_casino-que-acepte-american-express-american-express-centurion.png";
                logoRed.appendChild(imagen);
            }
            else {
                existeLogo = false;
            }
        }
    }
});

//INPUT NOMBRES Y APELLIDOS
nomIngresado.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    nomIngresado.value = valorInput
        .replace(/([0-9])/g, "")
        .replace(/[^\w\s]/g, ""); // NO PERMITIR INGRESAR NUMEROS
    verNombre.textContent = valorInput.toUpperCase();

    if (valorInput == "") {
        verNombre.textContent = "NOMBRES APELLIDOS";
    }
});

//INPUT NUMERO DE MES
mesIngresado.addEventListener("keyup", (e) => {
    let valorInput = e.target.value;
    mesIngresado.value = valorInput
        .replace(/\s/g, "") // ELIMINAR ESPACIOS EN BLANCO - EXPRESIONES REGULARES
        .replace(/\D/g, "")
        .replace(/([0-9]{2})/g, "$1/")
        .slice(0, 5); // ELIMINAR LAS LETRAS

    verMes.textContent = valorInput; // COLOCAR EL NUMERO INGRESADO EN LA TARJETA

    //SI EL INPUT ESTA VACIO PONER #### #### #### ####
    if (valorInput == "") {
        verMes.textContent = "MM/AA";
    }
});

//BOTON VALIDAR
validar.addEventListener("submit", (e) => {
    e.preventDefault();
    if (numIngresado.value == "" || nomIngresado.value == "" || mesIngresado.value == "") { alert("Por favor llenar todos los campos"); }
    else {
        if (numIngresado.value.replace(/\s/g, "").length < 16) { alert("Falta ingresar mas digitos en el numero de la tarjeta!"); }
        else {
            let men = validator.isValid(numIngresado.value.replace(/\s/g, ""));
            if (men) {
                mensaje.innerHTML = "Hola " + nomIngresado.value + ", tu compra ha sido procesada con exito!";
                imgMensaje.src = "checked.png"

            } else {
                mensaje.innerHTML = "Hola " + nomIngresado.value + ", tu pago no ha sido procesado!";
                imgMensaje.src = "unchecked.png";
            }
            bloqueMensaje.style.display = "block";
            datosIngre.style.display = "none";
        }
    }
});

function limpiarCampos() {
    numIngresado.value = "";
    nomIngresado.value = "";
    mesIngresado.value = "";
    verNumero.innerHTML = "#### #### #### ####";
    verNombre.innerHTML = "NOMBRES Y APELLIDOS";
    verMes.innerHTML = "MM/AA";
    if (existeLogo) {
        logoRed.removeChild(document.getElementById("logo"));
    }
}

volver.addEventListener("click", () => {
    bloqueMensaje.style.display = "none";
    datosIngre.style.display = "block";
    limpiarCampos();
}
);
