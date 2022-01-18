import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {Field, ObjectType} from "type-graphql";

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;
}
