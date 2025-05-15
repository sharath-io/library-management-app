import { useQueryClient } from "@tanstack/react-query";
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
