import { Request, Response } from "express";
import { ufRepositorio } from "../repositorios/UFRepositorie";

export class controladorUF{

    async criarUF(resquest: Request, response:Response){
        // LOGICA ERRADA POR ENQUANTO
        try{
            const {Codigo_UF , Sigla , Nome, Status} = resquest.body;

            if(!Codigo_UF && !Sigla && !Nome && Status){
                return response.status(400).json({mensagem: "Sigla ou Nome ja inseridos"})
            }
            else{
                const novoUF = ufRepositorio.create(
                    {Codigo_UF:Codigo_UF,
                    Sigla:Sigla,
                    Nome:Nome,
                    Status: Status}
                );
                await ufRepositorio.save(novoUF);

                return response.status(200).json(novoUF);
            }
            

        }
        catch(erro){
            return response.status(500).json({mensagem: "Erro interno no servidor"})
        }
        
    }
}