import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import {Field, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class Title {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;
}
