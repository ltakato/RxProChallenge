import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateTitle1642374395359 implements MigrationInterface {
    name = 'UpdateTitle1642374395359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "title" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_30e6ea2dcc2aae4a4d1f5d9e183" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "title"`);
    }

}
