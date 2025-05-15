import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBook } from "@/api/booksApi";
import { toast } from "sonner";
import BookForm from "../book-form/BookForm";
import { useNavigate } from "react-router-dom";

const AddBook = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["addBook"],
    mutationFn: addBook,
    onSuccess: () => {
      toast("✅ Book is added successfully");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
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
