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

    public async atualizarMunicipio(requisicao: Request, resposta: Response) {
        const { Nome, Status } = requisicao.body;
        const atualizarMunicipio = parseInt(requisicao.params.idmuni);
      
        try {
            // Procura na url passada o codigo a ser alterado
            const Codigo_Municipio = await municipioRepositorio.findOne({ where: { Codigo_Municipio: atualizarMunicipio } });
            // Procura no banco de nome o sigla que vai ser alterado
            const nome = await municipioRepositorio.findOne({where: {Nome: Nome}});


            // Verifica se o codigo passado pela url e valido
            if (!Codigo_Municipio) {
                return resposta.status(400).json({ mensagem: "Codigo do municipio nao encontrado" });
            }
            // Verifica se o nome e a sigla ja estao registrados, para nao ter duplicacao de estados, cidades etc...

            if(nome){
                return resposta.status(400).json({ mensagem: "Nome ja inserido no Banco de Dados" });
            }
            // Faz com que o a Nome passado no Json seja uma nova OU a antiga
            Codigo_Municipio.Nome = Nome || Codigo_Municipio.Nome;
            // Faz com que o a Status passada no Json seja uma nova OU a antiga
            Codigo_Municipio.Status = Status || Codigo_Municipio.Status;
            
            // Pode mudar o nome do estado ou da sigla, mas deve garantir que nao coloque duplicado no banco de dados
            const novoMunicipio = await municipioRepositorio.save(Codigo_Municipio);
            // Retorna o Json resultante da alteracao
            return resposta.status(200).json(novoMunicipio);
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }

    public async deletarMunicipio(requisicao: Request, resposta: Response){
        const deletar = parseInt(requisicao.params.idmuni);
      
        try {
          const codigo_Municipio = await municipioRepositorio.findOne({ where: { Codigo_Municipio: deletar } });
          
            if (!codigo_Municipio) {
                return resposta.status(400).json({ mensagem: "Codigo municipio nao encontrado" });
            }
 
            await municipioRepositorio.remove(codigo_Municipio);
      
            return resposta.status(200).json({mensagem: "Delecao completada com sucesso"});
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }
}