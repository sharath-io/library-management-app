import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFormattedDate } from "@/utils/functions";

const BooksTable = ({ books }) => {
 
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead className="w-[100px]">Book Name</TableHead>
          <TableHead className="w-[100px]">Issued Date</TableHead>
          {/* <TableHead className="w-[100px]">Created book Date</TableHead> */}
          <TableHead className="w-[100px]">Author</TableHead>
          <TableHead className="w-[100px]">Publisher</TableHead>
          <TableHead className="w-[100px]">ISBN</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {books?.map(({ id,name,student_books, created_at,author, publisher, isbn }, index) => (
          <TableRow key={id}>
            <TableCell className="w-[50px]">{index}</TableCell>
            <TableCell className="w-[100px]">{name}</TableCell>
            <TableCell className="w-[100px]">{getFormattedDate(student_books[0]?.created_at)}</TableCell>
            {/* <TableCell className="w-[100px]">{created_at}</TableCell> */}
            <TableCell className="w-[100px]">{author}</TableCell>
            <TableCell className="w-[100px]">{publisher}</TableCell>
            <TableCell className="w-[100px]">{isbn}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default BooksTable;
