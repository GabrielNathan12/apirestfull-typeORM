import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687253444164 implements MigrationInterface {
    name = 'Default1687253444164'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tb_UF" ("Codigo_UF" SERIAL NOT NULL, "Sigla" text NOT NULL, "Nome" text NOT NULL, "Status" integer NOT NULL, CONSTRAINT "PK_619e8b78420dd214e3356a297b7" PRIMARY KEY ("Codigo_UF"))`);
        await queryRunner.query(`CREATE TABLE "tb_Municipio" ("Codigo_Municipio" SERIAL NOT NULL, "Nome" text NOT NULL, "Status" integer NOT NULL, "Codigo_UF" integer, CONSTRAINT "PK_248841ad02b050cbc74bc92e53e" PRIMARY KEY ("Codigo_Municipio"))`);
        await queryRunner.query(`CREATE TABLE "tb_Bairro" ("Codigo_Bairro" SERIAL NOT NULL, "Nome" text NOT NULL, "Status" integer NOT NULL, "Codigo_UF" integer, CONSTRAINT "PK_9f9b7c7746b45f7725508910ea2" PRIMARY KEY ("Codigo_Bairro"))`);
        await queryRunner.query(`CREATE TABLE "tb_Pessoa" ("Codigo_Pessoa" SERIAL NOT NULL, "Nome" text NOT NULL, "Email" text NOT NULL, "Senha" text NOT NULL, "DataNascimento" date NOT NULL, "Idade" integer NOT NULL, "Status" integer NOT NULL, CONSTRAINT "PK_081e6c27e04892977965cfe87fb" PRIMARY KEY ("Codigo_Pessoa"))`);
        await queryRunner.query(`ALTER TABLE "tb_Municipio" ADD CONSTRAINT "FK_4442ef1a690c8759e71ebca13dc" FOREIGN KEY ("Codigo_UF") REFERENCES "tb_UF"("Codigo_UF") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "FK_06d819edfe1fcfba3f762dc94f3" FOREIGN KEY ("Codigo_UF") REFERENCES "tb_Municipio"("Codigo_Municipio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "FK_06d819edfe1fcfba3f762dc94f3"`);
        await queryRunner.query(`ALTER TABLE "tb_Municipio" DROP CONSTRAINT "FK_4442ef1a690c8759e71ebca13dc"`);
        await queryRunner.query(`DROP TABLE "tb_Pessoa"`);
        await queryRunner.query(`DROP TABLE "tb_Bairro"`);
        await queryRunner.query(`DROP TABLE "tb_Municipio"`);
        await queryRunner.query(`DROP TABLE "tb_UF"`);
    }

}
