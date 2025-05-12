import React from "react";
import EditBook from "../edit-book/EditBook";

import { useMutation } from "@tanstack/react-query";
import { addBook } from "@/api/booksApi";
import { toast } from "sonner";

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
      <EditBook handleFormSubmit={handleFormSubmit} isPending={isPending} />
    </div>
  );
};

export default AddBook;
