const express = require("express");
const app = express();

app.use(express.static("public"))

let animales = require("./array")

app.get("/", function (req,res) {
    let mensaje = ""
    for (let i = 0; i < animales.length; i++) {
        mensaje += `
        <h1>${animales[i].nombre}</h1>
        <p>Edad: ${animales[i].edad}</p>
        <p>Tipo: ${animales[i].tipo}</p>
        `
    }
   res.send(mensaje);
})

app.get("/sumar-animal", function (req,res) {
    let nombre = req.query.nombre;
    console.log(nombre)
    let edad = req.query.edad;
    console.log(edad)
    let tipo = req.query.tipo;
    console.log(tipo)
    animales.push({nombre: nombre, edad: edad, tipo: tipo})
    res.send(animales)
})

app.listen(3000);