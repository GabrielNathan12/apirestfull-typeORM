import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import { UF } from './UF';
import { Bairro } from './Bairro';

@Entity('tb_Municipio')
export class Municipio{
    @PrimaryGeneratedColumn()
        Codigo_Municipio:number;
    @Column({type: 'text'})
        Nome: string
    @Column({type: 'int'})
        Status:number;
    @ManyToOne(() => UF, uf => uf.Codigos_UF)
        @JoinColumn({name: 'Codigo_UF'})
            Codigo_UF: UF;
    @OneToMany(() => Bairro, (bairro: { Codigo_UF: any; }) => bairro.Codigo_UF)
        Codigos_UF: Bairro[]
}