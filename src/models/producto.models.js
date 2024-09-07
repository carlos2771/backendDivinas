import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
    nombre: {type:String, require: true,},
    descripcion: {type:String, require: true},
    precio: {type:Number, require: true},
    tipo:{type: String, require: true},
    img:{type: String}
})

export default mongoose.model("Producto",productoSchema)

