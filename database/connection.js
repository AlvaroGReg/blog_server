const mongoose = require("mongoose")

const connection = async() => {

    try{

        await mongoose.connect("mongodb://0.0.0.0:27017/mi_blog")

        //Object PArams
        /**
         * useNewUrlParser: true
         * useUnifiedTopology: true
         * useCreateIndex: true
         */

        console.log("Conexión correcta a la db mi_blog.")
    } catch(error){
        console.log(error)
        throw new Error("No se ha podido conectar a la base de datos.")
    }
}

module.exports = {
    connection
}