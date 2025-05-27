import supabase from "@/utils/supabase";
import { data } from "react-router-dom";

export const issueBook = async ({ book_id, student_id }) => {
  const { data, error } = await supabase
    .from("student_books")
    .insert([{ book_id, student_id }])
    .select();

  if (error) {
    console.log("api error", error);
    throw new Error("Error while issuing book to student. Try again later");
  }

  return data;
};

export const returnBook = async ({ book_id }) => {
  const { data, error } = await supabase
    .from("student_books")
    .delete()
    .eq("book_id", book_id);

  if (error) {
    console.log("api error", error);
    throw new Error("Error while returning book. Try again later");
  }
  return data;
};

// to display books taken by particular student
// extract book ids issued to that student
// with these book Ids => go to books and extract book details and display

export const getBooksByStudentId= async (studentId) => {
  let { data: student_books, error } = await supabase
    .from("student_books")
    .select("book_id")
    .eq("student_id", studentId);
  if (error) {
    console.log("api error", error);
    throw new Error(
      "Error while extracting books taken by studentId. Try again later"
    );
  }

  // console.log('from student_books table extracting books of particular student',student_booksIds)
  const bookIds = student_books.map((book) => book.book_id);
  /*
[{book_id: 116}, {book_id: 117}]==> [116, 117] format
*/

  const { data: books, error: booksError } = await supabase
    .from("books")
    .select("*, student_books(created_at)") // extracting the issue date when this book issued to student, mixing two tables
    .in("id", bookIds);

  if (booksError) {
    console.log("api error", booksError);
    throw new Error(
      "Error while extracting books from books table. Try again later"
    );
  }
  return books;
};


export const getAnalyticsByStudentId= async({studentId,date}) =>{
  // extract books by studentId
  console.log('start nw api', studentId)

  const { data, error:analyticsError} = await supabase
    .from("student_books")
    .select("book_id, student_id")
    .eq("student_id", studentId)
    .gte("created_at",date.from.toISOString())
    .lte("created_at", date.to.toISOString())

    if (analyticsError) {
    throw new Error(
      "Error while getting analytics data. Try again later"
    );
  }

  if(data?.length===0){
    throw new Error(" No issued books found with provided data")
  }

  const bookIds = data.map(item => item.book_id);

const {data:books, error:booksError } = await supabase
    .from("books")
    .select("*, student_books(created_at)")
    .in("id",bookIds )

    if (booksError) {
    throw new Error(
      "Error while getting analytics books data of student. Try again later"
    );
  }


    const {data:student, error:studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", studentId)
    .maybeSingle();

    if (studentError) {
    throw new Error(
      "Error while getting analytics data of student. Try again later"
    );
  }


    console.log('finally', {books, student})
    return {books, student};

}