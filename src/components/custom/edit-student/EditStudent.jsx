import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { getSingleStudent, updateStudent } from "@/api/studentsApi";
import StudentForm from "../student-form/StudentForm";

const EditStudent = () => {
  const queryClient = useQueryClient();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data: student,
    isPending: { studentIsPending },
    error,
  } = useQuery({
    queryKey: ["singleStudent", id],
    queryFn: () => getSingleStudent(id),
  });

  const { isPending, mutateAsync } = useMutation({
    mutationKey: ["editStudent"],
    mutationFn: updateStudent,
    onSuccess: () => {
      toast("✅ Student is updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
      queryClient.invalidateQueries({
        queryKey: ["singleStudent", id],
      });
      setTimeout(() => {
        navigate("/studentsList");
      }, 1000);
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const handleFormSubmit = async ({ id, student }) => {
    try {
      await mutateAsync({ id, student });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };
  return (
    <div>
      <h2 className="text-3xl text-center tracking-wdider">
        Edit Student : {id}
      </h2>
      {error && (
        <p className="text-center text-2xl text-red-500">{error.message}</p>
      )}
      {studentIsPending && (
        <p className="text-center text-2xl my-3">Loading....</p>
      )}
      <StudentForm
        key={student?.id}
        handleFormSubmit={handleFormSubmit}
        isPending={isPending || studentIsPending}
        student={student}
      />
    </div>
  );
};

export default EditStudent;
