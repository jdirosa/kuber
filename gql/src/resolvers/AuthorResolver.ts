import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import { Author } from "../models/Author";
import { UpdateAuthorInput } from "../inputs/UpdateAuthorInput";
import { CreateAuthorInput } from "../inputs/CreateAuthorInput";

@Resolver()
export class AuthorResolver {
  @Query(() => [Author])
  authors() {
    return Author.find({ relations: ["books"] });
  }
  @Query(() => Author)
  author(@Arg("id") id: string) {
    return Author.findOne({ where: { id }, relations: ["books"] });
  }
  @Mutation(() => Author)
  async updateAuthor(
    @Arg("id") id: string,
    @Arg("data") data: UpdateAuthorInput
  ) {
    const author = await Author.findOne({ where: { id } });
    if (!author) throw new Error("Author not found!");
    Object.assign(author, data);
    await author.save();
    return author;
  }
  @Mutation(() => Author)
  async createAuthor(@Arg("data") data: CreateAuthorInput) {
    const author = Author.create(data);
    await author.save();
    return author;
  }
  @Mutation(() => Boolean)
  async deleteAuthor(@Arg("id") id: string) {
    const author = await Author.findOne({ where: { id } });
    if (!author) throw new Error("Book not found!");
    await author.remove();
    return true;
  }
}
