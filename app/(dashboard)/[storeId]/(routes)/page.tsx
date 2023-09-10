"use client"
import React from 'react'

interface IPage {
    children: React.ReactNode,
}

const Page: React.FC<IPage> = ({ children }) => {

    return (
        <>
            <div>Page</div>

        </>
    )
}

export default Page