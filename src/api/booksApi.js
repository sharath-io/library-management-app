import supabase from "../utils/supabase";

export const getBooks = async () => {
  const { data: books, error } = await supabase.from("books").select("*");

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
