import { Router } from "express";
import { controladorBairro } from "../controlador/controladorBairro";

const rotaBairro = Router();
const ControladorBairro = new controladorBairro();

rotaBairro.post('/bairro', ControladorBairro.criarBairro);
rotaBairro.get('/bairro', ControladorBairro.listarBairros);

export default rotaBairro;
