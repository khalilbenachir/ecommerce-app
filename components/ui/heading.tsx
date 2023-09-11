"use client"

import React from 'react'

interface IHeading {
    title: string,
    description: string
}

const Heading:React.FC<IHeading> = ({description, title}) => {
  return (
    <div className='flex flex-col gap-0'>
        <h2 className='text-lg font-bold tracking-tight'>{title}</h2>
        <p className='text-sm text-muted-foreground'>{description}</p>
    </div>
  )
}

export default Heading