import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import StudentTable from "./student-table/StudentTable";
import { Link } from "react-router-dom";

const StudentDialog = ({ open, onOpenChange, student }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[90%] mx-auto overflow-x-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl tracking-wider">
            Student Information
          </DialogTitle>
          <StudentTable student={student} />
          <Link className="text-center text-black mt-2 font-bold underline">
            Books assigned to {student?.first_name}
          </Link>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default StudentDialog;
