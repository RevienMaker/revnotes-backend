import express from "express";
const router = express.Router();
import { agregarNota, obtenerNotas, obtenerNota, actualizarNota, eliminarNota } from "../controllers/notaController.js";
import checkAuth from "../middleware/authMiddleware.js";

router.route('/').post(checkAuth, agregarNota).get(checkAuth, obtenerNotas);

router.route('/:id').get(checkAuth, obtenerNota).put(checkAuth, actualizarNota).delete(checkAuth, eliminarNota)

export default router;