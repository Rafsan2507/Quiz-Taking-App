"use client"
import ShowQuiz from '@/components/StudentComponent/ShowQuiz'
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const {id} = useParams();
  return (
    <ShowQuiz id={id}/>
  )
}

export default page