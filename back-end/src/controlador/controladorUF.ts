import { Request, Response } from "express";
import { ufRepositorio } from "../repositorios/UFRepositorie";

export class controladorUF{

    public async criarUF(resquest: Request, response:Response){
        // LOGICA ERRADA POR ENQUANTO
        const { Sigla , Nome, Status} = resquest.body;
        
        try{
            if( !Sigla || !Nome || !Status){
                return response.status(400).json({mensagem: "Falta parametros"});
            }
            else{

                const vericarNome = await ufRepositorio.findOne({where: {Nome : Nome}});
                const verificarSigla = await ufRepositorio.findOne({where: {Sigla : Sigla}});

                if(vericarNome){
                    return response.status(400).json({mensagem: "Nome ja inserido no banco de dados"});
                }
                if(verificarSigla){
                    return response.status(400).json({mensagem: "Sigla ja inserida no banco de dados"});
                }
                const novoUF = ufRepositorio.create(
                    {
                    Sigla:Sigla,
                    Nome:Nome,
                    Status: Status
                });

                await ufRepositorio.save(novoUF);
                return response.status(200).json(novoUF);
                
            }
        }
        catch(erro){
            return response.status(500).json({mensagem: "Erro interno no servidor " +  erro})
        }

    }
}