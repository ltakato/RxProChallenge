import { getCustomRepository } from "typeorm";
import {Arg, Authorized, Mutation, Query, Resolver} from "type-graphql";

import {TitleCreateInput, TitleUpdateInput} from "../schemas/TitleSchema";
import { TitleRepository } from "../../repositories/titleRepository";
import {Title} from "../../entities/Title";

@Resolver((of) => Title)
export class TitleResolver {
  @Authorized()
  @Query((returns) => [Title], { nullable: true })
  getTitles(): Promise<Title[]> {
    const titleRepository = getCustomRepository(TitleRepository);
    return titleRepository.getAll();
  }

  @Authorized()
  @Query((returns) => Title, { nullable: true })
  async getTitle(
    @Arg('id') id: string
  ): Promise<Title | undefined> {
    const titleRepository = getCustomRepository(TitleRepository);
    return titleRepository.getById(id);
  }

  @Authorized()
  @Mutation((returns) => Title)
  async createTitle(
    @Arg('TitleCreateInput') titleCreateInput: TitleCreateInput
  ): Promise<Title> {
    const titleRepository = getCustomRepository(TitleRepository);
    return await titleRepository.save(titleCreateInput);
  }

  @Authorized()
  @Mutation((returns) => Title)
  async updateTitle(
    @Arg('TitleCreateInput') id: string,
    @Arg('TitleCreateInput') titleUpdateInput: TitleUpdateInput
  ): Promise<Title> {
    const titleRepository = getCustomRepository(TitleRepository);

    // TODO: teste - se achar x se não achar
    const title = await titleRepository.getById(id);

    if (!title) throw new Error("Didn't find a title with this id");

    const updatingTitle = { ...title, name: titleUpdateInput.name };
    await titleRepository.update(id, updatingTitle);

    return updatingTitle;
  }
}
