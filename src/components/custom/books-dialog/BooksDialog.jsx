import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import BooksTable from "./books-table/BooksTable";

const BooksDialog = ({ open, onOpenChange, student,books }) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] mx-auto overflow-x-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-wider">
            Books issued to {student.first_name}
          </DialogTitle>
          <BooksTable books={books}/>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default BooksDialog;
