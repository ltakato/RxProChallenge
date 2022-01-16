import { getCustomRepository } from "typeorm";
import {Arg, Mutation, Query, Resolver} from "type-graphql";

import {TitleCreateInput, TitleUpdateInput} from "../schemas/TitleSchema";
import {TitleRepository} from "../../repositories/titleRepository";
import {Title} from "../../entities/Title";

@Resolver((of) => Title)
export class TitleResolver {

  @Query((returns) => [Title], { nullable: true })
  getTitles(): Promise<Title[]> {
    const repository = getCustomRepository(TitleRepository);
    return repository.getAll();
  }

  @Query((returns) => Title, { nullable: true })
  async getTitle(
    @Arg('id') id: string
  ): Promise<Title | undefined> {
    const repository = getCustomRepository(TitleRepository);
    return repository.getById(id);
  }

  @Mutation((returns) => Title)
  async createTitle(
    @Arg('TitleCreateInput') titleCreateInput: TitleCreateInput
  ): Promise<Title> {
    const repository = getCustomRepository(TitleRepository);
    return await repository.save(titleCreateInput);
  }

  // @Mutation((returns) => TitleSchema)
  // async updateTitle(
  //   @Arg('TitleCreateInput') { }: TitleUpdateInput
  // ): Promise<TitleSchema> {
  //   return await {}
  // }
}
