import React from "react";

import { useMutation } from "@tanstack/react-query";
import { addBook } from "@/api/booksApi";
import { toast } from "sonner";
import BookForm from "../book-form/BookForm";

const AddBook = () => {
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["addBook"],
    mutationFn: addBook,
    onSuccess: () => toast("✅ Book is added successfully"),
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const handleFormSubmit = async (book) => {
    try {
      await mutateAsync(book);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      <h2 className="text-center text-3xl my-3 tracking-wider">Add Book</h2>
      <BookForm handleFormSubmit={handleFormSubmit} isPending={isPending} />
    </div>
  );
};

export default AddBook;
