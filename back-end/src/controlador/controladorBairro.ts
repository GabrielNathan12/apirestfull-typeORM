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
    public async atualizarBairro(requisicao: Request, resposta: Response) {
        const { Nome, Status } = requisicao.body;
        const atualizarBairro = parseInt(requisicao.params.idbairro);
      
        try {
            // Procura na url passada o codigo a ser alterado
            const codigo_Bairro = await bairroRepositorio.findOne({ where: { codigo_Bairro: atualizarBairro } });
            // Procura no banco de nome o sigla que vai ser alterado
            const nome = await bairroRepositorio.findOne({where: {Nome: Nome}});


            // Verifica se o codigo passado pela url e valido
            if (!codigo_Bairro) {
                return resposta.status(400).json({ mensagem: "Codigo do bairro nao encontrado" });
            }
            // Verifica se o nome e a sigla ja estao registrados, para nao ter duplicacao de estados, cidades etc...

            if(nome){
                return resposta.status(400).json({ mensagem: "Nome ja inserido no Banco de Dados" });
            }
            // Faz com que o a Nome passado no Json seja uma nova OU a antiga
            codigo_Bairro.Nome = Nome || codigo_Bairro.Nome;
            // Faz com que o a Status passada no Json seja uma nova OU a antiga
            codigo_Bairro.Status = Status || codigo_Bairro.Status;
            
            // Pode mudar o nome do estado ou da sigla, mas deve garantir que nao coloque duplicado no banco de dados
            const novoBairro = await bairroRepositorio.save(codigo_Bairro);
            // Retorna o Json resultante da alteracao
            return resposta.status(200).json(novoBairro);
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }

    public async deletarBairro(requisicao: Request, resposta: Response){
        const deletar = parseInt(requisicao.params.idbairro);
      
        try {
          const codigo_bairro = await bairroRepositorio.findOne({ where: { codigo_Bairro: deletar } });
          
            if (!codigo_bairro) {
                return resposta.status(400).json({ mensagem: "Codigo bairro nao encontrado" });
            }
 
            await bairroRepositorio.remove(codigo_bairro);
      
            return resposta.status(200).json({mensagem: "Delecao completada com sucesso"});
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }
}