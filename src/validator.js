const validator = {
    isValid: function (creditNumber) {
        let suma1 = 0;
        let suma2 = 0;
        let totalSuma;
        let cifra;
        let digitos = Array.from(creditNumber); //Convertir una cadena en arreglo
        let reves = digitos.reverse(); //Reves de arreglo
        if (creditNumber == "") {
            return false;
        } else {
            for (let i = 0; i < reves.length; i += 2) {
                suma1 = suma1 + parseInt(reves[i]);
            }
            for (let i = 1; i < reves.length; i += 2) {
                cifra = 2 * parseInt(reves[i]);
                if (cifra > 9) {
                    suma2 = suma2 + 1 + cifra - 10;
                } else {
                    suma2 = suma2 + cifra;
                }
            }
            totalSuma = suma1 + suma2;
            if (totalSuma % 10 == 0) {
                return true;
            } else {
                return false;
            }
        }
    },

    maskify: function (creditNumber) {
        let postCredit = creditNumber.replace(/\s/g, "");
        let cant = postCredit.length;
        let nuevaCant = cant;
        let cantOculto = cant - 4;
        let caracter = "#";
        let newNumber;
        if (cantOculto < 0) {
            cantOculto = 0;
        }
        if (cant > 4) {
            nuevaCant = 4;
        }
        newNumber = caracter.repeat(cantOculto) + postCredit.slice(-nuevaCant);
        if (newNumber == "") {
            newNumber = "#### #### #### ####";
        }
        return newNumber;
    },
};

export default validator;
