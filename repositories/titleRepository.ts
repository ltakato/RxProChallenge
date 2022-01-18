import {EntityRepository, Repository} from "typeorm";

import {Title} from "../entities/Title";

@EntityRepository(Title)
export class TitleRepository extends Repository<Title> {
  getAll(): Promise<Title[]> {
    return this.find();
  }

  getById(id: string): Promise<Title| undefined> {
    return this.findOne(id);
  }
}
