import { Author } from "../models/Author";
import { Book } from "../models/Books";
export const init = async () => {
  if ((await Book.find()).length === 0) {
    global.console.log("Empty DB detected! Seeding Data...");
    const jkRowling = Author.create({ name: "J.K. Rowling" });
    const mCrichton = Author.create({ name: "Michael Crighton" });
    const dKoontz = Author.create({ name: "Dean Koontz" });

    await jkRowling.save();
    await mCrichton.save();
    await dKoontz.save();

    const book1 = Book.create({
      author: jkRowling,
      title: "Harry Potter and the Chamber of Secrets"
    });
    const book2 = Book.create({
      author: mCrichton,
      title: "Jurassic Park"
    });
    const book3 = Book.create({
      author: dKoontz,
      title: "Intensity"
    });
    const book4 = Book.create({
      author: jkRowling,
      title: "Harry Potter and the Sorcerer's Stone"
    });
    const book5 = Book.create({
      author: jkRowling,
      title: "Harry Potter and the Prisoner of Azkaban"
    });

    await book1.save();
    await book2.save();
    await book3.save();
    await book4.save();
    await book5.save();
  }
};
