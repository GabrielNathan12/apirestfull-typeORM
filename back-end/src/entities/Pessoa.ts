import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity('tb_Pessoa')
export class Pessoa{
    @PrimaryGeneratedColumn()
        Codigo_Pessoa:number;
     @Column({type: 'text'})
        Nome: string
    @Column({type: 'text'})
        Email:string
    @Column({type: 'text'})
        Senha:string
    @Column({type: 'date'})
        DataNascimento:Date;
    @Column({type: 'int'})
        Idade:number;
    @Column({type: 'int'})
        Status:number;


}