import { Request, Response } from "express";
import { ufRepositorio } from "../repositorios/UFRepositorie";

export class controladorUF{

    public async criarUF(resquest: Request, response:Response){
        const { Sigla , Nome, Status} = resquest.body;
        
        try{
            if( !Sigla || !Nome || !Status){
                return response.status(400).json({mensagem: "Falta parametros"});
            }
            else{

                const verificarNome = await ufRepositorio.findOne({where: {Nome : Nome}});
                const verificarSigla = await ufRepositorio.findOne({where: {Sigla : Sigla}});

                if(verificarNome){
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
    public async litarUF(resquisicao: Request, resposta:Response){
        try{
            const municipios = await ufRepositorio.find({
                relations: {
                    Municipios: true
                }
            });
            return resposta.status(200).json(municipios);
        }
        catch(error){
            return resposta.status(500).json({mensagem: "Erro interno no servidor"});
        }
    }
    public async atualizarUF(requisicao: Request, resposta: Response) {
        const { Sigla, Nome, Status } = requisicao.body;
        const atualizarUF = parseInt(requisicao.params.iduf);
      
        try {
            // Procura na url passada o codigo a ser alterado
            const codigo_UF = await ufRepositorio.findOne({ where: { Codigo_UF: atualizarUF } });
            // Procura no banco de dados o sigla que vai ser alterado
            const sigla = await ufRepositorio.findOne({where: {Sigla: Sigla}});
            // Procura no banco de dados o nome a ser alterado
            const nome = await ufRepositorio.findOne({where: {Nome: Nome}});

            // Verifica se o codigo passado pela url e valido
            if (!codigo_UF) {
                return resposta.status(400).json({ mensagem: "Codigo UF nao encontrado" });
            }
            // Verifica se o nome e a sigla ja estao registrados, para nao ter duplicacao de estados, cidades etc...

            if(sigla || nome){
                return resposta.status(400).json({ mensagem: "Nome e Siglas ja inseridos no Banco de Dados" });
            }
            // Faz com que o a sigla passado no Json seja uma nova OU a antiga
            codigo_UF.Sigla = Sigla || codigo_UF.Sigla;
            // Faz com que o a Nome passado no Json seja uma nova OU a antiga
            codigo_UF.Nome = Nome || codigo_UF.Nome;
            // Faz com que o a Status passada no Json seja uma nova OU a antiga
            codigo_UF.Status = Status || codigo_UF.Status;
            
            // Pode mudar o nome do estado ou da sigla, mas deve garantir que nao coloque duplicado no banco de dados
            const ufAtualizado = await ufRepositorio.save(codigo_UF);
            // Retorna o Json resultante da alteracao
            return resposta.status(200).json(ufAtualizado);
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }

    public async deletarUF(requisicao: Request, resposta: Response){
        const deletar = parseInt(requisicao.params.iduf);
      
        try {
          const codigo_UF = await ufRepositorio.findOne({ where: { Codigo_UF: deletar } });
          
            if (!codigo_UF) {
                return resposta.status(400).json({ mensagem: "Codigo UF nao encontrado" });
            }
 
            await ufRepositorio.remove(codigo_UF);
      
            return resposta.status(200).json({mensagem: "Delecao completada com sucesso"});
        }
        catch (erro) {
            return resposta.status(500).json({ mensagem: "Erro interno no servidor: " + erro });
        }
    }
}