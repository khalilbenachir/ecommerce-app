import React from 'react'
import { UserButton, auth } from "@clerk/nextjs"

import MainNav from './MainNav'
import StoreSwitcher from '../StoreSwitcher'
import prismaDb from '@/lib/prismadb'
import { redirect } from 'next/navigation'

const Navbar = async () => {
    const { userId } = auth();

    if (!userId) redirect("/sign-up")

    const stores = await prismaDb.stores.findMany({
        where: {
            userId
        }
    })
    return (
        <header className='flex items-center p-4 h-16 w-full border-b shadow-sm gap-4'>
            <StoreSwitcher items={stores} />
            <MainNav />
            <div className='ml-auto'>
                <UserButton />
            </div>
        </header>
    )
}

export default Navbar