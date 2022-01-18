import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {User} from "../entities/User";

export class SecurityService {
  public static generateHash(text: string): Promise<string> {
    return bcrypt.hash(text, 10);
  }

  public static compareHash(plainText: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plainText, hash);
  }

  public static signJwtToken(user: User): string {
    const secret = process.env.SECRET as string;
    return jwt.sign({ id: user.id, email: user.email, name: user.name }, secret);
  }
}
