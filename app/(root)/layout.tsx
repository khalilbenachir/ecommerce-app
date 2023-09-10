import { auth } from '@clerk/nextjs'
import React from 'react'
import { redirect } from "next/navigation"

import prismaDb from '@/lib/prismadb'

interface ILayout {
    children: React.ReactNode
}

export default async function Layout({ children }: ILayout) {

    const { userId } = auth()

    if (!userId) {
        redirect("/sign-up")
    }

    const store = await prismaDb.stores.findFirst({
        where: {
            userId
        }
    })

    if (store) {
        redirect(`/${store?.id}`)
    }

    return (
        <>{children}</>
    )
}
