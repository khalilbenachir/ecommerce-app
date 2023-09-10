import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import prismaDb from '@/lib/prismadb'
import Navbar from '@/components/NavBar/Navbar'

interface ILaout {
    children: React.ReactNode,
    params: {
        storeId: string
    }
}

const Layout: React.FC<ILaout> = async ({ children, params }) => {
    const { userId } = auth()

    if (!userId) redirect("/sign-up")

    const store = await prismaDb.stores.findFirst({
        where: {
            userId,
            id: params.storeId
        }
    })

    if (!store) redirect("/")

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}

export default Layout