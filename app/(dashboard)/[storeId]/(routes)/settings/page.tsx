import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'

import prismaDb from '@/lib/prismadb'
import FormSettings from "./components/Form"

interface IPage {
    params: {
        storeId: string
    }
}

const Page: React.FC<IPage> = async ({ params }) => {
    const { userId } = auth();

    if (!userId) redirect("/sign-in")

    const store = await prismaDb.stores.findFirst({
        where: {
            id: params?.storeId
        }
    })

    if (!store) redirect("/")

    return (
        <main className='p-6'>
            <FormSettings initialData={store} />
        </main>
    )
}

export default Page