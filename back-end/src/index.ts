import express from 'express';
import { AppDataSource } from './data-source';
import rotaUF from './rotas/rotaUF';
import rotaBairro from './rotas/rotaBairro';
import rotaMunicipio from './rotas/rotaMunicipio';
import rotaPessoa from './rotas/rotaPessoa';

AppDataSource.initialize().then(()=>{
    const App = express();
    App.use(express.json());
    App.use(rotaUF);
    App.use(rotaBairro);
    App.use(rotaMunicipio);
    App.use(rotaPessoa);
    
    return App.listen(process.env.PORT_SERV);

});

