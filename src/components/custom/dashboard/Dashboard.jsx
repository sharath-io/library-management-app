import { AgGridReact } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { getBooks } from "@/api/booksApi";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Edit, Search, Trash2 } from "lucide-react";

const Dashboard = () => {
  const [searchText, setSearchText] = useState("");
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs, setColDefs] = useState([
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
      cellRenderer: () => (
        <div className="py-2 cursor-pointer">
          <Edit color="grey" />
        </div>
      ),
    },
    {
      field: "delete",
      maxWidth: 100,
      cellRenderer: () => (
        <div className="py-2 cursor-pointer">
          <Trash2 color="red" />
        </div>
      ),
    },
  ]);
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
            columnDefs={colDefs}
            pagination={true}
            quickFilterText={searchText}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
