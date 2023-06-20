import { Router } from "express";
import { controladorUF } from "../controlador/controladorUF";

const rotaUF = Router();
const ControladorUF = new controladorUF();

rotaUF.post('/uf', ControladorUF.criarUF);
export default rotaUF;
