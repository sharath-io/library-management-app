import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { deleteBook, getBooks } from "@/api/booksApi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useRef, useState } from "react";
import { Edit, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Dashboard = () => {
  const queryClient = useQueryClient();
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  const { mutate } = useMutation({
    mutationKey: ["deleteBook"],
    mutationFn: deleteBook,
    onSuccess: () => {
      toast("✅ Book is deleted");
      queryClient.invalidateQueries({
        queryKey: ["books"],
      });
    },
    onError: (error) => toast(` ❌ ${error.message}`),
  });

  const colDefs = useRef([
    { field: "name" },
    { field: "author" },
    { field: "publisher" },
    { field: "isbn" },
    {
      field: "assignedTo",
      cellRenderer: () => (
        <span className="underline cursor-pointer">student</span>
      ),
    },
    {
      field: "edit",
      maxWidth: 100,
      cellRenderer: (params) => (
        <div
          className="py-2 cursor-pointer"
          onClick={() => navigate(`/books/${params.data.id}`)}
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
              "Are you sure you want to delete selected book"
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
  const { data: books, error } = useQuery({
    queryKey: ["books"],
    queryFn: getBooks,
  });

  return (
    // Data Grid will fill the size of the parent container
    <div className="">
      <h2 className="text-center text-3xl my-3 tracking-wider">Books List</h2>
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
            rowData={books}
            columnDefs={colDefs.current}
            pagination={true}
            quickFilterText={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
