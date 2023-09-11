"use client";

import * as z from "zod";
import { Stores } from "@prisma/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

import Heading from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeleteStore from "@/components/modals/DeleteStore";
import useStore from "@/hooks/useStore";
import ApiAlert from "@/components/ui/ApiAlert";
import useOrigin from "@/hooks/useOrigin";

interface IFormSettings {
  initialData: Stores;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type TForm = z.infer<typeof formSchema>;

const FormSettings: React.FC<IFormSettings> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const { loading, onDelete, onUpdate, id } = useStore();
  const origin = useOrigin();

  const onSubmit = async (values: TForm) => {
    await onUpdate(values);
  };

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  return (
    <>
      <DeleteStore
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <Heading title="Settings" description="manage store preferences" />
          <Button
            disabled={loading}
            variant="destructive"
            size="icon"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 flex-col"
          >
            <div className="flex justify-start items-center gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1 min-w-[300px]">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="your store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button disabled={loading}>Save changes</Button>
            </div>
          </form>
        </Form>
        <Separator />
        <ApiAlert
          title="NEXT_PUBLIC_API_URL"
          description={`${origin}/api/${id}`}
          variant="public"
        />
      </div>
    </>
  );
};

export default FormSettings;
