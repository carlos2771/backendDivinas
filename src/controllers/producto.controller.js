import Producto  from "../models/producto.models.js";
import multer from "multer";
import fs from "fs";
import sharp from 'sharp';

export const getProductos = async (req, res) =>{

    try{
        const findProductos = await Producto.find()
        if (!findProductos) {
            return res.status(404).json({ message: "productos no encontrados" });
          }
          res.send(findProductos);
    }catch (error){
        console.log(error, "error al encontrar los datos");
    }
}
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = "./uploads";
      // Crea el directorio si no existe
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({ storage: storage });
  
  
  const uploadMiddleware = () => upload.single("img");
  
  export default uploadMiddleware;

  export const createProductos = async (req, res) => {
    try {
      const { nombre, descripcion, precio, tipo, marca} = req.body;
      if (!req.file) {
        return res.status(400).json({ message: 'No se ha subido ninguna imagen' });
      }
      const imgPath = req.file.path;
    
      console.log(imgPath)

      // Redimensiona la imagen a un tamaño específico (por ejemplo, 300x300)
      const resizedImageBuffer = await sharp(imgPath)
        .resize({ width: 300, height: 300 })
        .toBuffer();
  
      // Convierte la imagen redimensionada a base64
      const base64Image = resizedImageBuffer.toString('base64');
  
      const newProducto = new Producto({
        nombre, descripcion, precio, tipo, marca, img: base64Image
      });
  
      const saveProducto = await newProducto.save();
      res.status(201).json(saveProducto);
    } catch (error) {
      console.log("Error al crear el producto:", error);
      res.status(500).json({ message: 'Error al crear el producto' });
    }
  };

export const getProducto = async (req, res) =>{
    try{
        const findProducto = await Producto.findById(req.params.id)
        if (!findProducto) {
            return res.status(404).json({ message: "producto no encontrados" });
          }
          res.json(findProducto);
    }catch (error){
        console.log(error, "error al encontrar los datos");
    }
}
export const updateProducto = async (req, res) =>{
    try{
        const { nombre, descripcion, precio, tipo} = req.body
        console.log("bosyy", req.body);
        

        const changedProduct = await Producto.findByIdAndUpdate(req.params.id,
            { nombre, descripcion, precio, tipo},
             {new: true})
          res.json(changedProduct);
          console.log("melo");
    }catch (error){
        console.log(error, "error al encontrar los datos");
    }
}

export const deleteProducto = async (req, res) =>{
    try{
        const findProducto = await Producto.findByIdAndDelete(req.params.id)
        if (!findProducto) {
            return res.status(404).json({ message: "producto no encontrados" });
          }
          res.json(findProducto);
    }catch (error){
        console.log(error, "error al encontrar los datos");
    }
}