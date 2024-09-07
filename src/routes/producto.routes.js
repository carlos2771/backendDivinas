import express from "express";
import uploadMiddleware, {  createProductos, deleteProducto, getProducto, getProductos, updateProducto } from "../controllers/producto.controller.js";

const router = express.Router()


router.get("/productos",getProductos)
router.get("/producto/:id",getProducto)
router.post("/productos", uploadMiddleware(),createProductos)
router.post("/producto/:id",updateProducto)
router.delete("/producto/:id",deleteProducto)


export default router