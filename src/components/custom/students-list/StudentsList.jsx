import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteStudent, getStudents } from "@/api/studentsApi";
import { Edit, Search, Trash2 } from "lucide-react";

const StudentsList = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["deleteStudent"],
    mutationFn: deleteStudent,
    onSuccess: () => {
      toast("✅ Book is deleted");
      queryClient.invalidateQueries({
        queryKey: ["students"],
      });
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const colDefs = useRef([
    { field: "first_name" },
    {
      field: "middle_name",
      cellRenderer: (params) => {
        return params.data.middle_name || <span>&mdash;</span>;
      },
    },
    { field: "last_name", maxWidth: 100 },
    { field: "class", maxWidth: 100 },
    { field: "address", maxWidth: 100 },
    { field: "city", maxWidth: 100 },
    { field: "state", maxWidth: 100 },
    { field: "pincode", maxWidth: 100 },
    { field: "phone", maxWidth: 150 },
    {
      field: "edit",
      maxWidth: 100,
      cellRenderer: (params) => (
        <div
          className="py-2 cursor-pointer"
          onClick={() => navigate(`/students/${params.data.id}`)}
        >
          <Edit color="grey" />
        </div>
      ),
    },
    {
      field: "delete",
      maxWidth: 100,
      cellRenderer: (params) => (
        <div
          className="py-2 cursor-pointer"
          onClick={() => {
            const resp = window.confirm(
              "Are you sure you want to delete selected student"
            );
            if (resp) {
              mutate(params.data.id);
            }
          }}
        >
          <Trash2 color="red" />
        </div>
      ),
    },
  ]);

  // Column Definitions: Defines the columns to be displayed.
  // const [colDefs, setColDefs] = useState(
  //   );
  const { data: students, error } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
  });

  return (
    // Data Grid will fill the size of the parent container
    <div className="">
      <h2 className="text-center text-3xl my-3 tracking-wider">
        Students List
      </h2>
      {error && (
        <p className="text-2xl text-red-500 tracking-wide text-center">
          {error.message}
        </p>
      )}
      <div className="px-3 my-3">
        <div className="border flex my-3 p-2 max-w-sm rounded-md">
          <Search color="gray" />
          <input
            type="text"
            className="pl-2 outline-none w-[100%]"
            placeholder="Search by any field"
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <div style={{ height: 500 }}>
          <AgGridReact
            rowData={students}
            columnDefs={colDefs.current}
            pagination={true}
            quickFilterText={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default StudentsList;
