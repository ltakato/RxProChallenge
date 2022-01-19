import {EntityRepository, Repository} from "typeorm";

import {User} from "../entities/User";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async alreadyUsedEmail(email: string): Promise<boolean> {
    const rows = await this.find({ email });
    return rows.length > 0;
  }
}
