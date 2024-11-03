"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { QuizForm, QuizInfo } from "@/redux/TeacherSlice/TeacherSlice";
import { AppDispatch } from "@/redux/store";
import PreviewQuizForm from "./PreviewQuizForm";
import { useRouter } from "next/navigation";

type MCQ = {
  question: string;
  options: string[];
  answer: string;
};

type TrueFalse = {
  question: string;
  options: string[];
  answer: string;
};

type Props = {};

const CreateQuizForm = (props: Props) => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [mcqForms, setMcqForms] = useState<MCQ[]>([
    { question: "", options: ["", "", "", ""], answer: "" },
  ]);

  const [trueFalseForms, setTrueFalseForms] = useState<TrueFalse[]>([
    { question: "", options: ["True", "False"], answer: "" },
  ]);

  const addMCQForm = () => {
    setMcqForms([
      ...mcqForms,
      { question: "", options: ["", "", "", ""], answer: "" },
    ]);
  };

  const addTrueFalseForm = () => {
    setTrueFalseForms([
      ...trueFalseForms,
      { question: "", options: ["True", "False"], answer: "" },
    ]);
  };
  const previewData: QuizForm = {
    title,
    duration: duration,
    mcqQuestions: mcqForms,
    trueFalseQuestions: trueFalseForms,
  };
   const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const quizData: QuizForm = {
      title,
      duration: duration,
      mcqQuestions: mcqForms,
      trueFalseQuestions: trueFalseForms,
    };

    dispatch(QuizInfo(quizData));

    setTitle("");
    setDuration(0);
    setMcqForms([{ question: "", options: ["", "", "", ""], answer: "" }]);
    setTrueFalseForms([{ question: "", options: ["True", "False"], answer: "" }]);

    router.push("/teacher");

  };

  return (
    
    <div className="bg-[#fffaf6] h-fit mx-[10vw] px-12 py-6">
      <div className="flex justify-center text-2xl italic font-semibold mb-4">Create Quiz</div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4 text-xl">
          <div className="flex flex-col gap-2">
            <Label htmlFor="title" className="text-md">
              Title
            </Label>
            <Input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="duration" className="text-md">
              Duration
            </Label>
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
                <Label htmlFor={`mcq-question-${index}`} className="text-md">
                  Question
                </Label>
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
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor={`mcq-options-${index}`} className="text-md">
                  Options
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {mcq.options.map((option, optIndex) => (
                    <Input
                      key={optIndex}
                      type="text"
                      id={`mcq-option-${index}-${optIndex}`}
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedMcqForms = [...mcqForms];
                        updatedMcqForms[index].options[optIndex] =
                          e.target.value;
                        setMcqForms(updatedMcqForms);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor={`mcq-answer-${index}`} className="text-md">
                  Answer
                </Label>
                <Input
                  type="text"
                  id={`mcq-answer-${index}`}
                  placeholder="Answer"
                  value={mcq.answer}
                  onChange={(e) => {
                    const updatedMcqForms = [...mcqForms];
                    updatedMcqForms[index].answer = e.target.value;
                    setMcqForms(updatedMcqForms);
                  }}
                />
              </div>
            </div>
          ))}
          <div>
            <Button
              type="button"
              onClick={addMCQForm}
              className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]"
            >
              Add MCQ
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 text-xl mt-4">
          <div>True/False</div>
          {trueFalseForms.map((tf, index) => (
            <div key={index} className="mb-4">
              <div className="flex flex-col gap-2">
                <Label htmlFor={`tf-question-${index}`} className="text-md">
                  Question
                </Label>
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
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor={`tf-options-${index}`} className="text-md">
                  Options
                </Label>
                <div className="grid grid-cols-2 gap-4">
                  {tf.options.map((option, optIndex) => (
                    <Input
                      key={optIndex}
                      type="text"
                      id={`tf-option-${index}-${optIndex}`}
                      placeholder={`Option ${optIndex + 1}`}
                      value={option}
                      onChange={(e) => {
                        const updatedTrueFalseForms = [...trueFalseForms];
                        updatedTrueFalseForms[index].options[optIndex] =
                          e.target.value;
                        setTrueFalseForms(updatedTrueFalseForms);
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 mt-4">
                <Label htmlFor={`tf-answer-${index}`} className="text-md">
                  Answer
                </Label>
                <Input
                  type="text"
                  id={`tf-answer-${index}`}
                  placeholder="Answer"
                  value={tf.answer}
                  onChange={(e) => {
                    const updatedTrueFalseForms = [...trueFalseForms];
                    updatedTrueFalseForms[index].answer = e.target.value;
                    setTrueFalseForms(updatedTrueFalseForms);
                  }}
                />
              </div>
            </div>
          ))}
          <div>
            <Button
              type="button"
              onClick={addTrueFalseForm}
              className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]"
            >
              Add True/False
            </Button>
          </div>
        </div>
        {isPreview === false && (
          <div className="flex justify-end mt-6">
            <Button
              type="button"
              onClick={() => setIsPreview(true)}
              className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]"
            >
              Preview Quiz
            </Button>
          </div>
        )}
        {isPreview === true && (
          <div>
            <div>
              <PreviewQuizForm previewData={previewData}/>
            </div>
            <div className="flex justify-end mt-6">
              <Button
                type="button"
                onClick={() => setIsPreview(false)}
                className="bg-[#fc5185] text-white font-semibold hover:bg-[#db4773]"
              >
                Back to Form
              </Button>
            </div>
            <div className="flex justify-center mt-6">
              <Button type="submit" className=" text-white font-semibold">
                Publish Quiz
              </Button>
            </div>
          </div>
        )}
      </form>
    </div>
    
  );
};

export default CreateQuizForm;
