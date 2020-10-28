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
        <form action="/adoptar">
        <input type="hidden" value="${animales[i].nombre}" name="nombreAdoptar"/>
        <button type="submit">Adoptar</button>
        </form>
        `
    }
   res.send(mensaje);
})

app.get("/sumar-animal", function (req,res) {
    let nombre = req.query.nombre;
    let edad = req.query.edad;
    let tipo = req.query.tipo;
    animales.push({nombre: nombre, edad: edad, tipo: tipo})
    res.send(`Has añadido a ${nombre}`)
})

app.get("/adoptar", function (req,res) {
    let nombreAdoptar = req.query.nombreAdoptar;
    let boolean = false
    for (let i = 0; i < animales.length; i++) {
        if (nombreAdoptar == animales[i].nombre) {
            boolean = true;
            animales.splice(i,1)
        }
    }

    boolean ? res.send(`Has adoptado a ${nombreAdoptar}`) : res.send(`No tenemos ningun animal que se llame ${nombreAdoptar}`)

})

app.listen(3000);