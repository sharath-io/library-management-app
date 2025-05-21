import React, { useState } from "react";
import DropDown from "../dropdown/Dropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAssignedBooks } from "@/api/booksApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { returnBook } from "@/api/studentBooksApi";

const ReturnBook = () => {
  const [selection, setSelection] = useState(null);
  const queryClient = useQueryClient();

  const {
    data: books,
    isPending,
    error,
  } = useQuery({
    queryKey: ["assignedBooks"],
    queryFn: getAssignedBooks,
    select: (data) =>
      data.map((book) => ({
        id: book.id,
        value: book.name,
        label: book.name,
      })),
  });

  const { isPending: returnPending, mutate } = useMutation({
    mutationKey: ["returnBook"],
    mutationFn: returnBook,
    onSuccess: () => {
      setSelection(null);
      toast("✅ Book is returned");
      queryClient.invalidateQueries({
        queryKey: ["assignedBooks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["UnassignedBooks"],
      });
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const updateSelection = (selectedValue) => {
    setSelection({
      ...selection,
      ...selectedValue,
    });
  };

  const handleReturnBook = () => {
    const resp = window.confirm(
      "Are you sure you want to return selected book"
    );
    if (resp) {
      mutate({ book_id: selection.book });
    }
  };

  return (
    <div>
      <h2 className="text-center text-3xl my-5 tracking-wider">Return Book</h2>
      {isPending || returnPending && (
        <p className="text-2xl text-center tracking-wider">Loading...</p>
      )}
      
      {error && (
        <p className="text-2xl text-center tracking-wider text-red-500">
          {error.message}
        </p>
      )}
      <div className="flex flex-col items-center justify-center mx-auto max-w-[500px] space-y-3">
        <div className="flex flex-col gap-2">
          <label>Select Book : </label>
          <DropDown
            data={books}
            title="book"
            updateSelection={updateSelection}
          />
        </div>

        <Button
          className="w-full"
          disabled={!selection?.book || isPending}
          onClick={handleReturnBook}
        >
          Return Book
        </Button>
      </div>
    </div>
  );
};

export default ReturnBook;
