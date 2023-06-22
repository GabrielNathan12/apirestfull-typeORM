import { Router } from "express";
import { controladorMunicipio } from "../controlador/contraladorMunicipio";

const rotaMunicipio = Router();
const contraladorMunicipio = new controladorMunicipio();

rotaMunicipio.post('/municipio', contraladorMunicipio.criarMunicipio);
rotaMunicipio.get('/municipio', contraladorMunicipio.listarMunicipios);
rotaMunicipio.put('/municipio/:idmuni' , contraladorMunicipio.atualizarMunicipio);
rotaMunicipio.delete('/municipio/:idmuni', contraladorMunicipio.deletarMunicipio);
export default rotaMunicipio;
