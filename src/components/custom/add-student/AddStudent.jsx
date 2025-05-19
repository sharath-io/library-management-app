import React from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import StudentForm from "../student-form/StudentForm";
import { addStudent } from "@/api/studentsApi";

const AddStudent = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending, error, mutateAsync } = useMutation({
    mutationKey: ["addStudent"],
    mutationFn: addStudent,
    onSuccess: () => {
      toast("✅ Student is added successfully");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      setTimeout(() => {
        navigate("/studentsList");
      }, 1000);
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const handleFormSubmit = async (book) => {
    try {
      await mutateAsync(book);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      <h2 className="text-center text-3xl my-3 tracking-wider">Add Student</h2>
      <StudentForm handleFormSubmit={handleFormSubmit} isPending={isPending} />
    </div>
  );
};

export default AddStudent;
