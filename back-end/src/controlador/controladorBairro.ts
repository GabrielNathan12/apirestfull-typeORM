import { Request, Response } from "express";
import { municipioRepositorio } from "../repositorios/municipioRepositorio";
import { bairroRepositorio } from "../repositorios/bairroRepositorio";

export class controladorBairro{

    public async criarBairro(resquest: Request, response:Response){
        const { Codigo_Municipio,  Nome, Status} = resquest.body;

        try{
            const verificaCodigoMunicipio = await municipioRepositorio.findOne({where: {Codigo_Municipio : Codigo_Municipio}});
            // Verifica se as requisoes existem
            if(!Codigo_Municipio || !Nome || !Status){
                return response.status(400).json({mensagem: "Nome ou Status inexistentes"});
            }
            else if(!verificaCodigoMunicipio){
                return response.status(400).json({mensagem: "Codigo_Municipio inesxistente"});
            }
            else{

                const vericarNome = await bairroRepositorio.findOne({where: {Nome : Nome}});

                // Verifica se o nome do bairro ja esta registrado
                // Se existir retorna o status de erro avisando que ja esta registrado
                if(vericarNome){
                    return response.status(400).json({mensagem: "Nome do bairro ja inserido no banco de dados"});
                }
                // Se nao, cria um novo bairro
                const novoBairro = bairroRepositorio.create(
                    {
                    Codigos_Municipio: Codigo_Municipio,
                    Nome:Nome,
                    Status: Status
                });

                await bairroRepositorio.save(novoBairro);
                return response.status(200).json(novoBairro);
                
            }
        }
        catch(erro){
            return response.status(500).json({mensagem: "Erro interno no servidor " +  erro})
        }

    }

    public async listarBairros(requisoes: Request, resposta: Response){
        try{
            const bairros = await bairroRepositorio.find();
            return resposta.status(200).json(bairros);
        }
        catch(error){
            return resposta.status(500).json({mensagem: "Erro interno no servidor"});
        }
    }
    
}