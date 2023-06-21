import { Request, Response } from "express";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { ufRepositorio } from "../repositorios/UFRepositorie";

export class controladorMunicipio{

    public async criarMunicipio(resquest: Request, response:Response){
        const { Codigo_UF,  Nome, Status} = resquest.body;

        try{
            const verificaCodigoUF = await ufRepositorio.findOne({where: {Codigo_UF : Codigo_UF}});
            // Verifica se as requisoes existem
            if(!Codigo_UF || !Nome || !Status){
                return response.status(400).json({mensagem: "Falta parametros"});
            }
            else if(!verificaCodigoUF){
                return response.status(400).json({mensagem: "Codigo_UF inesxistente"});
            }
            else{

                const vericarNome = await municipioRepositorio.findOne({where: {Nome : Nome}});

                // Verifica se o nome do municipio ja esta registrado
                // Se existir retorna o status de erro avisando que ja esta registrado
                if(vericarNome){
                    return response.status(400).json({mensagem: "Nome do municio ja inserido no banco de dados"});
                }
                // Se nao, cria um novo municipio
                const novoMunicipio = municipioRepositorio.create(
                    {
                    Codigo_UF: Codigo_UF,
                    Nome:Nome,
                    Status: Status
                });

                await municipioRepositorio.save(novoMunicipio);
                return response.status(200).json(novoMunicipio);
                
            }
        }
        catch(erro){
            return response.status(500).json({mensagem: "Erro interno no servidor " +  erro})
        }

    }

    public async listarMunicipios(requisoes: Request, resposta: Response){
        try{
            const bairros = await municipioRepositorio.find({
                relations: {
                    Bairros: true
                }
            });
            return resposta.status(200).json(bairros);
        }
        catch(error){
            return resposta.status(500).json({mensagem: "Erro interno no servidor"});
        }
    }
}