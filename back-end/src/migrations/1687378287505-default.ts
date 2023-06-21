import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1687378287505 implements MigrationInterface {
    name = 'Default1687378287505'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD "codigo_Bairro" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_cb14f7c8982773db154ff81568f"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_e94b8244fa2b61a5b6f7e77e5bd" PRIMARY KEY ("Nome", "codigo_Bairro")`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_e94b8244fa2b61a5b6f7e77e5bd"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_f3ad7b750924e02d530eece9828" PRIMARY KEY ("codigo_Bairro")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_f3ad7b750924e02d530eece9828"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_e94b8244fa2b61a5b6f7e77e5bd" PRIMARY KEY ("Nome", "codigo_Bairro")`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP CONSTRAINT "PK_e94b8244fa2b61a5b6f7e77e5bd"`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" ADD CONSTRAINT "PK_cb14f7c8982773db154ff81568f" PRIMARY KEY ("Nome")`);
        await queryRunner.query(`ALTER TABLE "tb_Bairro" DROP COLUMN "codigo_Bairro"`);
    }

}
