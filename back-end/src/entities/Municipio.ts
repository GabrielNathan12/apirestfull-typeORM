import {Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Tree} from 'typeorm';
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
    @ManyToOne(() => UF, (uf) => uf.Municipios)
        @JoinColumn({name: 'Codigo_UF'})
            Codigo_UF: UF;
    @OneToMany(() => Bairro, (bairro) => bairro.Codigos_Municipio, {cascade: true})
        
        Bairros: Bairro[];
}