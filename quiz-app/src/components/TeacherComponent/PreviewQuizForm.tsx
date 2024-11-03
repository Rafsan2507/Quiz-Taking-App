import { QuizForm } from "@/redux/TeacherSlice/TeacherSlice";
import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

type Props = {
  previewData: QuizForm;
};

const PreviewQuizForm = ({ previewData }: Props) => {
  return (
    <div>
      <div className="flex justify-center text-2xl italic font-semibold mb-4">
        Preview
      </div>
      <div className="flex flex-col gap-4 text-lg">
        <div><strong>Title :</strong> {previewData.title}</div>

        <div><strong>Duration :</strong> {previewData.duration} minutes</div>

        <div>
          <div className="font-semibold">MCQ</div>
          {previewData.mcqQuestions.map((question, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div>
                Question {index + 1}: {question.question}
              </div>

              <div>Options : </div>

              <RadioGroup defaultValue="comfortable">
                <div className="grid grid-cols-2 gap-4">
                  {previewData.mcqQuestions[index].options.map(
                    (option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-2"
                      >
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    )
                  )}
                </div>
              </RadioGroup>
              <div>Answer : {question.answer}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-semibold">True/False</div>
          {previewData.trueFalseQuestions.map((question, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div>
                Question {index + 1}: {question.question}
              </div>

              <div>Options : </div>

              <RadioGroup defaultValue="comfortable">
                <div className="grid grid-cols-2 gap-4">
                  {previewData.trueFalseQuestions[index].options.map(
                    (option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center gap-2"
                      >
                        <RadioGroupItem value={option} id={option} />
                        <label htmlFor={option}>{option}</label>
                      </div>
                    )
                  )}
                </div>
              </RadioGroup>
              <div>Answer : {question.answer}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewQuizForm;

/* {previewData.mcqQuestions[index].options.map((option, optionIndex) => (
  <div key={optionIndex}>
    <input type="radio" name={`question-${index}`} value={option} />
    <label>{option}</label>
  </div>
))} */
