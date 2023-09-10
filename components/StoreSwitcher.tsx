"use client"

import React, { useCallback, useMemo, useState } from 'react'
import { Stores } from '@prisma/client'
import { useParams, useRouter } from 'next/navigation'
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import useStoreModal from '@/hooks/useStoreModal'
import { Button } from './ui/button'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandSeparator
} from './ui/command'

type TPopoverProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface IStoreSwitcher extends TPopoverProps {
    items: Stores[]
}

const StoreSwitcher: React.FC<IStoreSwitcher> = ({ items = [], className }) => {
    const [open, setOpen] = useState(false)
    const router = useRouter()
    const storeModal = useStoreModal()
    const params = useParams()

    const onSelect = useCallback((id: string) => {
        setOpen(false)
        router.push(`/${id}`)
    }, [router, setOpen])

    const onAddStore = useCallback(() => {
        setOpen(false)
        storeModal.onOpen()
    }, [storeModal, setOpen])

    const formatedItems = useMemo(() => items.map(item => ({
        value: item?.id,
        label: item?.name
    })), [items])

    const currentStore = useMemo(() =>
        formatedItems.find(item => item?.value === params?.storeId), [formatedItems, params?.storeId])

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-label='selec a store'
                    aria-expanded={open}
                    className={cn("w-[200px] justify-between", className)}
                >
                    <div className='flex justify-center items-center gap-2'>
                        <StoreIcon className="h-4 w-4 shrink-0 opacity-100" />
                        {currentStore?.label}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search framework..." />
                    <CommandEmpty>No store found.</CommandEmpty>
                    <CommandGroup heading="stores">
                        {formatedItems.map((store) => (
                            <CommandItem
                                key={store.value}
                                onSelect={() => onSelect(store.value)}
                            >
                                <Check
                                    className={cn(
                                        "mr-2 h-4 w-4",
                                        currentStore?.value === store.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {store.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                    <CommandSeparator />
                    <CommandGroup>
                        <CommandItem onSelect={onAddStore}>
                            <PlusCircle className='mr-2 h-4 w-4' />
                            Create store
                        </CommandItem>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>

    )
}

export default StoreSwitcher