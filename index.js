const express = require('express')
const app = express()
const cors = require('cors')
const { getEventos, deleteEvento, verificarCredenciales,registrarUsuario } = require('./usuarios')
const jwt = require("jsonwebtoken")


app.listen(3000, console.log("SERVER ON"))
app.use(cors())
app.use(express.json())

app.get("/usuarios", async (req, res) => {
    try {
        const usuarios = await getEventos()
        res.json(usuarios)
    } catch (error) {
        res.status(error.code || 500).send(error)
    }
})

app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        await verificarCredenciales(email, password)
        const token = jwt.sign({ email }, "az_AZ", { expiresIn: 60 })
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code || 500).send(error)
    }
})

app.post("/usuarios", async (req, res) => {
    try {
    const usuario = req.body
    await registrarUsuario(usuario)
    res.send("Usuario creado con éxito")
    } catch (error) {
    res.status(500).send(error)
    }
    })
