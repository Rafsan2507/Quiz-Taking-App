"use client"
import UpdateQuiz from '@/components/TeacherComponent/UpdateQuiz';
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

const page = (props: Props) => {
    const {id} = useParams();
  return (
    <UpdateQuiz id={id}/>
  )
}

export default page