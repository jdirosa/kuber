import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Book } from "../models/Books";
import { CreateBookInput } from "../inputs/CreateBookInput";
import { UpdateBookInput } from "../inputs/UpdateBookInput";
import { Author } from "../models/Author";

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  books() {
    return Book.find({ relations: ["author"] });
  }
  @Query(() => Book)
  book(@Arg("id") id: string) {
    return Book.findOne({ where: { id }, relations: ["author"] });
  }
  @Mutation(() => Book)
  async updateBook(@Arg("id") id: string, @Arg("data") data: UpdateBookInput) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    Object.assign(book, data);
    await book.save();
    return book;
  }
  @Mutation(() => Book)
  async createBook(@Arg("data") data: CreateBookInput) {
    if (!data.existingAuthorId && !data.newAuthor) {
      throw new Error(
        "You must either provide a new author or reference an existing one"
      );
    }
    if (data.newAuthor && data.existingAuthorId) {
      throw new Error(
        "You cannot provide both an existing author and a new author"
      );
    }
    const book = Book.create(data);
    if (data.existingAuthorId) {
      const author = await Author.findOne({
        where: { id: data.existingAuthorId }
      });
      if (!author) {
        throw new Error("No author found with id " + data.existingAuthorId);
      }
      book.author = author;
    } else {
      const author = await Author.create(data.newAuthor);
      await author.save();
      console.log("Author Created!", { author });
      book.author = author;
    }

    await book.save();
    console.log("Book Saved!", { book });
    console.log("DB Value");
    const newBook = await Book.findOne({ where: { id: book.id } });
    console.log({ newBook });
    book.author;
    return book;
  }
  @Mutation(() => Boolean)
  async deleteBook(@Arg("id") id: string) {
    const book = await Book.findOne({ where: { id } });
    if (!book) throw new Error("Book not found!");
    await book.remove();
    return true;
  }
}
