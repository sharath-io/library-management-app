import React from "react";
import BookForm from "../book-form/BookForm";
import { getSingleBook, updateBook } from "@/api/booksApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const EditBook = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: book,
    isPending: { bookIsPending },
    error,
  } = useQuery({
    queryKey: ["singlebook", id],
    queryFn: () => getSingleBook(id),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["editBook"],
    mutationFn: updateBook,
    onSuccess: () => {
      toast("✅ Book is updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
      queryClient.invalidateQueries({
         queryKey: ["singlebook", id],
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const handleFormSubmit = async ({ id, book }) => {
    try {
      await mutateAsync({ id, book });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      <h2 className="text-3xl text-center tracking-wdider">Edit Book : {id}</h2>
      {error && (
        <p className="text-center text-2xl text-red-500">{error.message}</p>
      )}
      {bookIsPending && <p className="text-center text-2xl my-3">Loading....</p>}
      <BookForm
        key={book?.id}
        handleFormSubmit={handleFormSubmit}
        isPending={isPending || bookIsPending}
        book={book}
      />
    </div>
  );
};

export default EditBook;
