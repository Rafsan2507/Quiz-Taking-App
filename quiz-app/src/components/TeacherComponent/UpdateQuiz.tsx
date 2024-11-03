"use client"
import { AppDispatch, RootState } from '@/redux/store'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { getQuizById, MCQQuestion, TrueFalseQuestion, updateQuiz } from '@/redux/TeacherSlice/TeacherSlice'
import { useRouter } from 'next/navigation'

type Props = {
  id: string | string[] | undefined
}

const UpdateQuiz = ({ id }: Props) => {
    const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const quiz = useSelector((state: RootState) => state.addQuizInfo.quiz);

  const [title, setTitle] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);
  const [mcqForms, setMcqForms] = useState<MCQQuestion[]>([]);
  const [trueFalseForms, setTrueFalseForms] = useState<TrueFalseQuestion[]>([]);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getQuizById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (quiz) {
      setTitle(quiz.title);
      setDuration(quiz.duration);
      setMcqForms(quiz.mcqQuestions);
      setTrueFalseForms(quiz.trueFalseQuestions);
    }
  }, [quiz]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedQuiz = {
      ...quiz,
      title,
      duration,
      mcqQuestions: mcqForms,
      trueFalseQuestions: trueFalseForms,
    };
    dispatch(updateQuiz(updatedQuiz));
    router.push('/teacher')
  };

  return (
    <div className="bg-[#fffaf6] h-fit mx-[10vw] px-12 py-6">
      <div className="flex justify-center text-2xl italic font-semibold mb-4">Update Quiz</div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4 text-xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-md">Title</Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="duration" className="text-md">Duration</Label>
            <Input
              type="number"
              id="duration"
              placeholder="Duration"
              value={duration || ''}
              onChange={(e) => setDuration(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xl">
          <div>MCQ</div>
          {mcqForms.map((mcq, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor={`mcq-question-${index}`} className="text-md">Question</Label>
                <Input
                  type="text"
                  id={`mcq-question-${index}`}
                  placeholder="Question"
                  value={mcq.question}
                  onChange={(e) => {
                    const updatedMcqForms = [...mcqForms];
                    updatedMcqForms[index].question = e.target.value;
                    setMcqForms(updatedMcqForms);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {mcq.options.map((option, optIndex) => (
                  <Input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedMcqForms = [...mcqForms];
                      updatedMcqForms[index].options[optIndex] = e.target.value;
                      setMcqForms(updatedMcqForms);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 text-xl mt-4">
          <div>True/False</div>
          {trueFalseForms.map((tf, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor={`tf-question-${index}`} className="text-md">Question</Label>
                <Input
                  type="text"
                  id={`tf-question-${index}`}
                  placeholder="Question"
                  value={tf.question}
                  onChange={(e) => {
                    const updatedTrueFalseForms = [...trueFalseForms];
                    updatedTrueFalseForms[index].question = e.target.value;
                    setTrueFalseForms(updatedTrueFalseForms);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {tf.options.map((option, optIndex) => (
                  <Input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={option}
                    onChange={(e) => {
                      const updatedTrueFalseForms = [...trueFalseForms];
                      updatedTrueFalseForms[index].options[optIndex] = e.target.value;
                      setTrueFalseForms(updatedTrueFalseForms);
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6">
          <Button type="submit" className="text-lg font-semibold">Update</Button>
        </div>
      </form>
    </div>
  );
};

export default UpdateQuiz;
