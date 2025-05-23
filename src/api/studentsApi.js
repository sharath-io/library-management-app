import supabase from "@/utils/supabase";

export const getStudents = async () => {
  let { data: students, error } = await supabase
    .from("students")
    .select("*")
    .order("updated_at", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("Error while getting studentsList. Trya gain later");
  }

  return students;
};

export const addStudent = async (student) => {
  const { data, error } = await supabase
    .from("students")
    .insert([student])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Erro while adding student. Trya gain later");
  }

  return data;
};

export const deleteStudent = async (id) => {
  const { data, error } = await supabase.from("students").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Error while deleting Student. Try again later");
  }
};

export const updateStudent = async ({ id, student }) => {
  const { data, error } = await supabase
    .from("students")
    .update(student)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error);
    throw new Error("Error while updating Student. Try again");
  }
  return data;
};

// filterieng rows => searching for that particular book
export const getSingleStudent = async (id) => {
  const { data: student, error } = await supabase
    .from("students")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("Error while getting Student information.Try again later");
  }

  return student;
};

// 1. we are extracting studentid with which it is associated with bookId from student_books
// 2. know with studentId search student full details (name,class, city and all)
export const getStudentByBookId = async (bookId) => {
  console.log("start api");
  const { data: student_books, error } = await supabase
    .from("student_books")
    .select("student_id")
    .eq("book_id", bookId)
    .maybeSingle();

  if (error) {
    console.log(error);
    throw new Error(
      "Error while getting StudentId with bookId.Try again later"
    );
  }
  if (!student_books) {
    console.log(error);
    throw new Error("This book is not assigned to any student");
  }

  const { data: student, error: studentError } = await supabase
    .from("students")
    .select("*")
    .eq("id", student_books.student_id)
    .maybeSingle();

  if (studentError) {
    console.log(error);
    throw new Error(
      "Error while getting Student details with studentId.Try again later"
    );
  }
  console.log("from api", student);

  return student;
};
