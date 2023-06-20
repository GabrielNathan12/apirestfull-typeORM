import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { Municipio } from './Municipio';

@Entity('tb_UF')
export class UF{
    @PrimaryGeneratedColumn()
        Codigo_UF:number;
    @Column({type: 'text'})
        Sigla: string; 
    @Column({type: 'text'})
        Nome: string;
    @Column({type: 'int'})
        Status:number;
    @OneToMany(() => Municipio, (municipio) => municipio.Codigo_UF)
        Codigos_UF: Municipio[]

}