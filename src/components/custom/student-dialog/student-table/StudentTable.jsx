import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const StudentTable = ({ student }) => {
  const {
    first_name,
    middle_name,
    last_name,
    class: student_class,
    address,
    city,
    state,
    pincode,
    phone,
  } = student;
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">First Name</TableHead>
          <TableHead className="w-[100px]">Middle Name</TableHead>
          <TableHead className="w-[100px]">Last Name</TableHead>
          <TableHead className="w-[100px]">Class</TableHead>
          <TableHead className="w-[100px]">Address</TableHead>
          <TableHead className="w-[100px]">City</TableHead>
          <TableHead className="w-[100px]">State</TableHead>
          <TableHead className="w-[100px]">Pincode</TableHead>
          <TableHead className="w-[100px]">Phone</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{first_name}</TableCell>
          <TableCell>{middle_name || <span>&mdash;</span>}</TableCell>
          <TableCell>{last_name}</TableCell>
          <TableCell>{student_class}</TableCell>
          <TableCell>{address}</TableCell>
          <TableCell>{city}</TableCell>
          <TableCell>{state}</TableCell>
          <TableCell>{pincode}</TableCell>
          <TableCell>{phone}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default StudentTable;
