import { Search } from "lucide-react";
import React, { useState } from "react";
import DatePicker from "../datePicker/DatePicker";
import { Button } from "@/components/ui/button";
import { subMonths } from "date-fns";
import { getAnalyticsByStudentId } from "@/api/studentBooksApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AgGridReact } from "ag-grid-react";
import { getFormattedDate } from "@/utils/functions";

const colDefs = [
    { field: "name" },
    { field: "created_at", headerName:"Issued Date", cellRenderer:(params)=> getFormattedDate(params.data.student_books[0]?.created_at)  },
    { field: "author" },
    { field: "publisher" },
    { field: "isbn", headerName:"ISBN"}
  ];

const Analytics = () => {
  const [studentId, setStudentId] = useState("");
  const [date, setDate] = useState({
    from: subMonths(new Date(), 1),
    to: new Date(),
  });

  const updateDate = (date) => setDate(date);

  const { data, isPending, mutate } = useMutation({
    mutationKey: ["analytics"],
    mutationFn: getAnalyticsByStudentId,
    onError: (error) => toast(`❌ ${error.message}`),
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted from event", event);
    if (studentId && date.from && date.to) {
      mutate({
        studentId: studentId.split("STU")[1],
        date,
      });
    } else toast("❌ Select studentId and date");
  };

  // initially data doesn't exist
  // we are assigning it to {} empty object
  // destructuring to empty object => doesn't give errors
  const {
    id,
    first_name,
    middle_name,
    last_name,
    class: student_class,
  } = data?.student || {};
  return (
    <div>
      <h2 className="text-center text-3xl my-5 tracking-wider">
        Student Analytics
      </h2>
      <form
        className="flex flex-col gap-4 justify-center items-center-safe w-[500px] mx-auto my-5"
        onSubmit={handleSubmit}
      >
        <div className="border flex p-2 rounded-md w-full">
          <Search color="gray" />
          <input
            type="text"
            className="pl-2 outline-none w-[100%]"
            placeholder="Enter Student Id to Search"
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div>

        <DatePicker date={date} updateDate={updateDate} />
        <Button type="submit" className="w-full cursor-pointer p-4">
          Get Analytics
        </Button>
        {isPending && (
          <p className="text-center text-xl tracking-wider">Loading.....</p>
        )}
      </form>
      {data?.books?.length > 0  && (
        <div className="mx-auto w-[80%] mt-5">
          
          <div>
            <strong>Student Full Name : </strong>
            {first_name} {middle_name} {last_name}
          </div>
          <div>
            <strong>Student Class : </strong>
            {student_class}
          </div>
          <div>
            <strong>Student Id : </strong>
            {`STU${id}`}
          </div>
          <div style={{ height: 500, margin:'2rem 0' }}>
                  <AgGridReact
                    rowData={data.books}
                    columnDefs={colDefs}
                    pagination={true}
                  />
                </div>

        </div>
        
      )}
    </div>
  );
};

export default Analytics;
