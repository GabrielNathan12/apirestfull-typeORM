import {Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm';
import { Municipio } from './Municipio';

@Entity('tb_Bairro')
export class Bairro{
    @PrimaryGeneratedColumn()
        codigo_Bairro: number
    @Column({type: 'text'})
        Nome: string
    @Column({type: 'int'})
        Status:number;
    @ManyToOne(() => Municipio, (municipio) => municipio.Bairros)

    @JoinColumn({name: 'Codigo_municipio'})
        Codigos_Municipio: Municipio;
}