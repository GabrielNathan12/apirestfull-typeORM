import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687363205420 implements MigrationInterface {
    name = 'Default1687363205420'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "FK_06d819edfe1fcfba3f762dc94f3"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_9f9b7c7746b45f7725508910ea2"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP COLUMN "Codigo_Bairro"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP COLUMN "Codigo_UF"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD "Codigo_municipio" integer`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_cb14f7c8982773db154ff81568f" PRIMARY KEY ("Nome")`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "FK_84569f51d7461afa6e56a0281bb" FOREIGN KEY ("Codigo_municipio") REFERENCES "tb_Municipio"("Codigo_Municipio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "FK_84569f51d7461afa6e56a0281bb"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_cb14f7c8982773db154ff81568f"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP COLUMN "Codigo_municipio"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD "Codigo_UF" integer`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD "Codigo_Bairro" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_9f9b7c7746b45f7725508910ea2" PRIMARY KEY ("Codigo_Bairro")`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "FK_06d819edfe1fcfba3f762dc94f3" FOREIGN KEY ("Codigo_UF") REFERENCES "tb_Municipio"("Codigo_Municipio") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
