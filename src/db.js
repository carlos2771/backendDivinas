import mongoose from "mongoose";
import 'dotenv/config'

export const connectDB = async () => {
    const URI = process.env.URI 
    try {
    mongoose.connect(URI)
    console.log("conexion exitosa👽");
    } catch (error) {
        console.log("Conexion a la base de datos erronea",error);
    }
}