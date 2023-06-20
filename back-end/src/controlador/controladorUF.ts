import { Request, Response } from "express";

export class controladorUF{

    async criarUF(resquest: Request, response:Response){
        return response.json('Funcionol');    
    }
}