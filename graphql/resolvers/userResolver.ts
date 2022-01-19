import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getCustomRepository} from "typeorm";

import {User} from "../../entities/User";
import {UserSignUpInput, UserAuthResponse, UserLoginInput} from "../schemas/UserSchema";
import {UserRepository} from "../../repositories/userRepository";
import {SecurityService} from "../../services/securityService";

@Resolver((of) => User)
export class UserResolver {
  @Mutation((returns) => UserAuthResponse)
  async signUp(
    @Arg('UserSignUpInput') userSignUpInput: UserSignUpInput
  ): Promise<UserAuthResponse> {
    const hashedPassword = await SecurityService.generateHash(userSignUpInput.password);

    const userRepository = getCustomRepository(UserRepository);
    const alreadyUsedEmail = await userRepository.alreadyUsedEmail(userSignUpInput.email);

    if (alreadyUsedEmail) throw new Error("Already used email")

    const user = await userRepository.save({ ...userSignUpInput, password: hashedPassword });
    const token = SecurityService.signJwtToken(user);

    return { user, token }
  }

  @Query((returns) => UserAuthResponse)
  async login(
    @Arg('UserLoginInput') userLoginInput: UserLoginInput
  ): Promise<UserAuthResponse> {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findOne({ email: userLoginInput.email });

    if (!user) throw new Error("User not found");

    const validPassword = await SecurityService.compareHash(userLoginInput.password, user.password)

    if (!validPassword) throw new Error("Invalid password");

    const token = SecurityService.signJwtToken(user);

    return { user, token }
  }
}
