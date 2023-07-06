const { connection } = require("./database/connection")
const express = require("express")
const cors = require("cors")

//DB Connection
connection()

//Create server
const app = express()
const port = 3900

//Configurar cors
app.use(cors())

//Conver boty to js object
app.use(express.json()) //Receive data content-type app/json
app.use(express.urlencoded({extended : true})) //Receive form-urlencoded


//ROUTES
const rutas_articulo = require("./routes/article")

//Charge routes
app.use("/api", rutas_articulo)

//Hardcoded routes
app.get("/probando", (req, res) => {

    console.log("Se ha ejecutado el endpoint 'probando'")

    return res.status(200).json([{
        curso: "Master en React",
        autor: "Alvaro GR",
        url: "alvarogreg.glitch.me"
    },{
        curso: "Master en React",
        autor: "Alvaro GR",
        url: "alvarogreg.glitch.me"
    }
])
})

app.get("/", (req, res) => {

    console.log("Se ha ejecutado el endpoint '/'")

    return res.status(200).send(
        `<h1>Ruta / de inicio.</h1>`
    )
})

//Create server and listen http requests
app.listen(port, () => {
    console.log("Servidor corriendo en el puerto " + port)
})