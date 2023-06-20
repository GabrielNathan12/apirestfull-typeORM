import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import { Municipio } from './Municipio';

@Entity('tb_Bairro')
export class Bairro{
    @PrimaryGeneratedColumn()
        Codigo_Bairro:string;
    @Column({type: 'text'})
        Nome: string
    @Column({type: 'int'})
        Status:number;
    @ManyToOne(() => Municipio, municipio => municipio.Codigo_UF)
        @JoinColumn({name: 'Codigo_UF'})
            Codigo_UF: Municipio;
    
}