"use client";

import React, { useState } from "react";
import * as z from "zod"
import axias from "axios"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import toast from "react-hot-toast";

import useStoreModal from "@/hooks/useStoreModal";
import Modal from "@/components/ui/modal";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
    name: z.string().min(1),
})

const StoreModal = () => {
    const [isLoading, setIsLoading] = useState(false)
    const storeModal = useStoreModal();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setIsLoading(true)
            const store = await axias.post("/api/stores", values)

            window.location.assign(`/${store?.data?.id}`)
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong ...")
        }
        finally {
            setIsLoading(false)
        }
    }
    return (
        <Modal
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
            title="Create Store"
            description="Add a new store to manage products and categories"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 py-3">
                    <FormField name="name" control={form.control} render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input disabled={isLoading} placeholder="you store name" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex items-center justify-end gap-2">
                        <Button disabled={isLoading} onClick={storeModal.onClose} variant="outline">Cancel</Button>
                        <Button disabled={isLoading} type="submit">Continue</Button>
                    </div>
                </form>
            </Form>
        </Modal>
    );
};

export default StoreModal;
