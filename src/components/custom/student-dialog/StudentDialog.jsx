import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentTable from "./student-table/StudentTable";
import { useState } from "react";
import BooksDialog from "../books-dialog/BooksDialog";
import { getBooksByStudentId } from "@/api/studentBooksApi";
import { useMutation } from "@tanstack/react-query";


const StudentDialog = ({ open, onOpenChange, student }) => {
  const [isBookOpen, setIsBookOpen] = useState(false);

  const toggleStudentBooks = () => setIsBookOpen(!isBookOpen);

  const {
    data: student_books,
    isPending,
    error,
    mutate,
  } = useMutation({
    mutationKey: ["booksByStudentId"],
    mutationFn: getBooksByStudentId,
    // onSuccess: () => toggleStudentBooks(),
    onError: (error) => {
      toast(`❌  ${error.message}`);
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] mx-auto overflow-x-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-wider">
            Student Information
          </DialogTitle>
          <StudentTable student={student} />
          <DialogDescription
            className="text-center text-black mt-2 font-bold underline cursor-pointer"
            onClick={() =>
              mutate(student?.id, {
                onSuccess: () => toggleStudentBooks(),
              })
            }
          >
            List of Books assigned to {student?.first_name}
          </DialogDescription>
          {isPending && <p className="text-center text-xl tracking-wider">Loading.....</p>}
          <BooksDialog
            open={isBookOpen}
            onOpenChange={toggleStudentBooks}
            student={student}
            books={student_books}
          />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
