import supabase from "@/utils/supabase";

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
