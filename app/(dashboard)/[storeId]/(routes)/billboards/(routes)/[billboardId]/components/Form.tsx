"use client";

import * as z from "zod";
import { Billboard } from "@prisma/client";
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
import ApiAlert from "@/components/ui/ApiAlert";
import useOrigin from "@/hooks/useOrigin";
import ImageUpload from "@/components/ui/imageUpload";
import useBillboard from "@/hooks/useBillboard";

interface IFormSettings {
  initialData: Billboard | null;
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type TForm = z.infer<typeof formSchema>;

const FormSettings: React.FC<IFormSettings> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const origin = useOrigin();
  const { id, loading, onUpdate, onCreate } = useBillboard();

  const title = initialData ? "Edit billboard" : "Create billboard";
  const description = initialData ? "Edit a billboard" : "Create a billboard";
  const buttonLabel = initialData ? "Save changes" : "Create";

  const onSubmit = async (values: TForm) => {
    if (initialData) return await onUpdate(values);
    return await onCreate(values);
  };

  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      imageUrl: "",
    },
  });

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center w-full">
          <Heading title={title} description={description} />
          {initialData && (
            <Button
              disabled={loading}
              variant="destructive"
              size="icon"
              onClick={() => setOpen(true)}
            >
              <Trash className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Separator />
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex gap-3 flex-col"
          >
            <div className="flex justify-start gap-2 flex-col">
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="min-w-[300px] w-max">
                    <FormLabel>Background Image</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field?.value ? [field?.value] : []}
                        onChange={(url) => field.onChange(url)}
                        onRemove={() => field.onChange("")}
                        disabled={loading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="label"
                render={({ field }) => (
                  <FormItem className="min-w-[300px] w-max">
                    <FormLabel>Label</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="your billboard label"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Button disabled={loading}>{buttonLabel}</Button>
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
