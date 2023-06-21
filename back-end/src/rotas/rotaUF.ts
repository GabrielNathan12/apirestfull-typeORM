import { Router } from "express";
import { controladorUF } from "../controlador/controladorUF";

const rotaUF = Router();
const ControladorUF = new controladorUF();

rotaUF.post('/uf', ControladorUF.criarUF);
rotaUF.get('/uf', ControladorUF.listarMunicipios);
rotaUF.put('/uf/:idUF', ControladorUF.atualizarUF);
export default rotaUF;
