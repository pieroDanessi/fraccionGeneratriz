// DOM Decimales Periodicos Puros
var cajaEnteraPP = document.getElementById("inputEnteroPP")
var cajaResultadoPP = document.getElementById("resultadoPP")
var cajaRepitientePP = document.getElementById("inputRepitientePP")
var triggerCalcularPP = document.getElementById("calcularButtonPP")

triggerCalcularPP.addEventListener("click", calcularPeriodicoPuro)
// ----------------------------------------------------------------------

// DOM Decimales Exactos
var cajaNumE = document.getElementById("inputE")
var cajaResultadoE = document.getElementById("resultadoE")
var triggerCalcularE = document.getElementById("calcularButtonE")

triggerCalcularE.addEventListener("click", calcularExacto)
// ----------------------------------------------------------------------

// DOM Decimales Periodicos Puros
var cajaEnteraPM = document.getElementById("inputEnteroPM")
var cajaNoRepitientePM = document.getElementById("inputNoRepitientePM")
var cajaRepitientePM = document.getElementById("inputRepitientePM")
var cajaResultadoPM = document.getElementById("resultadoPM")
var triggerCalcularPM = document.getElementById("calcularButtonPM")

triggerCalcularPM.addEventListener("click", calcularPeriodicoMixto)
// ----------------------------------------------------------------------

function calcularPeriodicoMixto()
{
    let valorEntero = cajaEnteraPM.value
    let valorNoRepitiente = cajaNoRepitientePM.value
    let valorRepitiente = cajaRepitientePM.value

    let parteEntera = valorEntero.toString()
    let parteNoRepitente = valorNoRepitiente.toString()
    let parteRepitente = valorRepitiente.toString()

    let juntacion = parteEntera + parteNoRepitente + parteRepitente
    let juntacionNoRepitente = parteEntera + parteNoRepitente

    let numerador = juntacion - juntacionNoRepitente
    let denominador = 0

    let longRepitente = getLength(valorRepitiente)
    for(let i = 0; i < longRepitente; i++)
    {
        denominador = pushNumber(denominador, 9)
    }

    let longNoRepitente = getLength(valorNoRepitiente)
    for(let i = 0; i < longNoRepitente; i++)
    {
        denominador = pushNumber(denominador, 0)
    }

    let fraccionSinSimp = `${numerador}/${denominador}`
    let fraccionSimpObj = simplificarFraccion(numerador, denominador)
    let fraccionSimp = `${fraccionSimpObj.numerador}/${fraccionSimpObj.denominador}`

    cajaResultadoPM.innerText = `Resultado Sin Simplificar: ${fraccionSinSimp}. Resultado Simplificado: ${fraccionSimp}`
}

function calcularExacto()
{
    let valorDecimal = cajaNumE.value
    let denominador = 1

    while(isInt(valorDecimal) == false)
    {
        valorDecimal = valorDecimal * 10
        denominador = pushNumber(denominador, 0)
        console.log(valorDecimal, denominador)
    }
    
    let fraccionSinSimp = `${valorDecimal}/${denominador}`
    let resultadoSimpObj = simplificarFraccion(valorDecimal, denominador)
    let fraccionSimp = `${resultadoSimpObj.numerador}/${resultadoSimpObj.denominador}`

    cajaResultadoE.innerText = `Resultado Sin Simplificar: ${fraccionSinSimp}. Resultado Simplificado: ${fraccionSimp}`
}

function calcularPeriodicoPuro()
{
    let valorEntero = cajaEnteraPP.value
    let valorRepitiente = cajaRepitientePP.value

    let parteEntera = valorEntero.toString()
    let parteRepitente = valorRepitiente.toString()

    let juntacion = parteEntera + parteRepitente

    let numerador = juntacion - valorEntero
    let denominador = 0

    let longRepitente = getLength(valorRepitiente)
    for(let i = 0; i < longRepitente; i++)
    {
        denominador = pushNumber(denominador, 9)
    }

    let fraccionSinSimp = `${numerador}/${denominador}`
    let fraccionSimpObj = simplificarFraccion(numerador, denominador)
    let fraccionSimp = `${fraccionSimpObj.numerador}/${fraccionSimpObj.denominador}`

    cajaResultadoPP.innerText = `Resultado Sin Simplificar: ${fraccionSinSimp}. Resultado Simplificado: ${fraccionSimp}`
}

// Para calcular la longitud del numero
function getLength(number) 
{ 
    var length = (number + '').replace('.', '').length;
    return length
}

function pushNumber(number, adder)
{
    let numString = number.toString()
    adder = adder.toString()
    let result = numString + adder
    let resultado = parseInt(result)

    return resultado
}

function simplificarFraccion(numerador, denominador)
{
    for(let i = 0; i < 6; i++)
    {
        for(let i = 2; i <= 9; i++)
        {
            if(numerador % i === 0 && denominador % i === 0)
            {
                numerador = numerador / i
                denominador = denominador / i
            }
        }
    }

    return {numerador, denominador}
}

function isInt(number)
{
    let parsedNum = parseInt(number)
    if(number == parsedNum)
    {
        return true
    }

    else
    {
        return false
    }
}