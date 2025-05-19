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
  name: z.string().refine((val) => val.trim() !== "", "This is required field"),
  author: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  publisher: z
    .string()
    .refine((val) => val.trim() !== "", "This is required field"),
  isbn: z.string().refine((val) => val.trim() !== "", "This is required field"),
});

const BookForm = ({ handleFormSubmit, isPending, book }) => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: book?.name || "",
      author: book?.author || "",
      publisher: book?.publisher || "",
      isbn: book?.isbn || "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values) {
    if (book) {
      //edit
      await handleFormSubmit({ id: book?.id, book: values });
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
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter book name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author</FormLabel>
                <FormControl>
                  <Input placeholder="Enter author name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="publisher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publisher</FormLabel>
                <FormControl>
                  <Input placeholder="Enter publisher name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isbn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ISBN</FormLabel>
                <FormControl>
                  <Input placeholder="Enter isbn number" {...field} />
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
            {book ? "Update" : "Add"} Book
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default BookForm;
