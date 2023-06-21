import { Router } from "express";
import { controladorUF } from "../controlador/controladorUF";

const rotaUF = Router();
const ControladorUF = new controladorUF();

rotaUF.post('/uf', ControladorUF.criarUF);
rotaUF.get('/uf', ControladorUF.litarUF);
rotaUF.put('/uf/:iduf', ControladorUF.atualizarUF);
rotaUF.delete('/uf/:iduf', ControladorUF.deletarUF);

export default rotaUF;
