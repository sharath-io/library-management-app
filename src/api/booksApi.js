import supabase from "../utils/supabase";

export const getBooks = async () => {
  const { data: books, error } = await supabase
    .from("books")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Error while getting list of books.Try again later");
  }

  return books;
};

export const addBook = async (book) => {
  const { data, error } = await supabase.from("books").insert([book]).select();

  if (error) {
    console.log(error);
    throw new Error("Error while adding list of books.Try again later");
  }

  return data;
};

export const updateBook = async ({ id, book }) => {
  const { data, error } = await supabase
    .from("books")
    .update(book)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while updating book. Try again");
  }
  return data;
};

// filterieng rows => searching for that particular book
export const getSingleBook = async (id) => {
  const { data: book, error } = await supabase
    .from("books")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while getting book information.Try again later");
  }

  return book;
};

// delete book

export const deleteBook = async (id) => {
  const { data, error } = await supabase.from("books").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error while deleting book. Try again later");
  }
};

// steps
// 1. getall books which are assigned and there in table => student_books
// 2. make them into a string ( , )
// 3. know extract books which are not assigned using not in syntax
export const getUnassignedBooks = async () => {
  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("book_id");

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting list of assigned books.Try again later"
    );
  }

  const bookIds = student_books.map((book) => book.book_id).join(",");

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*")
    .not("id", "in", `(${bookIds})`);
  if (booksError) {
    console.log(booksError);
    throw new Error(
      "Error while getting list of unassigned books.Try again later"
    );
  }
  return books;
};

export const getAssignedBooks = async () => {
  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("book_id");

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting list of assigned books.Try again later"
    );
  }

  const bookIds = student_books.map((book) => book.book_id);

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*")
    .in("id", bookIds);
  if (booksError) {
    console.log(booksError);
    throw new Error(
      "Error while getting list of assigned book details.Try again later"
    );
  }
  return books;
};
