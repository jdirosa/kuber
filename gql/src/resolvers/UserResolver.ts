import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { User } from "../models/User";
import { CreateUser } from "../inputs/CreateUser";

@Resolver()
export class UserResolver {
  @Query(() => [User])
  users() {
    return User.find();
  }
  @Mutation(() => User)
  async createUser(@Arg("data") data: CreateUser) {
    const user = await User.find({ where: { authId: data.authId } });
    console.log(user);
    if (user.length > 0) {
      console.warn("Unable to create user! User already exists");
      return user[0];
    }
    const newUser = User.create(data);
    await newUser.save();
    console.log("User Created!", { user: newUser });
    return newUser;
  }
}
