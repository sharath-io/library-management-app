import React, { useState } from "react";
import DropDown from "../dropdown/Dropdown";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getUnassignedBooks } from "@/api/booksApi";
import { getStudents } from "@/api/studentsApi";
import { Button } from "@/components/ui/button";
import { issueBook } from "@/api/studentBooksApi";
import { toast } from "sonner";

const IssueBook = () => {
  const [selection, setSelection] = useState(null);
  const {
    data: books,
    isPending,
    error,
  } = useQuery({
    queryKey: ["unassignedBooks"],
    queryFn: getUnassignedBooks,
    select: (data) =>
      data.map((book) => ({
        id: book.id,
        value: book.name,
        label: book.name,
      })),
  });

  const {
    data: students,
    isPending: studentsPending,
    error: studentsError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    select: (data) =>
      data.map(({ id, first_name, middle_name, last_name }) => ({
        id,
        value: `${first_name} ${middle_name} ${last_name}`,
        label: `${first_name} ${middle_name} ${last_name}`,
      })),
  });
  const queryClient = useQueryClient();

  const {
    isPending: issuePending,
    error: issueError,
    mutate,
  } = useMutation({
    mutationKey: ["issueBook"],
    mutationFn: issueBook,
    onSuccess: () =>{
      setSelection(null);
      toast("✅ Book is successfully issued.");
      queryClient.invalidateQueries({
        queryKey: ["unassignedBooks"],
      });
      queryClient.invalidateQueries({
        queryKey: ["assignedBooks"],
      });
    },
    onError: (error) => toast(` ❌ heyyy ${error.message}`),
  });

  const handleIssueBook = () => {
    mutate({
      book_id: selection.book,
      student_id: selection.student,
    });
  };

  const updateSelection = (selectedvalue) => {
    setSelection({
      ...selection,
      ...selectedvalue,
    });
  };

  return (
    <div>
      <h2 className="text-center text-3xl my-5 tracking-wider">
        Issue Book to student
      </h2>
      {isPending ||
        studentsPending ||
        (issuePending && (
          <p className="text-2x tracking-wide text-center">Loading.....</p>
        ))}
      {error && (
        <p className="text-2xl text-red-500 tracking-wide text-center">
          {error.message}
        </p>
      )}
      {studentsError && (
        <p className="text-2xl text-red-500 tracking-wide text-center">
          {studentsError.message}
        </p>
      )}

      {issueError && (
        <p className="text-2xl text-red-500 tracking-wide text-center">
          {issueError.message}
        </p>
      )}
      <div className="flex flex-col items-center justify-center mx-auto max-w-[500px] space-y-3">
        <div className="flex flex-col gap-2">
          <label>Select Book : </label>
          <DropDown
            data={books}
            title={"book"}
            updateSelection={updateSelection}
          />
        </div>
        <div className="flex flex-col gap-2 ">
          <label>SelectStudent : </label>
          <DropDown
            data={students}
            title={"student"}
            updateSelection={updateSelection}
          />
        </div>
        <Button
          className="w-full"
          disabled={!selection?.book || !selection?.student || issuePending}
          onClick={handleIssueBook}
        >
          Issue Book
        </Button>
      </div>
    </div>
  );
};

export default IssueBook;
