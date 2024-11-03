"use client"
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { getLastActivation } from '@/redux/ActivationSlice/ActivationSlice'


type Props = {}

const Home = (props: Props) => {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const activatedQuiz = useSelector((state: RootState) => state.activation);
    useEffect(()=>{
dispatch(getLastActivation());
    },[dispatch,activatedQuiz])
    const students = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ];
      const handleClick = () => {
        router.push("/teacher");
      };
      const handleStudent = (student: string, id: string) => {
        router.push(`/student/${id}`);
      }
  return (
    <div className='bg-[#fffaf6] h-[100vh] overflow-auto'>
        <div className='flex justify-center text-2xl italic'>
        <div className=' mt-4 px-8 py-6  font-semibold text-white bg-[#fc5185] w-fit'>
            Quiz App
        </div>
        </div>
        <div className='mt-[15vh] flex justify-center'>
          <Button className='p-8 text-2xl font-semibold border-2 rounded-lg border-[#fc5185] text-black bg-white hover:bg-[#fc5185] hover:text-white' onClick={handleClick}>
                Teacher
          </Button>
        </div>
        <div className='mx-8 mt-[15vh] grid grid-cols-8 gap-6'>
            {students.map((student, index) => (
                <Button key={index} disabled={activatedQuiz.activate !== true} onClick={()=>handleStudent(student,activatedQuiz.quizId)} className='bg-[#fc5185] text-white text-center rounded-lg p-8 text-xl font-semibold hover:bg-[#db4773]' >
                    Student {student}
                </Button>
            ))}
        </div>
    </div>
  )
}

export default Home