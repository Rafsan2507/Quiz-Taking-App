"use client";
import { AppDispatch, RootState } from "@/redux/store";
import { getQuizById } from "@/redux/TeacherSlice/TeacherSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { differenceInSeconds, addMinutes } from "date-fns";
import { Answer, QuizAnswerInfo } from "@/redux/StudentSlice/StudentSlice";
import { Button } from "../ui/button";

type Props = {
  id: string | string[] | undefined;
};

const ShowQuiz = ({ id }: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizEndTime, setQuizEndTime] = useState<Date | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [marks, setMarks] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timerIntervalId, setTimerIntervalId] = useState<NodeJS.Timeout | null>(
    null
  );

  const quiz = useSelector((state: RootState) => state.addQuizInfo.quiz);

  useEffect(() => {
    if (typeof id === "string") {
      dispatch(getQuizById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (quiz?.duration) {
      const endTime = addMinutes(new Date(), quiz.duration);
      setQuizEndTime(endTime);

      const interval = setInterval(() => {
        const now = new Date();
        const timeDiffInSeconds = differenceInSeconds(endTime, now);

        if (timeDiffInSeconds <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
        } else {
          setTimeLeft(timeDiffInSeconds);
        }
      }, 1000);

      setTimerIntervalId(interval);

      return () => clearInterval(interval);
    }
  }, [quiz?.duration]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handleSelectOption = (question: string, selectedOption: string) => {
    const existingAnswer = answers.find((ans) => ans.question === question);
    if (existingAnswer) {
      setAnswers((prevAnswers) =>
        prevAnswers.map((ans) =>
          ans.question === question ? { ...ans, answer: selectedOption } : ans
        )
      );
    } else {
      setAnswers([...answers, { question, answer: selectedOption }]);
    }
  };

  const handleSubmitQuiz = async () => {
    if (typeof id === "string") {
      const quizData = {
        title: quiz.title,
        duration: quiz.duration,
        quizId: id,
        answers,
      };

      try {
        if (timerIntervalId) {
          clearInterval(timerIntervalId);
        }

        await dispatch(QuizAnswerInfo(quizData));

        checkAnswers();
        setIsSubmitted(true);
      } catch (error) {
        console.error("Error submitting the quiz", error);
      }
    }
  };

  const checkAnswers = () => {
    let calculatedMarks = 0;

    quiz.mcqQuestions.forEach((question) => {
      const submittedAnswer = answers.find(
        (ans) => ans.question === question.question
      );
      if (submittedAnswer && submittedAnswer.answer === question.answer) {
        calculatedMarks += 1;
      }
    });

    quiz.trueFalseQuestions.forEach((question) => {
      const submittedAnswer = answers.find(
        (ans) => ans.question === question.question
      );
      if (submittedAnswer && submittedAnswer.answer === question.answer) {
        calculatedMarks += 1;
      }
    });

    setMarks(calculatedMarks);
  };

  return (
    <div className="bg-[#fffaf6] h-fit mx-[10vw] px-12 py-6">
      <div className="flex justify-center text-2xl italic font-semibold mb-4">
        Answer
      </div>

      <div className="flex justify-center text-xl font-semibold mb-6">
        {timeLeft > 0 ? (
          <div>Time Left: {formatTime(timeLeft)}</div>
        ) : (
          <div className="text-red-600">Time is up</div>
        )}
      </div>

      <div className="flex flex-col gap-4 text-lg">
        <div>
          <strong>Title :</strong> {quiz.title}
        </div>

        <div>
          <strong>Duration :</strong> {quiz.duration} minutes
        </div>

        {!isSubmitted ? (
          <>
            <div>
              <div className="font-semibold">MCQ</div>
              {quiz.mcqQuestions.map((question, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div>
                    <strong>Question {index + 1}:</strong> {question.question}
                  </div>
                  <div>
                    <strong>Options:</strong>
                  </div>

                  <RadioGroup
                    onValueChange={(value) =>
                      handleSelectOption(question.question, value)
                    }
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <RadioGroupItem value={option} id={option} />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>

            <div>
              <div className="font-semibold">True/False</div>
              {quiz.trueFalseQuestions.map((question, index) => (
                <div key={index} className="flex flex-col gap-2">
                  <div>
                    <strong>Question {index + 1}:</strong> {question.question}
                  </div>

                  <div><strong>Options:</strong></div>

                  <RadioGroup
                    onValueChange={(value) =>
                      handleSelectOption(question.question, value)
                    }
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {question.options.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center gap-2"
                        >
                          <RadioGroupItem value={option} id={option} />
                          <label htmlFor={option}>{option}</label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <Button
                onClick={handleSubmitQuiz}
                className="mt-4 bg-[#fc5185] text-white text-lg font-semibold hover:bg-[#db4773] px-4 py-2 rounded"
              >
                Submit Quiz
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center mt-4">
            <strong>Total Marks:</strong> {marks} /{" "}
            {quiz.mcqQuestions.length + quiz.trueFalseQuestions.length}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowQuiz;
