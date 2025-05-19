"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  first_name: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  middle_name: z.string().optional(),
  last_name: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  class: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  address: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  city: z.string().refine((val) => val.trim() !== "", "This is required field"),
  state: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  pincode: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  phone: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field")
    .refine((val) => val.trim().length === 10, "Enter 10 digit valid  number"),
});

const StudentForm = ({ handleFormSubmit, isPending, student }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: student?.first_name || "",
      middle_name: student?.middle_name || "",
      last_name: student?.last_name || "",
      class: student?.class || "",
      address: student?.address || "",
      city: student?.city || "",
      state: student?.state || "",
      pincode: student?.pincode || "",
      phone: student?.phone || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    if (student) {
      //edit
      await handleFormSubmit({ id: student?.id, student: values });
    } else {
      // add
      const isSuccess = await handleFormSubmit(values);
      if (isSuccess) {
        form.reset();
      }
    }
  }

  return (
    <div className="max-w-[500px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex w-full gap-3">
            <FormField
              control={form.control}
              name="first_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="middle_name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Middle Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter middle name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="last_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="class"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Class</FormLabel>
                <FormControl>
                  <Input placeholder="Enter class" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input placeholder="Enter city" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="state"
            render={({ field }) => (
              <FormItem>
                <FormLabel>State</FormLabel>
                <FormControl>
                  <Input placeholder="Enter state name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pincode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Pincode</FormLabel>
                <FormControl>
                  <Input placeholder="Enter pincode" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {student ? "Update" : "Add"} Student
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default StudentForm;
