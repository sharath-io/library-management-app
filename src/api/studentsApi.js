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
